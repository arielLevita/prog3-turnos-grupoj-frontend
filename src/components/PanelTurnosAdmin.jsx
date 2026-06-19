import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { fetchAuth } from "../utils/fetchAuth";
import SelectorFecha from "./SelectorFecha";
import { format } from "date-fns";

const PanelTurnosAdmin = () => {
    const [pacientes, setPacientes] = useState([]);
    const [especialidades, setEspecialidades] = useState([]);
    const [medicos, setMedicos] = useState([]);

    const [medicosFiltrados, setMedicosFiltrados] = useState([]);

    const [idPaciente, setIdPaciente] = useState("");
    const [idEspecialidad, setIdEspecialidad] = useState("");
    const [idMedico, setIdMedico] = useState("");
    const [idObraSocial, setIdObraSocial] = useState("");

    const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
    const [fechaString, setFechaString] = useState("");

    useEffect(() => {
        const cargarDatosFormulario = async () => {
            try {
                const [resPacientes, resUsuarios, resEspecialidades, resMedicos] = await Promise.all([
                    fetchAuth("/v2/pacientes"),
                    fetchAuth("/v2/usuarios"),
                    fetchAuth("/v2/especialidades"),
                    fetchAuth("/v2/medicos")
                ]);

                const dataPacientes = resPacientes.ok ? await resPacientes.json() : [];
                const dataUsuarios = resUsuarios.ok ? await resUsuarios.json() : [];
                const dataEspecialidades = resEspecialidades.ok ? await resEspecialidades.json() : [];
                const dataMedicos = resMedicos.ok ? await resMedicos.json() : [];

                setEspecialidades(dataEspecialidades);
                setMedicos(dataMedicos);

                const pacientesConDatosDeUsuario = dataPacientes.map(pac => {
                    const usuarioAsociado = dataUsuarios.find(u => u.idUsuario === pac.idUsuario);
                    return {
                        ...pac,
                        documento: usuarioAsociado?.documento || "S/D",
                        nombres: usuarioAsociado?.nombres || "",
                        apellido: usuarioAsociado?.apellido || ""
                    };
                }).sort((a, b) => a.documento.localeCompare(b.documento, undefined, { numeric: true }));

                setPacientes(pacientesConDatosDeUsuario);

            } catch (error) {
                console.error("Error al inicializar los datos del panel de turnos:", error);
            }
        };

        cargarDatosFormulario();
    }, []);

    const handlePacienteChange = (e) => {
        const pacId = e.target.value;
        setIdPaciente(pacId);

        const pacienteEncontrado = pacientes.find(p => p.idPaciente == pacId);
        if (pacienteEncontrado) {
            setIdObraSocial(pacienteEncontrado.idObraSocial);
        } else {
            setIdObraSocial("");
        }
    };

    const handleEspecialidadChange = (e) => {
        const espId = Number(e.target.value);
        setIdEspecialidad(espId);
        setIdMedico("");

        const filtrados = medicos.filter(med => med.idEspecialidad === espId);
        setMedicosFiltrados(filtrados);
    };

    const handleCambioFecha = (date) => {
        setFechaSeleccionada(date);
        if (date) {
            setFechaString(format(date, "yyyy-MM-dd HH:mm:ss"));
        } else {
            setFechaString("");
        }
    };

    const handleReset = () => {
        setIdPaciente("");
        setIdEspecialidad("");
        setIdMedico("");
        setIdObraSocial("");
        setFechaSeleccionada(null);
        setFechaString("");
        setMedicosFiltrados([]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const nuevaReserva = {
            idMedico: Number(idMedico),
            idPaciente: Number(idPaciente),
            idObraSocial: Number(idObraSocial),
            fechaHora: fechaString
        };

        try {
            const res = await fetchAuth("/v2/turnos", {
                method: "POST",
                body: JSON.stringify(nuevaReserva)
            });

            if (res.ok) {
                await Swal.fire({
                    title: "¡Turno asignado!",
                    text: "El turno del paciente se ha registrado correctamente.",
                    icon: "success",
                    confirmButtonColor: "#045a29",
                    timer: 2000,
                    showConfirmButton: false
                });

                handleReset();
            } else {
                const data = await res.json();
                throw new Error(data.mensaje || "No se pudo registrar el turno");
            }
        } catch (error) {
            console.error("Error asignando el turno:", error);
            Swal.fire({
                icon: "error",
                title: "Error al guardar",
                text: error.message || "Hubo un problema al procesar el turno en el servidor.",
                confirmButtonColor: "#044166"
            });
        }
    };

    return (
        <div className="tab-pane fade show active" id="turnos-tab-pane" role="tabpanel" aria-labelledby="turnos-tab" tabIndex="0">
            <h4 className="pt-5 mt-0">Asignar nuevo turno administrador</h4>

            <form id="turnosAdminForm" className="col-12 col-sm-10 col-md-8 col-lg-6 p-3 mb-4 mx-auto" onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label htmlFor="selectPaciente" className="form-label m-0 mt-2">Paciente</label>
                    <select
                        id="selectPaciente"
                        className="form-select"
                        value={idPaciente}
                        onChange={handlePacienteChange}
                        required
                    >
                        <option value="" disabled>Seleccione un paciente...</option>
                        {pacientes.map(pac => (
                            <option key={pac.idPaciente} value={pac.idPaciente}>
                                (Doc: {pac.documento}) — {pac.apellido}, {pac.nombres}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="selectEspecialidad" className="form-label m-0 mt-2">1) Especialidad</label>
                        <select
                            id="selectEspecialidad"
                            className="form-select"
                            value={idEspecialidad}
                            onChange={handleEspecialidadChange}
                            required
                        >
                            <option value="" disabled>Seleccione especialidad...</option>
                            {especialidades.map(esp => (
                                <option key={esp.idEspecialidad} value={esp.idEspecialidad}>
                                    {esp.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-md-6 mb-3">
                        <label htmlFor="selectMedico" className="form-label m-0 mt-2">2) Médico disponible</label>
                        <select
                            id="selectMedico"
                            className="form-select"
                            value={idMedico}
                            onChange={(e) => setIdMedico(e.target.value)}
                            disabled={medicosFiltrados.length === 0}
                            required
                        >
                            <option value="" disabled>
                                {idEspecialidad === "" ? "Primero elija especialidad..." : "Seleccione médico..."}
                            </option>
                            {medicosFiltrados.map(med => (
                                <option key={med.idMedico} value={med.idMedico}>
                                    {med.apellido}, {med.nombres}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="mb-4 w-100">
                    <label htmlFor="fechayhora" className="form-label m-0 mt-2">3) Día y hora del turno</label>
                    <div className="w-100">
                        <SelectorFecha 
                            fechaSeleccionada={fechaSeleccionada}
                            onCambioFecha={handleCambioFecha}
                        />
                    </div>
                </div>

                <div className="col-12 d-flex justify-content-center gap-2 mt-4">
                    <button className="btn btn-primary m-0" type="submit">Guardar Turno</button>
                    <button type="button" className="btn btn-secondary rounded-3 text-uppercase" onClick={handleReset}>Cancelar</button>
                </div>
            </form>
        </div>
    );
};

export default PanelTurnosAdmin;