import { NavLink, Link } from "react-router"

const Navbar = () => {
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
                        <Link to={'/login'} className="mx-auto">
                            <button className="login-button mx-auto" type="button">Iniciar Sesión</button>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar