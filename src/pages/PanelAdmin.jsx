import { NavLink, Outlet } from "react-router";
import "../dashboard.css";

const PanelAdmin = () => {
    return (
        <main className="container-xxl p-0">
            <h2 className="mb-4">Panel de Administración</h2>
            
            <ul className="nav nav-tabs px-2" role="tablist">
                <li className="nav-item" role="presentation">
                    <NavLink to="/paneladmin/medicos" className="nav-link fw-semibold" end>
                        Médicos
                    </NavLink>
                </li>
                <li className="nav-item" role="presentation">
                    <NavLink to="/paneladmin/especialidades" className="nav-link fw-semibold">
                        Especialidades
                    </NavLink>
                </li>
                <li className="nav-item" role="presentation">
                    <NavLink to="/paneladmin/turnos" className="nav-link fw-semibold">
                        Turnos
                    </NavLink>
                </li>
                <li className="nav-item" role="presentation">
                    <NavLink to="/paneladmin/obras-sociales" className="nav-link fw-semibold">
                        Obras sociales
                    </NavLink>
                </li>
                <li className="nav-item" role="presentation">
                    <NavLink to="/paneladmin/usuarios" className="nav-link fw-semibold">
                        Usuarios
                    </NavLink>
                </li>
            </ul>

            <div className="tab-content" id="myTabContent">
                <Outlet />
            </div>
        </main>
    );
};

export default PanelAdmin;