import { createBrowserRouter, Navigate } from "react-router";
import Main from "../layouts/Main.jsx";
import Home from "../pages/Home.jsx";
import Institucional from "../pages/Institucional.jsx";
import Profesionales from "../pages/Profesionales.jsx";
import Contacto from "../pages/Contacto.jsx";
import InicioSesion from "../pages/InicioSesion.jsx";
import MisReservas from "../pages/MisReservas.jsx";
import MisTurnos from "../pages/MisTurnos.jsx";
import PanelAdmin from "../pages/PanelAdmin.jsx";
import PanelMedicosAdmin from "../components/PanelMedicosAdmin.jsx";
import PanelEspecialidadesAdmin from "../components/PanelEspecialidadesAdmin.jsx";

import RutaProtegida from "./RutaProtegida.jsx";
import Registro from "../pages/Registro.jsx";
import PanelTurnosAdmin from "../components/PanelTurnosAdmin.jsx";
import PanelObrasSocialesAdmin from "../components/PanelObrasSocialesAdmin.jsx";
import PanelUsuariosAdmin from "../components/PanelUsuariosAdmin.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            // --- RUTAS PÚBLICAS ---
            {
                index: true,
                Component: Home
            },
            {
                path: '/institucional',
                Component: Institucional
            },
            {
                path: '/profesionales',
                Component: Profesionales
            },
            {
                path: '/contacto',
                Component: Contacto
            },
            {
                path: '/login',
                Component: InicioSesion
            },
            {
                path: '/registro',
                Component: Registro
            },

            // --- RUTAS PROTEGIDAS ---
            {
                element: <RutaProtegida rolesPermitidos={[2]} />,
                children: [
                    {
                        path: '/misreservas',
                        Component: MisReservas
                    }
                ]
            },
            {
                element: <RutaProtegida rolesPermitidos={[1]} />,
                children: [
                    {
                        path: '/misturnos',
                        Component: MisTurnos
                    }
                ]
            },
            {
                element: <RutaProtegida rolesPermitidos={[3]} />,
                children: [
                    {
                    path: '/paneladmin',
                    element: <PanelAdmin />,
                    children: [
                        {
                            index: true,
                            element: <Navigate to="medicos" replace />
                        },
                        {
                            path: 'medicos',
                            Component: PanelMedicosAdmin
                        },
                        {
                            path: 'especialidades',
                            Component: PanelEspecialidadesAdmin
                        },
                        {
                            path: 'turnos',
                            Component: PanelTurnosAdmin
                        },
                        {
                            path: 'obras-sociales',
                            Component: PanelObrasSocialesAdmin
                        },
                        {
                            path: 'usuarios',
                            Component: PanelUsuariosAdmin
                        }
                    ]
                    }
        ]
    }
]
    }
]);

export default router;