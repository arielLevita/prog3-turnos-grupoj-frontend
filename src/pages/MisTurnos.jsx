import { useEffect, useState, useCallback } from "react";
import { format } from "date-fns";
import { fetchAuth } from "../utils/fetchAuth";
import Swal from 'sweetalert2';

const MisTurnos = () => {
    const [turnos, setTurnos] = useState([]);
    const [medico, setMedico] = useState(null);
    
    const usuarioStr = sessionStorage.getItem("usuario");
    const usuario = JSON.parse(usuarioStr);

    const obtenerTurnos = useCallback(async () => {
        try {
            const response = await fetchAuth("/v2/turnos");
            if (!response.ok) throw new Error("Error al obtener los turnos");
            const turnos = await response.json();
            setTurnos(turnos);
        } catch (error) {
            console.error("Error cargando los turnos:", error);
        }
    }, []);

    useEffect(() => {
        const obtenerMedicos = async () => {
            try {
                const response = await fetchAuth("/v2/medicos");
                if (!response.ok) throw new Error("Error al obtener los médicos");
                const medicos = await response.json();
                const medicoLogueado = medicos.find((med) => med.idUsuario == usuario.idUsuario)
                setMedico(medicoLogueado);
            } catch (error) {
                console.error("Error cargando los profesionales:", error);
            }
        };

        obtenerMedicos();
    }, [])

    useEffect(() => {
        // El disable de la línea de código que sigue está porque el linter detecta que puede haber una ejecución en cascada. Ya lo probé con la herramienta de red de la consola del navegador y está todo funcionando bien.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        obtenerTurnos();
    }, [obtenerTurnos])


    const formatearFechaTarjeta = (fechaIso) => {
        if (!fechaIso) return "";
        const fechaLocal = new Date(fechaIso);
        return format(fechaLocal, "dd/MM/yyyy HH:mm");
    };

    const marcarAtendido = (idTurnoReserva) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Esta acción cancelará el turno y no se puede deshacer.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#045a29",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, marcar como atendido",
            cancelButtonText: "No, mantener turno"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await fetchAuth(`/v2/turnos/${idTurnoReserva}/atendido`, {
                        method: "PATCH",
                        body: JSON.stringify({ atendido: true })
                    });

                    if (res.ok) {
                        await Swal.fire({
                            title: "¡Turno atendido!",
                            text: "El turno ha sido atendido.",
                            icon: "success",
                            confirmButtonColor: "#045a29"
                        });

                        obtenerTurnos();
                    } else {
                        throw new Error("Respuesta no exitosa del servidor");
                    }
                } catch (error) {
                    console.error("Error al cancelar la reserva:", error);
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Hubo un problema al marcar como atendido.",
                        footer: "Inténtalo de nuevo o contacta al administrador."
                    });
                }
            }
        });
    };

    const turnosDelMedico = medico ? turnos.filter((turno) => turno.idMedico == medico.idMedico).sort((a, b) => new Date(a.fechaHora) - new Date(b.fechaHora)) : [];

    return (
        <main>
            <section className="container-xxl my-5 px-2">

                <div className="d-flex flex-wrap justify-content-between align-items-center mb-5 w-100">
                    <h1 className="d-inline-flex border-bottom m-0">Mis turnos pendientes</h1>
                </div>

                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 m-2">
                    {
                        turnosDelMedico?.map((turno) => (
                            !turno.atendido ?
                                <div key={turno.idTurnoReserva} className="p-2">
                                    <div className="d-flex flex-column justify-content-between border rounded-1 shadow p-0">
                                        <div className="row g-1">
                                            <div className="p-3">
                                                <h5 className="card-title">{turno.pacienteNombre}</h5>
                                                <p className="m-0"><span className="fw-semibold">Obra Social:</span> {turno.obraSocialNombre ? turno.obraSocialNombre : "Atención particular"}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="px-3">
                                                <p className="m-0"><span className="fw-semibold">Fecha y hora: </span>{formatearFechaTarjeta(turno.fechaHora)}hs.</p>
                                            </div>
                                            <button
                                                className="btn btn-danger text-center rounded-top-0 w-100 border-0 bg-danger"
                                                onClick={() => marcarAtendido(turno.idTurnoReserva)}
                                            >
                                                Marcar como atendido
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                : null
                        ))
                    }
                </div>
            </section>
        </main>
    )
}

export default MisTurnos