import { useState, useEffect, useCallback } from "react";
import Swal from "sweetalert2";
import { fetchAuth } from "../utils/fetchAuth";

const PanelMedicosAdmin = () => {
    const [medicos, setMedicos] = useState([]);
    const [especialidades, setEspecialidades] = useState([]);
    const [obrasSociales, setObrasSociales] = useState([]);
    const [obrasSocialesOriginales, setObrasSocialesOriginales] = useState([]);

    const estadoInicialFormulario = {
        idMedico: "",
        idUsuario: "",
        nombres: "",
        apellido: "",
        email: "",
        matricula: "",
        valorConsulta: "",
        idEspecialidad: "",
        descripcion: "",
        obrasSocialesQueAcepta: []
    };

    const [formData, setFormData] = useState(estadoInicialFormulario);

    const cargarDatos = useCallback(async () => {
        try {
                const [resMed, resEsp, resOs] = await Promise.all([
                fetchAuth("/v2/medicos"),
                fetchAuth("/v2/especialidades"),
                fetchAuth("/v2/obras-sociales")
            ]);

            setMedicos(await resMed.json());
            setEspecialidades(await resEsp.json());
            setObrasSociales(await resOs.json());
        } catch (error) {
            console.error("Error al cargar los datos del panel:", error);
        }
    }, []);

    useEffect(() => {
        // El disable de la línea de código que sigue está porque el linter detecta que puede haber una ejecución en cascada. Ya lo probé con la herramienta de red de la consola del navegador y está todo funcionando bien.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        cargarDatos();
    }, [cargarDatos]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value
        }));
    };

    const handleCheckboxChange = (idObraSocial) => {
        setFormData((prev) => {
            const tieneObraSocial = prev.obrasSocialesQueAcepta.includes(idObraSocial);

            const nuevasObrasSociales = tieneObraSocial
                ? prev.obrasSocialesQueAcepta.filter((id) => id !== idObraSocial)
                : [...prev.obrasSocialesQueAcepta, idObraSocial];

            return { ...prev, obrasSocialesQueAcepta: nuevasObrasSociales };
        });
    };

    const handleEditarClick = (medico) => {
        const obrasIds = medico.obrasSociales
            ? medico.obrasSociales.map(os => Number(os.id_obra_social))
            : [];

        setFormData({
            idMedico: medico.idMedico || "",
            idUsuario: medico.idUsuario || "",
            nombres: medico.nombres || "",
            apellido: medico.apellido || "",
            email: medico.email || "",
            matricula: medico.matricula || "",
            valorConsulta: medico.valorConsulta || "",
            idEspecialidad: medico.idEspecialidad || "",
            descripcion: medico.descripcion || "",
            obrasSocialesQueAcepta: obrasIds
        });

        setObrasSocialesOriginales(obrasIds);
    };

    const handleCancelar = () => {
        setFormData(estadoInicialFormulario);
        setObrasSocialesOriginales([]);
    };

    const handleEliminarClick = (idMedico) => {
        Swal.fire({
            title: "¿Desea eliminar este médico?",
            text: "La eliminación no puede ser revertida.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#045a29",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "No, cancelar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await fetchAuth(`/v2/medicos/${idMedico}`, {method: "DELETE"});

                    if (res.ok) {
                        Swal.fire("¡Eliminado!", "El médico ha sido eliminado con éxito.", "success");
                        cargarDatos();
                    } else {
                        throw new Error("Error al eliminar");
                    }
                } catch (error) {
                    Swal.fire("Error", "No se pudo eliminar el médico.", error);
                }
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payloadMedico = {
            idUsuario: Number(formData.idUsuario),
            matricula: Number(formData.matricula),
            descripcion: formData.descripcion,
            valorConsulta: Number(formData.valorConsulta),
            idEspecialidad: Number(formData.idEspecialidad)
        };

        if (!formData.idMedico) {
            const idUsuarioNumerico = Number(formData.idUsuario);
            if (!idUsuarioNumerico || idUsuarioNumerico <= 0) {
                Swal.fire("Atención", "Debe ingresar un ID de Usuario válido.", "warning");
                return;
            }
            payloadMedico.idUsuario = idUsuarioNumerico;
        }

        try {
            const metodo = formData.idMedico ? "PUT" : "POST";
            const url = formData.idMedico
                ? `/v2/medicos/${formData.idMedico}`
                : `/v2/medicos`;

            const resMedico = await fetchAuth(url, {
                method: metodo,
                body: JSON.stringify(payloadMedico)
            });

            if (!resMedico.ok) throw new Error("Error al guardar los datos del médico");

            let idMedicoActual = formData.idMedico;
            if (!idMedicoActual) {
                const dataRespuesta = await resMedico.json();
                idMedicoActual = dataRespuesta.idMedico || dataRespuesta.id_medico;
            }

            const obrasParaAgregar = formData.obrasSocialesQueAcepta.filter(
                id => !obrasSocialesOriginales.includes(id)
            );

            const obrasParaEliminar = obrasSocialesOriginales.filter(
                id => !formData.obrasSocialesQueAcepta.includes(id)
            );

            const promesasObrasSociales = [];

            if (obrasParaAgregar.length > 0) {
                const payloadObrasSociales = obrasParaAgregar.map(id => ({
                    id_obra_social: id
                }));

                promesasObrasSociales.push(
                    fetchAuth(`/v2/medicos/${idMedicoActual}/obras-sociales`, {
                        method: "POST",
                        body: JSON.stringify({ obras_sociales: payloadObrasSociales })
                    })
                );
            }

            obrasParaEliminar.forEach(idObraSocial => {
                promesasObrasSociales.push(
                    fetchAuth(`/v2/medicos/${idMedicoActual}/obras-sociales/${idObraSocial}`, {method: "DELETE"})
                );
            });

            await Promise.all(promesasObrasSociales);

            Swal.fire({
                title: "¡Guardado!",
                text: "El médico y sus obras sociales se actualizaron con éxito.",
                icon: "success",
                confirmButtonColor: "#044166"
            });

            handleCancelar();
            cargarDatos();

        } catch (error) {
            console.error("Error en la transacción:", error);
            Swal.fire("Error", "Hubo un problema al guardar los datos.", "error");
        }
    };

    return (
        <div className="tab-pane fade show active" id="medicos-tab-pane" role="tabpanel" aria-labelledby="medicos-tab" tabIndex="0">
            <h4 className="pt-5 mt-0">{formData.idMedico ? "Editar médico" : "Agregar médico"}</h4>

            <form id="medicoForm" className="p-3 mb-4" onSubmit={handleSubmit}>
                <div className="row g-3">
                    <div className="col-md-2">
                        <label className="form-label m-0 mt-2">ID Médico</label>
                        <input id="idMedico" value={formData.idMedico} type="number" className="form-control text-center" disabled />
                    </div>

                    <div className="col-md-2">
                        <label className="form-label m-0 mt-2">ID Usuario</label>
                        <input
                            id="idUsuario"
                            value={formData.idUsuario}
                            onChange={handleChange}
                            type="number"
                            className="form-control text-center"
                            disabled={!!formData.idMedico}
                            required
                        />
                    </div>

                    <div className="col-md-4">
                        <label className="form-label m-0 mt-2">Nombre</label>
                        <input id="nombres" value={formData.nombres} type="text" className="form-control" disabled />
                    </div>

                    <div className="col-md-4">
                        <label className="form-label m-0 mt-2">Apellido</label>
                        <input id="apellido" value={formData.apellido} type="text" className="form-control" disabled />
                    </div>

                    <div className="col-md-4">
                        <label className="form-label m-0 mt-2">Correo electrónico</label>
                        <input id="email" value={formData.email} type="email" className="form-control" disabled />
                    </div>

                    <div className="col-md-2">
                        <label className="form-label m-0 mt-2">Matrícula</label>
                        <input id="matricula" value={formData.matricula} onChange={handleChange} type="number" className="form-control text-center" required />
                    </div>

                    <div className="col-md-2">
                        <label className="form-label m-0 mt-2">Consulta ($)</label>
                        <input id="valorConsulta" value={formData.valorConsulta} onChange={handleChange} type="number" className="form-control text-center" required />
                    </div>

                    <div className="col-md-4">
                        <label className="form-label m-0 mt-2">Especialidad</label>
                        <select id="idEspecialidad" value={formData.idEspecialidad} onChange={handleChange} className="form-select" required>
                            <option value="" disabled>Seleccionar...</option>
                            {especialidades.map((esp) => (
                                <option key={esp.idEspecialidad} value={esp.idEspecialidad}>
                                    {esp.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-12">
                        <label className="form-label m-0 mt-2">Descripción</label>
                        <textarea id="descripcion" value={formData.descripcion} onChange={handleChange} className="form-control" rows="2" required></textarea>
                    </div>

                    <div className="col-12">
                        <label className="form-label m-0 mt-2">Obras Sociales que acepta</label>
                        <div id="obrasSocialesContainer" className="d-flex flex-wrap gap-3 w-100 bg-body-secondary border rounded-2 p-3">
                            {obrasSociales.map((os) => (
                                <div className="form-check" key={os.idObraSocial}>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id={`obra-${os.idObraSocial}`}
                                        value={os.idObraSocial}
                                        checked={formData.obrasSocialesQueAcepta.includes(os.idObraSocial)}
                                        onChange={() => handleCheckboxChange(os.idObraSocial)}
                                    />
                                    <label className="form-check-label text-uppercase" htmlFor={`obra-${os.idObraSocial}`}>
                                        {os.nombre}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="col-12 d-flex justify-content-center gap-2 mt-4">
                        <button className="btn btn-primary m-0" type="submit">
                            {formData.idMedico ? "Actualizar" : "Guardar nuevo"}
                        </button>
                        <button type="button" onClick={handleCancelar} className="btn btn-secondary rounded-3 text-uppercase">
                            Cancelar
                        </button>
                    </div>
                </div>
            </form>

            <hr className="my-5" />

            <div className="table-responsive col-12 col-md-10 col-lg-8 mb-4 mx-auto">
                <table className="table table-striped align-middle" id="tablaMedicos">
                    <thead className="table-success">
                        <tr>
                            <th>Nombre</th>
                            <th>Especialidad</th>
                            <th>Valor Consulta</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medicos.map((medico) => (
                            <tr key={medico.idMedico}>
                                <td>{medico.nombres} {medico.apellido}</td>
                                <td>{medico.especialidadNombre || "—"}</td>
                                <td>${medico.valorConsulta}</td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-editar fw-semibold me-2"
                                        onClick={() => handleEditarClick(medico)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="btn btn-sm btn-eliminar fw-semibold"
                                        onClick={() => handleEliminarClick(medico.idMedico)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PanelMedicosAdmin;