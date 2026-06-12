import { useState } from "react";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import apiUrl from "../api";

const InicioSesion = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const credenciales = {
            email: email,
            contrasenia: password
        };

        try {
            const res = await fetch(`${apiUrl}/v2/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credenciales)
            });

            const data = await res.json();

            if (res.ok && data.estado) {

                sessionStorage.setItem("accessToken", data.accessToken);
                sessionStorage.setItem("refreshToken", data.refreshToken);
                sessionStorage.setItem("usuario", JSON.stringify(data.usuario));

                await Swal.fire({
                    title: "¡Bienvenido!",
                    text: "Inicio de sesión exitoso.",
                    icon: "success",
                    confirmButtonColor: "#045a29",
                    timer: 1500,
                    timerProgressBar: true,
                    showConfirmButton: false
                });

                navigate("/paneladmin");

            } else {
                Swal.fire({
                    icon: "error",
                    title: "Acceso denegado",
                    text: data.mensaje || "Correo o contraseña incorrectos.",
                    confirmButtonColor: "#044166"
                });
            }
        } catch (error) {
            console.error("Error en el login:", error);
            Swal.fire({
                icon: "error",
                title: "Error del servidor",
                text: "No se pudo establecer conexión con el servidor.",
                confirmButtonColor: "#044166"
            });
        }
    };

    return (
        <main>
            <section className="container my-5 px-2">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6">
                        <div className="formulario p-4 px-md-5 rounded shadow border">
                            <h2 className="mb-4">Iniciar Sesión</h2>

                            <form id="login-form" onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="usermail" className="form-label m-0 mt-2">Correo Electrónico</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="usermail"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="password" className="form-label m-0 mt-2">Contraseña</label>
                                    <div className="input-group">
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <Link to={'/registro'} className="fst-italic">
                                    Aún no tengo cuenta
                                </Link>
                                <button type="submit" className="btn btn-primary w-30 mt-4 d-block">
                                    Ingresar
                                </button>
                            </form>

                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default InicioSesion;