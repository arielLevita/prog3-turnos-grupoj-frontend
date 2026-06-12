import { useState, useEffect, useCallback } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { format } from "date-fns";
import es from 'date-fns/locale/es';
import "react-datepicker/dist/react-datepicker.css";
import apiUrl from "../api";
import Swal from 'sweetalert2';

registerLocale("es", es);

const MisReservas = () => {
    const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
    const [fechaString, setFechaString] = useState("");

    const [especialidades, setEspecialidades] = useState([]);
    const [medicos, setMedicos] = useState([]);
    const [turnos, setTurnos] = useState([]);
    const [paciente, setPaciente] = useState(null)
    const [medicosSelect, setMedicosSelect] = useState([])

    const USUARIO = {
        idPaciente: 2,
        idUsuario: 6,
        idObraSocial: 5,
        apellido: "Hunk",
        nombres: "Lorena",
        email: "hunlor@correo.com",
        descripcionObraSocial: "low",
        fotoPath: ""
    };

    /* const MEDICO = {
        idMedico: 1,
        matricula: 1000,
        descripcion: "test",
        valorConsulta: 5000,
        idUsuario: 1,
        apellido: "Lopez",
        nombres: "Marcelo",
        email: "lopmar@correo.com",
        idEspecialidad: 1,
        especialidadNombre: "PEDIATRÍA",
        obrasSocialesQueAtiende: [1, 5, 8]
    } */

    const obtenerTurnos = useCallback(async () => {
        try {
            const response = await fetch(`${apiUrl}/v2/turnos`);
            if (!response.ok) throw new Error("Error al obtener los turnos");
            const turnos = await response.json();
            setTurnos(turnos);
        } catch (error) {
            console.error("Error cargando los turnos:", error);
        }
    }, []);

    useEffect(() => {
        const obtenerEspecialidades = async () => {
            try {
                const response = await fetch(`${apiUrl}/v2/especialidades`);
                if (!response.ok) throw new Error("Error al obtener las especialidades");
                const esp = await response.json();
                setEspecialidades(esp);
            } catch (error) {
                console.error("Error cargando los profesionales:", error);
            }
        };

        const obtenerMedicos = async () => {
            try {
                const response = await fetch(`${apiUrl}/v2/medicos`);
                if (!response.ok) throw new Error("Error al obtener los médicos");
                const med = await response.json();
                setMedicos(med);
            } catch (error) {
                console.error("Error cargando los profesionales:", error);
            }
        };

        const obtenerPaciente = async () => {
            try {
                const response = await fetch(`${apiUrl}/v2/pacientes`);
                if (!response.ok) throw new Error("Error al obtener los pacientes");
                const pacientes = await response.json();
                const paciente = await pacientes.find((paciente) => (paciente.idUsuario == USUARIO.idUsuario))
                setPaciente(paciente);
            } catch (error) {
                console.error("Error cargando las obras sociales:", error);
            }
        };

        obtenerEspecialidades();
        obtenerMedicos();
        obtenerPaciente();
    }, [])

    useEffect(() => {
        // El disable de la línea de código que sigue está porque el linter detecta que puede haber una ejecución en cascada. Ya lo probé con la herramienta de red de la consola del navegador y está todo funcionando bien.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        obtenerTurnos();
    }, [obtenerTurnos])

    const handleEspecialidadSeleccionada = (e) => {
        let idEspSeleccionada = Number(e.target.value);
        console.log(idEspSeleccionada);
        let medicosSegunEspecialidad = (medicos.filter((medico) => medico.idEspecialidad == idEspSeleccionada))
        setMedicosSelect(medicosSegunEspecialidad)
    }

    /* const calcularValorTurno = (paciente, medico) => {
        let os = obrasSociales.find((os) => os.idObraSocial == paciente.idObraSocial);
        let valorConsulta = medico.valorConsulta;

        if (medico.obrasSocialesQueAtiende.includes(paciente.idObraSocial)) {
            valorConsulta = medico.valorConsulta * (100 - os.porcentajeDescuento) / 100;
        }

        return valorConsulta;
    } */

    const formatearFechaTarjeta = (fechaIso) => {
        if (!fechaIso) return "";
        const fechaLocal = new Date(fechaIso);
        return format(fechaLocal, "dd/MM/yyyy HH:mm");
    };

    const enviarReserva = async (e) => {
        e.preventDefault();

        const idMedicoSeleccionado = Number(e.target.medico.value);
        const medicoSeleccionado = medicos.find((med) => med.idMedico === idMedicoSeleccionado);

        const nuevaReserva = {
            idMedico: idMedicoSeleccionado,
            idPaciente: Number(paciente.idPaciente),
            idObraSocial: Number(paciente.idObraSocial),
            fechaHora: fechaString,
        };

        Swal.fire({
            title: "¿Desea confirmar la reserva del turno?",
            html: `Médico: ${medicoSeleccionado.nombres} ${medicoSeleccionado.apellido}.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#045a29",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await fetch(`${apiUrl}/v2/turnos`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(nuevaReserva)
                    });

                    if (res.ok) {
                        await Swal.fire({
                            title: "Reserva exitosa",
                            text: "El turno se ha registrado correctamente.",
                            icon: "success",
                            confirmButtonColor: "#045a29"
                        });

                        const botonCerrarModal = document.querySelector('#exampleModal .btn-close');
                        if (botonCerrarModal) botonCerrarModal.click();

                        e.target.reset();
                        setFechaString("");
                        setFechaSeleccionada(null);

                        obtenerTurnos();
                    }
                } catch (error) {
                    console.error("Error guardando la reserva:", error);
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Error guardando la reserva",
                        footer: "Póngase en contacto con el Administrador"
                    });
                }
            }
        });
    };

    const eliminarTurnoReserva = (idTurnoReserva) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Esta acción cancelará tu reserva y no se puede deshacer.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Sí, cancelar reserva",
            cancelButtonText: "No, mantener turno"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await fetch(`${apiUrl}/v2/turnos/${idTurnoReserva}`, {
                        method: "DELETE",
                    });

                    if (res.ok) {
                        await Swal.fire({
                            title: "¡Cancelado!",
                            text: "El turno ha sido cancelado exitosamente.",
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
                        text: "Hubo un problema al cancelar la reserva.",
                        footer: "Inténtalo de nuevo o contacta al administrador."
                    });
                }
            }
        });
    };

    const setHorasYMinutos = (horas, minutos) => {
        const date = new Date();
        date.setHours(horas);
        date.setMinutes(minutos);
        return date;
    };

    const handleCambioFecha = (date) => {
        setFechaSeleccionada(date);

        if (date) {
            const stringFormateado = format(date, "yyyy-MM-dd HH:mm:ss");
            setFechaString(stringFormateado);
        } else {
            setFechaString("");
        }
    };

    const esDiaHabil = (date) => {
        const dia = date.getDay();
        return dia !== 0 && dia !== 6;
    };

    const turnosDelPaciente = paciente ? turnos.filter((turno) => turno.idPaciente == paciente.idPaciente).sort((a, b) => new Date(a.fechaHora) - new Date(b.fechaHora)) : [];

    return (
        <main>
            <section className="container-xxl my-5 px-2">

                <div className="d-flex flex-wrap justify-content-between align-items-center mb-5 w-100">
                    <h1 className="d-inline-flex border-bottom m-0">Mis turnos reservados</h1>
                    <button type="button" className="btn btn-success m-0" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        + Nueva reserva
                    </button>
                </div>

                <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 m-2">
                    {
                        turnosDelPaciente?.map((turno) => (
                            !turno.atendido ?
                                <div key={turno.idTurnoReserva} className="p-2" style={{ height: 250 + 'px' }}>
                                    <div className="d-flex flex-column justify-content-between border rounded-1 shadow p-0 h-100">
                                        <div className="row g-1 border-bottom">
                                            <div className="col-4 p-2">
                                                <img src={turno.imagenMedico} className="img-fluid rounded-start rounded-circle" alt={`Imagen de ${turno.medicoNombre}`} />
                                            </div>
                                            <div className="col-8 p-2">
                                                <h5 className="card-title">{turno.medicoNombre}</h5>
                                                <p><span className="fw-semibold">Obra Social:</span> {turno.obraSocialNombre ? turno.obraSocialNombre : "Atención particular"}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="p-3">
                                                <p className="m-0"><span className="fw-semibold">Especialidad: </span>acá va la esp.</p>
                                                <p className="m-0"><span className="fw-semibold">Fecha y hora: </span>{formatearFechaTarjeta(turno.fechaHora)}hs.</p>
                                                <p className="m-0"><span className="fw-semibold">Valor de la consulta($): </span>{turno.valorTotal}</p>
                                            </div>
                                            <button
                                                className="btn btn-danger text-center rounded-top-0 w-100 border-0 bg-danger"
                                                onClick={() => eliminarTurnoReserva(turno.idTurnoReserva)}
                                            >
                                                Cancelar reserva
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                : null
                        ))
                    }
                </div>

                <form
                    className="modal fade"
                    id="exampleModal"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                    onSubmit={enviarReserva}
                >
                    <div className="modal-dialog">
                        <div className="modal-content p-2">
                            <div className="modal-header flex-column">
                                <div className="d-flex justify-content-between w-100 mb-3">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Solicitud de Reserva</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <p className="text-start text-secondary m-0">Complete el formulario para solicitar una reserva.</p>
                            </div>

                            <div className="modal-body">
                                <label htmlFor="especialidad" className="form-label m-0 mt-2">1) Especialidad</label>
                                <select
                                    id="especialidad"
                                    name="especialidad"
                                    className="form-select"
                                    defaultValue=""
                                    onChange={handleEspecialidadSeleccionada}
                                    required
                                >
                                    <option disabled value="">Seleccionar...</option>
                                    {
                                        especialidades?.map((esp) => (
                                            <option key={esp.idEspecialidad} value={esp.idEspecialidad}>{esp.nombre}</option>
                                        ))
                                    }
                                </select>

                                <label htmlFor="medico" className="form-label m-0 mt-2">2) Médico</label>
                                <select id="medico" name="medico" className="form-select" defaultValue="" required>
                                    <option disabled value="">Seleccionar...</option>
                                    {
                                        medicosSelect?.map((med) => (
                                            <option key={med.idMedico} value={med.idMedico}>{med.nombres} {med.apellido}</option>
                                        ))
                                    }
                                </select>
                                <div className="form-text m-0 mb-3">Primero seleccione una especialidad.</div>

                                <input type="hidden" id="timezone" name="timezone" value="-03:00" />
                                <input type="hidden" id="diayhora_api" name="diayhora_api" value={fechaString} />

                                <label htmlFor="fechayhora" className="form-label m-0 mt-2">3) Día y hora de la reserva</label>
                                <div className="w-100">
                                    <DatePicker
                                        id="fechayhora"
                                        selected={fechaSeleccionada}
                                        onChange={handleCambioFecha}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={30}
                                        timeCaption="Hora"
                                        dateFormat="dd/MM/yyyy HH:mm"
                                        minTime={setHorasYMinutos(8, 0)}
                                        maxTime={setHorasYMinutos(17, 0)}
                                        className="form-control w-100"
                                        placeholderText="Seleccione fecha y hora"
                                        required
                                        autoComplete="off"
                                        locale="es"
                                        filterDate={esDiaHabil}
                                    />
                                </div>
                            </div>

                            <div className="modal-footer gap-2">
                                <button type="button" className="btn btn-secondary p-2" data-bs-dismiss="modal">Cancelar</button>
                                <button type="submit" className="login-button btn btn-primary m-0">Enviar Solicitud</button>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </main>
    );
};

export default MisReservas;