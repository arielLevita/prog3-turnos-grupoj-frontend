import { createBrowserRouter } from "react-router";
import Main from "../layouts/Main.jsx";
import Home from "../pages/Home.jsx";
import Institucional from "../pages/Institucional.jsx";
import Profesionales from "../pages/Profesionales.jsx";
import Contacto from "../pages/Contacto.jsx";
import InicioSesion from "../pages/InicioSesion.jsx";
import MisReservas from "../pages/MisReservas.jsx";
import MisTurnos from "../pages/MisTurnos.jsx";
import PanelAdmin from "../pages/PanelAdmin.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
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
                path: '/misreservas',
                Component: MisReservas
            },
            {
                path: '/misturnos',
                Component: MisTurnos
            },
            {
                path: '/paneladmin',
                Component: PanelAdmin
            },
        ]
    }
]);

export default router;