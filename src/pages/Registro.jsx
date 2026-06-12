import { Link } from "react-router"

const Registro = () => {
    return (
        <main>
            <section className="container my-5 px-2">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6">
                        <div className="formulario p-4 px-md-5 rounded shadow border">
                            <h2 className="mb-4">Registro de Usuario</h2>
                            <form id="login-form">
                                <div className="mb-3">
                                    <label htmlFor="usermail" className="form-label m-0 mt-2">Correo Electrónico</label>
                                    <input type="email" className="form-control" id="usermail" required />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="password" className="form-label m-0 mt-2">Contraseña</label>
                                    <div className="input-group">
                                        <input type="password" className="form-control" id="password" required />
                                    </div>
                                </div>
                                <Link to={'/registro'} className="fst-italic">
                                    Aún no tengo cuenta
                                </Link>
                                <button type="submit" className="btn btn-primary w-30 mt-4">Ingresar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Registro