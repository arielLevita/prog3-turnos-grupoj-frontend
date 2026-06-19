import { useState, useEffect, useCallback } from "react";
import Swal from "sweetalert2";
import { fetchAuth } from "../utils/fetchAuth";
import { capitalizarPalabras } from "../utils/formateador.js";

const PanelEspecialidadesAdmin = () => {
    const [especialidades, setEspecialidades] = useState([]);
    const [formData, setFormData] = useState({
        idEspecialidad: "",
        nombre: ""
    });

    const cargarEspecialidades = useCallback(async () => {
        try {
            const res = await fetchAuth("/v2/especialidades");
            if (res.ok) {
                const data = await res.json();
                setEspecialidades(data);
            } else {
                throw new Error("Error en la respuesta de la API");
            }
        } catch (error) {
            console.error("Error al cargar especialidades:", error);
        }
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        cargarEspecialidades();
    }, [cargarEspecialidades]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleReset = () => {
        setFormData({ idEspecialidad: "", nombre: "" });
    };

    const handleEditClick = (especialidad) => {
        setFormData({
            idEspecialidad: especialidad.idEspecialidad || especialidad.id_especialidad,
            nombre: capitalizarPalabras(especialidad.nombre) || capitalizarPalabras(especialidad.especialidadNombre) || ""
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const esEdicion = formData.idEspecialidad !== "";
        const url = esEdicion ? `/v2/especialidades/${formData.idEspecialidad}` : `/v2/especialidades`;
        const metodo = esEdicion ? "PUT" : "POST";

        const payload = {
            nombre: formData.nombre.trim().toUpperCase()
        };

        try {
            const res = await fetchAuth(url, {
                method: metodo,
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                await Swal.fire({
                    title: "¡Guardado!",
                    text: `La especialidad se ha ${esEdicion ? "actualizado" : "creado"} correctamente.`,
                    icon: "success",
                    confirmButtonColor: "#045a29",
                    timer: 1500,
                    showConfirmButton: false
                });

                if (esEdicion) {
                    setEspecialidades(prevEspecialidades =>
                        prevEspecialidades.map(esp => {
                            const idLocal = esp.idEspecialidad || esp.id_especialidad;
                            return idLocal === formData.idEspecialidad
                                ? { ...esp, nombre: payload.nombre, especialidadNombre: payload.nombre }
                                : esp;
                        })
                    );
                } else {
                    cargarEspecialidades();
                }

                handleReset();
            }
            else {
                const data = await res.json();
                throw new Error(data.mensaje || "Error al guardar la especialidad");
            }
        } catch (error) {
            console.error("Error guardando:", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.message || "Hubo un problema al guardar la especialidad.",
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
                const res = await fetchAuth(`/v2/especialidades/${id}`, { method: "DELETE" });

                if (res.ok) {
                    Swal.fire({
                        title: "¡Eliminada!",
                        text: "La especialidad ha sido eliminada.",
                        icon: "success",
                        confirmButtonColor: "#045a29"
                    });

                    if (formData.idEspecialidad === id) {
                        handleReset();
                    }

                    cargarEspecialidades();
                } else {
                    const data = await res.json();
                    throw new Error(data.mensaje || "Error al eliminar");
                }
            } catch (error) {
                console.error("Error eliminando:", error);
                Swal.fire({
                    icon: "error",
                    title: "No se pudo eliminar",
                    text: "Es posible que haya médicos asignados a esta especialidad.",
                    confirmButtonColor: "#044166"
                });
            }
        }
    };

    return (
        <>
            <h4 className="pt-5 mt-0">Agregar / Editar especialidad</h4>

            <form id="especialidadesForm" className="col-12 col-sm-10 col-md-8 col-lg-6 p-3 mb-4 mx-auto" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-3">
                        <label htmlFor="idEspecialidadDisplay" className="form-label m-0 mt-2">ID</label>
                        <input
                            id="idEspecialidadDisplay"
                            value={formData.idEspecialidad}
                            type="text"
                            className="form-control text-center"
                            disabled
                            placeholder="Auto"
                        />
                    </div>

                    <div className="col-md-9">
                        <label htmlFor="nombreEspecialidad" className="form-label m-0 mt-2">Nombre de la especialidad</label>
                        <input
                            id="nombreEspecialidad"
                            className="form-control mb-3"
                            type="text"
                            maxLength="50"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            placeholder="Ej: CARDIOLOGÍA"
                            required
                            autoComplete="off"
                        />
                    </div>
                </div>

                <div className="col-12 d-flex justify-content-center gap-2 mt-3">
                    <button className="btn btn-primary m-0" type="submit">Guardar</button>
                    <button type="button" className="btn btn-secondary rounded-3 text-uppercase" onClick={handleReset}>Cancelar</button>
                </div>
            </form>

            <div className="table-responsive col-12 col-sm-10 col-md-8 col-lg-6 mb-4 mx-auto">
                <table className="table table-striped align-middle text-center" id="tablaEspecialidades">
                    <thead className="table-success">
                        <tr>
                            <th>ID</th>
                            <th className="text-start">Nombre</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {especialidades.length === 0 ? (
                            <tr>
                                <td colSpan="3" className="text-center py-3">No hay especialidades registradas o cargando...</td>
                            </tr>
                        ) : (
                            especialidades.map((esp) => {
                                const id = esp.idEspecialidad || esp.id_especialidad;
                                return (
                                    <tr key={id}>
                                        <td>{id}</td>
                                        <td className="text-start">{capitalizarPalabras(esp.nombre) || capitalizarPalabras(esp.especialidadNombre)}</td>
                                        <td>
                                            <div className="d-flex justify-content-center gap-2">
                                                <button
                                                    className="btn btn-sm btn-editar"
                                                    onClick={() => handleEditClick(esp)}
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
        </>
    );
};

export default PanelEspecialidadesAdmin;