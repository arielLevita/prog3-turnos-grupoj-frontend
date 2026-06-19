import { useState, useEffect, useCallback } from "react";
import Swal from "sweetalert2";
import { fetchAuth } from "../utils/fetchAuth";
import { capitalizarPalabras } from "../utils/formateador.js";

const PanelObrasSocialesAdmin = () => {
    const [obrasSociales, setObrasSociales] = useState([]);
    const [formData, setFormData] = useState({
        idObraSocial: "",
        nombre: "",
        descripcion: "",
        porcentajeDescuento: "",
        esParticular: false
    });

    const cargarObrasSociales = useCallback(async () => {
        try {
            const res = await fetchAuth(`/v2/obras-sociales?t=${Date.now()}`);
            if (res.ok) {
                const data = await res.json();
                setObrasSociales(data);
            } else {
                throw new Error("Error en la respuesta de la API");
            }
        } catch (error) {
            console.error("Error al cargar obras sociales:", error);
        }
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        cargarObrasSociales();
    }, [cargarObrasSociales]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const handleReset = () => {
        setFormData({
            idObraSocial: "",
            nombre: "",
            descripcion: "",
            porcentajeDescuento: "",
            esParticular: false
        });
    };

    const handleEditClick = (os) => {
        setFormData({
            idObraSocial: os.idObraSocial || os.id_obra_social,
            nombre: capitalizarPalabras(os.nombre) || "",
            descripcion: os.descripcion || "",
            porcentajeDescuento: os.porcentajeDescuento || os.porcentaje_descuento || "",
            esParticular: os.esParticular || os.es_particular || false
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const esEdicion = formData.idObraSocial !== "";
        const url = esEdicion ? `/v2/obras-sociales/${formData.idObraSocial}` : `/v2/obras-sociales`;
        const metodo = esEdicion ? "PUT" : "POST";

        // Lógica para autogenerar la descripción si viene vacía
        const nombreLimpio = formData.nombre.trim();
        let descFinal = formData.descripcion.trim().toUpperCase();

        if (descFinal === "" && nombreLimpio.length >= 3) {
            descFinal = nombreLimpio.substring(0, 3).toUpperCase();
        }

        const payload = {
            nombre: nombreLimpio,
            descripcion: descFinal,
            porcentajeDescuento: Number(parseFloat(formData.porcentajeDescuento).toFixed(2)),
            esParticular: formData.esParticular
        };

        try {
            const res = await fetchAuth(url, {
                method: metodo,
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                await Swal.fire({
                    title: "¡Guardado!",
                    text: `La obra social se ha ${esEdicion ? "actualizado" : "creado"} correctamente.`,
                    icon: "success",
                    confirmButtonColor: "#045a29",
                    timer: 1500,
                    showConfirmButton: false
                });

                if (esEdicion) {
                    setObrasSociales(prevOS =>
                        prevOS.map(os => {
                            const idLocal = os.idObraSocial || os.id_obra_social;
                            return idLocal === formData.idObraSocial
                                ? { ...os, ...payload }
                                : os;
                        })
                    );
                } else {
                    cargarObrasSociales();
                }

                handleReset();
            } else {
                const data = await res.json();
                throw new Error(data.mensaje || "Error al guardar la obra social");
            }
        } catch (error) {
            console.error("Error guardando:", error);
            Swal.fire({
                icon: "error",
                title: "Error al guardar",
                text: error.message || "Hubo un problema al procesar la solicitud.",
                confirmButtonColor: "#044166"
            });
        }
    };

    const handleDeleteClick = async (id) => {
        const result = await Swal.fire({
            title: "¿Estás seguro?",
            text: "No podrás revertir esta acción.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar"
        });

        if (result.isConfirmed) {
            try {
                const res = await fetchAuth(`/v2/obras-sociales/${id}`, { method: "DELETE" });

                if (res.ok) {
                    Swal.fire({
                        title: "¡Eliminada!",
                        text: "La obra social ha sido eliminada.",
                        icon: "success",
                        confirmButtonColor: "#045a29"
                    });

                    if (formData.idObraSocial === id) {
                        handleReset();
                    }
                    cargarObrasSociales();
                } else {
                    const data = await res.json();
                    throw new Error(data.mensaje || "Error al eliminar");
                }
            } catch (error) {
                console.error("Error eliminando:", error);
                Swal.fire({
                    icon: "error",
                    title: "No se pudo eliminar",
                    text: "Es posible que haya pacientes o turnos asignados a esta obra social.",
                    confirmButtonColor: "#044166"
                });
            }
        }
    };

    return (
        <div className="tab-pane fade show active" id="obras-sociales-tab-pane" role="tabpanel" aria-labelledby="obras-sociales-tab" tabIndex="0">
            <h4 className="pt-5 mt-0">Agregar / Editar Obra Social</h4>

            <form id="obrasSocialesForm" className="col-12 col-md-10 col-lg-8 p-3 mb-4 mx-auto" onSubmit={handleSubmit}>
                <div className="row g-3">
                    <div className="col-md-2">
                        <label htmlFor="idObraSocialDisplay" className="form-label m-0 mt-2">ID</label>
                        <input
                            id="idObraSocialDisplay"
                            value={formData.idObraSocial}
                            type="text"
                            className="form-control text-center"
                            disabled
                            placeholder="Auto"
                        />
                    </div>

                    <div className="col-md-5">
                        <label htmlFor="nombreOS" className="form-label m-0 mt-2">Nombre</label>
                        <input
                            id="nombreOS"
                            className="form-control"
                            type="text"
                            maxLength="100"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            placeholder="Ej: Galeno"
                            required
                            autoComplete="off"
                        />
                    </div>

                    <div className="col-md-3">
                        <label htmlFor="descripcionOS" className="form-label m-0 mt-2">Descripción</label>
                        <input
                            id="descripcionOS"
                            className="form-control"
                            type="text"
                            maxLength="10"
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleChange}
                            placeholder="Ej: GAL (Opcional)"
                            autoComplete="off"
                        />
                    </div>

                    <div className="col-md-2">
                        <label htmlFor="porcentajeOS" className="form-label m-0 mt-2">Descuento (%)</label>
                        <input
                            id="porcentajeOS"
                            className="form-control"
                            type="number"
                            step="0.01"
                            min="0"
                            max="100"
                            name="porcentajeDescuento"
                            value={formData.porcentajeDescuento}
                            onChange={handleChange}
                            placeholder="0.00"
                            required
                        />
                    </div>

                    <div className="col-12 mt-3">
                        <div className="form-check form-switch">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                id="esParticularSwitch"
                                name="esParticular"
                                checked={formData.esParticular}
                                onChange={handleChange}
                            />
                            <label className="form-check-label user-select-none" htmlFor="esParticularSwitch">
                                Clasificar como plan Particular (sin cobertura formal)
                            </label>
                        </div>
                    </div>
                </div>

                <div className="col-12 d-flex justify-content-center gap-2 mt-4">
                    <button className="btn btn-primary m-0" type="submit">Guardar</button>
                    <button type="button" className="btn btn-secondary rounded-3 text-uppercase" onClick={handleReset}>Cancelar</button>
                </div>
            </form>

            <div className="table-responsive col-12 col-md-10 col-lg-8 mb-4 mx-auto">
                <table className="table table-striped align-middle text-center" id="tablaObrasSociales">
                    <thead className="table-success">
                        <tr>
                            <th>ID</th>
                            <th className="text-start">Nombre</th>
                            <th>Descripción</th>
                            <th>Descuento</th>
                            <th>Particular</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {obrasSociales.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center py-3">No hay obras sociales registradas o cargando...</td>
                            </tr>
                        ) : (
                            obrasSociales.map((os) => {
                                const id = os.idObraSocial || os.id_obra_social;
                                const desc = os.porcentajeDescuento !== undefined ? os.porcentajeDescuento : os.porcentaje_descuento;
                                const esPart = os.esParticular !== undefined ? os.esParticular : os.es_particular;

                                return (
                                    <tr key={id}>
                                        <td>{id}</td>
                                        <td className="text-start">{capitalizarPalabras(os.nombre)}</td>
                                        <td>{os.descripcion}</td>
                                        <td>{Number(desc).toFixed(2)}%</td>
                                        <td>{esPart ? "Sí" : "No"}</td>
                                        <td>
                                            <div className="d-flex justify-content-center gap-2">
                                                <button
                                                    className="btn btn-sm btn-editar"
                                                    onClick={() => handleEditClick(os)}
                                                    title="Editar"
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-eliminar"
                                                    onClick={() => handleDeleteClick(id)}
                                                    title="Eliminar"
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PanelObrasSocialesAdmin;