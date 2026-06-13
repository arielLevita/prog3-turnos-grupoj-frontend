import { NavLink, Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import apiUrl from "../api";

const Navbar = () => {
    const navigate = useNavigate();

    const estaLogueado = !!sessionStorage.getItem("accessToken");
    const refreshToken = sessionStorage.getItem("refreshToken");

    const handleLogout = async () => {
        try {
            if (refreshToken) {
                await fetch(`${apiUrl}/v2/auth/logout`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ refreshToken })
                });
            }
        } catch (error) {
            console.error("Error al comunicarse con el servidor durante el logout:", error);
        } finally {
            sessionStorage.removeItem("accessToken");
            sessionStorage.removeItem("refreshToken");
            sessionStorage.removeItem("usuario");

            await Swal.fire({
                title: "Sesión finalizada",
                text: "Has cerrado sesión correctamente.",
                icon: "success",
                timer: 1500,
                showConfirmButton: false
            });

            navigate("/");
        }
    };

    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-xxl">
                <NavLink className="navbar-brand d-flex align-items-center" to={'/'}>
                    <img src="assets/logo-sitio.webp" alt="Logo" className="me-2" />
                    <div className="d-none d-lg-block">
                        <p>Bienestar</p>
                        <p>Integral</p>
                    </div>
                </NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav nav-underline justify-content-center align-items-center mx-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link px-0" aria-current="page" to={'/'}>Inicio</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link px-0" to={'/institucional'}>Institucional</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link px-0" to={'/profesionales'}>Profesionales</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link px-0" to={'/contacto'}>Contacto</NavLink>
                        </li>
                    </ul>
                    <div
                        className="d-flex d-lg-inline-flex m-lg-0 justify-content-lg-end align-items-lg-center flex-column flex-lg-row mb-3 mb-lg-0 gap-2">

                        {estaLogueado ? (
                            <button
                                className="logout-button mx-auto"
                                type="button"
                                onClick={handleLogout}
                            >
                                CERRAR SESIÓN
                            </button>
                        ) : (
                            <Link to={'/login'} className="mx-auto">
                                <button className="login-button mx-auto" type="button">
                                    Iniciar Sesión
                                </button>
                            </Link>
                        )}

                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;