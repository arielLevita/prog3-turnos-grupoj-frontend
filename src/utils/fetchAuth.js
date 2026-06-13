import Swal from "sweetalert2";
import apiUrl from "../api";

let promesaRefresh = null;

const intentarRefresh = async () => {
    const result = await Swal.fire({
        title: "Tu sesión ha expirado",
        text: "¿Deseas continuar trabajando o cerrar la sesión?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Continuar sesión",
        cancelButtonText: "Cerrar sesión",
        confirmButtonColor: "#045a29",
        cancelButtonColor: "#d33",
        allowOutsideClick: false,
        timer: 60000,
        timerProgressBar: true
    });

    if (result.isConfirmed) {
        const refreshToken = sessionStorage.getItem("refreshToken");

        const refreshRes = await fetch(`${apiUrl}/v2/auth/refresh`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken })
        });

        if (refreshRes.ok) {
            const data = await refreshRes.json();

            sessionStorage.setItem("accessToken", data.accessToken);
            if (data.refreshToken) {
                sessionStorage.setItem("refreshToken", data.refreshToken);
            }

            return data.accessToken;
        } else {
            sessionStorage.clear();
            window.location.href = "/login";
            throw new Error("Refresh token inválido o expirado");
        }
    } else {
        sessionStorage.clear();
        window.location.href = "/";
        throw new Error("Cancelado por el usuario");
    }
};

export const fetchAuth = async (endpoint, options = {}) => {
    let token = sessionStorage.getItem("accessToken");

    const headers = {
        "Content-Type": "application/json",
        ...options.headers,
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    let response;

    try {
        response = await fetch(`${apiUrl}${endpoint}`, { ...options, headers });
    } catch (error) {
        console.error(`Error de red en fetch original a ${endpoint}:`, error);
        throw error;
    }

    if (response.status === 401) {

        if (!promesaRefresh) {
            promesaRefresh = intentarRefresh().finally(() => {
                promesaRefresh = null;
            });
        }

        try {
            const nuevoToken = await promesaRefresh;

            headers["Authorization"] = `Bearer ${nuevoToken}`;

            response = await fetch(`${apiUrl}${endpoint}`, { ...options, headers });

        } catch (error) {
            return Promise.reject(error);
        }
    }

    return response;
};