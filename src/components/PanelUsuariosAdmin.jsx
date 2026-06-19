import { useState, useEffect, useCallback } from "react";
import Swal from "sweetalert2";
import { fetchAuth } from "../utils/fetchAuth";
import { capitalizarPalabras } from "../utils/formateador";
import apiUrl from "../api";

const PanelUsuariosAdmin = () => {
    const [usuarios, setUsuarios] = useState([]);

    const [formData, setFormData] = useState({
        idUsuario: "",
        documento: "",
        nombres: "",
        apellido: "",
        email: "",
        contrasenia: "",
        rol: "2"
    });

    const [fotoArchivo, setFotoArchivo] = useState(null);

    const cargarUsuarios = useCallback(async () => {
        try {
            const res = await fetchAuth(`/v2/usuarios?t=${Date.now()}`);
            if (res.ok) {
                const data = await res.json();
                setUsuarios(data);
            }
        } catch (error) {
            console.error("Error al cargar usuarios:", error);
        }
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        cargarUsuarios();
    }, [cargarUsuarios]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setFotoArchivo(e.target.files[0]);
        } else {
            setFotoArchivo(null);
        }
    };

    const handleReset = () => {
        setFormData({
            idUsuario: "",
            documento: "",
            nombres: "",
            apellido: "",
            email: "",
            contrasenia: "",
            rol: "2"
        });
        setFotoArchivo(null);
        
        const fotoInput = document.getElementById("fotoUsuario");
        if (fotoInput) {
            fotoInput.value = "";
        }
    };

    const handleEditClick = (usuario) => {
        setFormData({
            idUsuario: usuario.idUsuario,
            documento: usuario.documento || "",
            nombres: capitalizarPalabras(usuario.nombres || ""),
            apellido: capitalizarPalabras(usuario.apellido || ""),
            email: usuario.email || "",
            contrasenia: "",
            rol: usuario.rol || "2"
        });
        setFotoArchivo(null);
        
        const fotoInput = document.getElementById("fotoUsuario");
        if (fotoInput) {
            fotoInput.value = "";
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const esEdicion = formData.idUsuario !== "";
        const url = esEdicion ? `/v2/usuarios/${formData.idUsuario}` : `/v2/usuarios`;
        const metodo = esEdicion ? "PUT" : "POST";

        const payload = new FormData();
        payload.append("documento", formData.documento.trim());
        payload.append("nombres", formData.nombres.trim());
        payload.append("apellido", formData.apellido.trim());
        payload.append("email", formData.email.trim().toLowerCase());
        payload.append("rol", formData.rol);

        if (formData.contrasenia.trim() !== "") {
            payload.append("contrasenia", formData.contrasenia);
        }

        if (fotoArchivo) {
            payload.append("foto", fotoArchivo);
        }

        try {
            const res = await fetchAuth(url, {
                method: metodo,
                body: payload
            });

            if (res.ok) {
                await Swal.fire({
                    title: "¡Guardado!",
                    text: `El usuario se ha ${esEdicion ? "actualizado" : "creado"} correctamente.`,
                    icon: "success",
                    confirmButtonColor: "#045a29",
                    timer: 1500,
                    showConfirmButton: false
                });

                handleReset();
                cargarUsuarios();
            } else {
                const data = await res.json();
                throw new Error(data.mensaje || "Error al guardar el usuario");
            }
        } catch (error) {
            console.error("Error guardando:", error);
            Swal.fire({
                icon: "error",
                title: "Error al guardar",
                text: error.message,
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
            confirmButtonText: "Sí, eliminar"
        });

        if (result.isConfirmed) {
            try {
                const res = await fetchAuth(`/v2/usuarios/${id}`, { method: "DELETE" });
                if (res.ok) {
                    Swal.fire({ title: "¡Eliminado!", icon: "success", confirmButtonColor: "#045a29", timer: 1500 });
                    if (formData.idUsuario === id) handleReset();
                    cargarUsuarios();
                } else {
                    throw new Error("Error al eliminar");
                }
            } catch (error) {
                console.error(error)
                Swal.fire({ icon: "error", title: "Error", text: "No se pudo eliminar el usuario.", confirmButtonColor: "#044166" });
            }
        }
    };

    const renderRol = (rol) => {
        switch (Number(rol)) {
            case 1: return <span className="badge bg-primary">Médico</span>;
            case 2: return <span className="badge bg-success">Paciente</span>;
            case 3: return <span className="badge bg-dark">Admin</span>;
            default: return <span className="badge bg-secondary">Desconocido</span>;
        }
    };

    return (
        <div className="tab-pane fade show active" id="usuarios-tab-pane" role="tabpanel" tabIndex="0">
            <h4 className="pt-5 mt-0">Agregar / Editar Usuario</h4>

            <form id="usuariosForm" className="col-12 col-md-10 col-lg-8 p-3 mb-4 mx-auto" onSubmit={handleSubmit}>
                <div className="row g-3">
                    <div className="col-md-3">
                        <label className="form-label m-0 mt-2">ID</label>
                        <input value={formData.idUsuario} type="text" className="form-control text-center" disabled placeholder="Auto" />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label m-0 mt-2">Documento</label>
                        <input className="form-control" type="text" name="documento" value={formData.documento} onChange={handleChange} maxLength="20" required autoComplete="off" />
                    </div>
                    <div className="col-md-5">
                        <label className="form-label m-0 mt-2">Rol</label>
                        <select className="form-select" name="rol" value={formData.rol} onChange={handleChange} required>
                            <option value="1">Médico</option>
                            <option value="2">Paciente</option>
                        </select>
                    </div>

                    <div className="col-md-6">
                        <label className="form-label m-0 mt-2">Nombres</label>
                        <input className="form-control" type="text" name="nombres" value={formData.nombres} onChange={handleChange} maxLength="100" required autoComplete="off" />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label m-0 mt-2">Apellido</label>
                        <input className="form-control" type="text" name="apellido" value={formData.apellido} onChange={handleChange} maxLength="100" required autoComplete="off" />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label m-0 mt-2">Email</label>
                        <input className="form-control" type="email" name="email" value={formData.email} onChange={handleChange} maxLength="255" required autoComplete="off" />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label m-0 mt-2">Contraseña</label>
                        <input className="form-control" type="password" name="contrasenia" value={formData.contrasenia} onChange={handleChange} placeholder={formData.idUsuario ? "Dejar en blanco para no cambiar" : ""} minLength="6" required={formData.idUsuario === ""} />
                    </div>

                    {formData.idUsuario !== "" && (
                        <div className="col-12">
                            <label className="form-label m-0 mt-2">Actualizar foto de perfil</label>
                            <input className="form-control" type="file" id="fotoUsuario" name="foto" accept="image/*" onChange={handleFileChange} />
                        </div>
                    )}
                </div>

                <div className="col-12 d-flex justify-content-center gap-2 mt-4">
                    <button className="btn btn-primary m-0" type="submit">Guardar</button>
                    <button type="button" className="btn btn-secondary rounded-3 text-uppercase" onClick={handleReset}>Cancelar</button>
                </div>
            </form>

            <div className="table-responsive col-12 mb-4 mx-auto px-3">
                <table className="table table-striped align-middle text-center" id="tablaUsuarios">
                    <thead className="table-success">
                        <tr>
                            <th>Avatar</th>
                            <th>ID</th>
                            <th>Documento</th>
                            <th className="text-start">Usuario</th>
                            <th>Email</th>
                            <th>Rol</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.length === 0 ? (
                            <tr><td colSpan="7" className="text-center py-3">No hay usuarios registrados...</td></tr>
                        ) : (
                            usuarios.map((u) => {
                                const baseUrl = apiUrl.split('/api')[0];
                                const avatarSrc = u.fotoPath ? `${baseUrl}/uploads/${u.fotoPath}` : "/images/default-avatar.png";

                                if (u.rol !== 3) {
                                    return (
                                        <tr key={u.idUsuario}>
                                            <td>
                                                <img src={avatarSrc} alt="Avatar" className="rounded-circle" style={{ width: "40px", height: "40px", objectFit: "cover" }} />
                                            </td>
                                            <td>{u.idUsuario}</td>
                                            <td>{u.documento}</td>
                                            <td className="text-start">{capitalizarPalabras(`${u.apellido}, ${u.nombres}`)}</td>
                                            <td>{u.email}</td>
                                            <td>{renderRol(u.rol)}</td>
                                            <td>
                                                <div className="d-flex justify-content-center gap-2">
                                                    <button className="btn btn-sm btn-editar" onClick={() => handleEditClick(u)}>Editar</button>
                                                    <button className="btn btn-sm btn-eliminar" onClick={() => handleDeleteClick(u.idUsuario)}>Eliminar</button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                } else { null };
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PanelUsuariosAdmin;