import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import apiUrl from "../api";

const Registro = () => {
    const [documento, setDocumento] = useState("");
    const [nombres, setNombres] = useState("");
    const [apellido, setApellido] = useState("");
    const [email, setEmail] = useState("");
    const [contrasenia, setContrasenia] = useState("");

    const [obrasSociales, setObrasSociales] = useState([]);
    const [idObraSocial, setIdObraSocial] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const obtenerObrasSociales = async () => {
            try {
                const res = await fetch(`${apiUrl}/v2/public/obras-sociales`);
                if (res.ok) {
                    const data = await res.json();
                    setObrasSociales(data);
                }
            } catch (error) {
                console.error("Error al cargar obras sociales:", error);
            }
        };
        obtenerObrasSociales();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const nuevoUsuario = {
            documento: documento,
            apellido: apellido,
            nombres: nombres,
            email: email,
            contrasenia: contrasenia,
            fotoPath: "",
            rol: 2,
            idObraSocial: idObraSocial === "" ? 0 : Number(idObraSocial)
        };

        try {
            const res = await fetch(`${apiUrl}/v2/public/usuarios`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(nuevoUsuario)
            });

            const data = await res.json();

            if (res.ok) {
                await Swal.fire({
                    title: "¡Registro exitoso!",
                    text: "Tu cuenta ha sido creada correctamente.",
                    icon: "success",
                    confirmButtonColor: "#045a29",
                    timer: 2000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                    didClose: () => {
                        navigate("/login");
                    }
                });
            } else {
                let mensajeError = data.mensaje || "No se pudo completar el registro.";
                if (data.errors && data.errors.length > 0) {
                    mensajeError = data.errors[0].msg;
                }

                Swal.fire({
                    icon: "error",
                    title: "Error al registrar",
                    text: mensajeError,
                    confirmButtonColor: "#044166"
                });
            }
        } catch (error) {
            console.error("Error en el registro:", error);
            Swal.fire({
                icon: "error",
                title: "Error del servidor",
                text: "No se pudo establecer conexión con el servidor.",
                confirmButtonColor: "#044166"
            });
        }
    };

    return (
        <main>
            <section className="container my-5 px-2">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6">
                        <div className="formulario p-4 px-md-5 rounded shadow border">
                            <div className="mb-3">
                                <h2>Crear Cuenta</h2>
                                <small>Formulario válido únicamente para <span className="fw-bold">pacientes</span>. Si usted es Doctor, comuníquese con el administrador a través del <Link to={'/contacto'}>formulario</Link></small>
                            </div>

                            <form id="register-form" onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="documento" className="form-label m-0 mt-2">Documento</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="documento"
                                        value={documento}
                                        onChange={(e) => setDocumento(e.target.value)}
                                        maxLength={20}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="nombres" className="form-label m-0 mt-2">Nombres</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nombres"
                                        value={nombres}
                                        onChange={(e) => setNombres(e.target.value)}
                                        maxLength={100}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="apellido" className="form-label m-0 mt-2">Apellido</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="apellido"
                                        value={apellido}
                                        onChange={(e) => setApellido(e.target.value)}
                                        maxLength={100}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="usermail" className="form-label m-0 mt-2">Correo Electrónico</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="usermail"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        maxLength={255}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label m-0 mt-2">Contraseña</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        value={contrasenia}
                                        onChange={(e) => setContrasenia(e.target.value)}
                                        minLength={6}
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="obraSocial" className="form-label m-0 mt-2">Obra Social</label>
                                    <select
                                        id="obraSocial"
                                        className="form-select"
                                        value={idObraSocial}
                                        onChange={(e) => setIdObraSocial(e.target.value)}
                                        required
                                    >
                                        <option value="" disabled>Seleccionar cobertura...</option>
                                        {obrasSociales.map((os) => (
                                            <option key={os.idObraSocial || os.id_obra_social} value={os.idObraSocial || os.id_obra_social}>
                                                {os.nombre}
                                            </option>
                                        ))}
                                        <option value="0">Ninguna de las anteriores / Particular</option>
                                    </select>
                                </div>

                                <Link to={'/login'} className="fst-italic">
                                    Ya tengo una cuenta. Iniciar sesión.
                                </Link>

                                <button type="submit" className="btn btn-primary w-30 mt-4 d-block">
                                    Registrarme
                                </button>
                            </form>

                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Registro;