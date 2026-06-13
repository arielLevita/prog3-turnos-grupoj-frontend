import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router";
import Swal from "sweetalert2";

const RutaProtegida = ({ rolesPermitidos }) => {
    const token = sessionStorage.getItem("accessToken");
    const usuarioStr = sessionStorage.getItem("usuario");
    const navigate = useNavigate();

    const usuario = usuarioStr ? JSON.parse(usuarioStr) : null;
    const tienePermisos = usuario && rolesPermitidos ? rolesPermitidos.includes(usuario.rol) : true;

    useEffect(() => {
        if (!token || !usuario) {
            navigate("/login", { replace: true });
        } else if (!tienePermisos) {
            Swal.fire({
                icon: "error",
                title: "Acceso Restringido",
                text: "No tienes los permisos necesarios para acceder a esta sección.",
                confirmButtonColor: "#044166"
            }).then((result) => {
                if (result.isConfirmed) {navigate(-1)};
            });
        }
    }, [token, usuario, tienePermisos, navigate]);

    if (!token || !usuario || !tienePermisos) {
        return null; // Pantalla en blanco en lugar de mostrar la app
    }

    return <Outlet />;
};

export default RutaProtegida;