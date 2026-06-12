import PanelMedicosAdmin from "../components/PanelMedicosAdmin";
import "../dashboard.css"

const PanelAdmin = () => {
    return (
        <main className="container-xxl p-0">
            <h2 className="mb-4">Panel de Administración</h2>
            <ul className="nav nav-tabs px-2" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active fw-semibold" id="medicos-tab" data-bs-toggle="tab"
                        data-bs-target="#medicos-tab-pane" type="button" role="tab" aria-controls="medicos-tab-pane"
                        aria-selected="true">Médicos</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link fw-semibold" id="especialidades-tab" data-bs-toggle="tab"
                        data-bs-target="#especialidades-tab-pane" type="button" role="tab"
                        aria-controls="especialidades-tab-pane" aria-selected="false">Especialidades</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link fw-semibold" id="turnos-tab" data-bs-toggle="tab"
                        data-bs-target="#turnos-tab-pane" type="button" role="tab" aria-controls="turnos-tab-pane"
                        aria-selected="false">Turnos</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link fw-semibold" id="obras-sociales-tab" data-bs-toggle="tab"
                        data-bs-target="#obras-sociales-tab-pane" type="button" role="tab"
                        aria-controls="obras-sociales-tab-pane" aria-selected="false">Obras sociales</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link fw-semibold" id="reservas-tab" data-bs-toggle="tab"
                        data-bs-target="#reservas-tab-pane" type="button" role="tab" aria-controls="reservas-tab-pane"
                        aria-selected="false">Reservas</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link fw-semibold" id="usuarios-tab" data-bs-toggle="tab"
                        data-bs-target="#usuarios-tab-pane" type="button" role="tab" aria-controls="usuarios-tab-pane"
                        aria-selected="false">Usuarios</button>
                </li>
            </ul>

            <div className="tab-content" id="myTabContent">

            <PanelMedicosAdmin />
                
                {/* <h2>ESPECIALIDADES</h2>
                <div className="tab-pane fade" id="especialidades-tab-pane" role="tabpanel" aria-labelledby="especialidades-tab"
                    tabindex="0">
                    <h4 className="pt-5 mt-0">Agregar / Editar especialidad</h4>
                    <form id="especialidadesForm" className="col-12 col-sm-10 col-md-8 col-lg-6 p-3 mb-4 mx-auto">
                        <input type="hidden" id="idEspecialidad">

                            <label for="nombreEspecialidad" className="form-label m-0 mt-2">Nombre de la especialidad</label>
                            <input id="nombreEspecialidad" className="form-control mb-3" type="text" size="50" maxlength="50"
                                name="nombre" placeholder="Ej: Cardiología" required autocomplete="off" />

                            <div className="col-12 d-flex justify-content-center gap-2">
                                <button className="btn btn-primary m-0" type="submit">Guardar</button>
                                <button type="reset" className="btn btn-secondary rounded-3 text-uppercase">Cancelar</button>
                            </div>
                    </form>

                    <div className="table-responsive col-12 col-sm-10 col-md-8 col-lg-6 mb-4 mx-auto">
                        <table className="table table-striped align-middle" id="tablaEspecialidades">
                            <thead className="table-success">
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
                <h2>TURNOS</h2>
                <div className="tab-pane fade" id="turnos-tab-pane" role="tabpanel" aria-labelledby="turnos-tab" tabindex="0">
                    <h4 className="pt-5 mt-0">Administración de Turnos</h4>
                    <div className="col-12 col-sm-10 col-md-8 col-lg-6 mb-4 mx-auto px-2">
                        <label for="medicoSelect" className="form-label m-0 mt-2">Seleccionar médico</label>
                        <select id="medicoSelect" className="form-select">
                            <option value="">Seleccione...</option>
                        </select>
                    </div>

                    <div className="d-flex justify-content-center align-items-center gap-4 my-2">
                        <div className="d-flex justify-content-center align-items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                viewBox="0 0 16 16">
                                <path d="M5 3a5 5 0 0 0 0 10h6a5 5 0 0 0 0-10zm6 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8" />
                            </svg>
                            <span>Disponible</span>
                        </div>
                        <div className="d-flex justify-content-center align-items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                viewBox="0 0 16 16">
                                <path
                                    d="M11 4a4 4 0 0 1 0 8H8a5 5 0 0 0 2-4 5 5 0 0 0-2-4zm-6 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8M0 8a5 5 0 0 0 5 5h6a5 5 0 0 0 0-10H5a5 5 0 0 0-5 5" />
                            </svg>
                            <span>No disponible</span>
                        </div>

                    </div>

                    <div className="table-responsive col-12 col-sm-10 col-md-8 col-lg-6 mb-4 mx-auto px-2">
                        <table className="table table-striped align-middle text-center" id="tablaTurnos">
                            <thead className="table-success">
                                <tr>
                                    <th>Hora</th>
                                    <th>Lu</th>
                                    <th>Ma</th>
                                    <th>Mi</th>
                                    <th>Ju</th>
                                    <th>Vi</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>

                    <div className="col-12 d-flex justify-content-center mb-4">
                        <button id="guardarCambios" className="btn btn-primary mt-3" type="submit" disabled>Guardar
                            cambios</button>
                    </div>
                </div>
                
                <h2>OBRAS SOCIALES</h2>
                <div className="tab-pane fade" id="obras-sociales-tab-pane" role="tabpanel" aria-labelledby="obras-sociales-tab"
                    tabindex="0">
                    <h4 className="pt-5 mt-0">Agregar / Editar Obra Social</h4>
                    <form id="obrasSocialesForm" className="p-3 mb-4 col-12 col-md-10 col-lg-8 mx-auto">
                        <input type="hidden" id="idObraSocial">
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label for="nombreObraSocial" className="form-label m-0 mt-2">Nombre</label>
                                    <input id="nombreObraSocial" type="text" className="form-control" placeholder="Ej: OSDE"
                                        required>
                                </div>

                                <div className="col-md-6">
                                    <label for="descuento" className="form-label m-0 mt-2">Descuento (%)</label>
                                    <input id="descuento" type="number" className="form-control" min="0" max="100"
                                        placeholder="Ej: 40" required>
                                </div>

                                <div className="col-md-12">
                                    <label for="descripcionObraSocial" className="form-label m-0 mt-2">Descripción
                                        (Opcional)</label>
                                    <textarea id="descripcionObraSocial" className="form-control" rows="2"></textarea>
                                </div>


                                <div className="col-12 d-flex justify-content-center gap-2 mt-4">
                                    <button className="btn btn-primary m-0" type="submit">Guardar Obra Social</button>
                                    <button type="reset" className="btn btn-secondary rounded-3 text-uppercase">Cancelar</button>
                                </div>
                            </div>
                    </form>

                    <h4 className="pt-3 mt-0">Listado de Obras Sociales</h4>
                    <div className="table-responsive col-12 col-md-10 col-lg-8 mb-4 mx-auto">
                        <table className="table table-striped align-middle" id="tablaObrasSociales">
                            <thead className="table-success">
                                <tr>
                                    <th>Nombre</th>
                                    <th>Descuento (%)</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                </div>

                <h2>RESERVAS</h2>
                <div className="tab-pane fade" id="reservas-tab-pane" role="tabpanel" aria-labelledby="reservas-tab"
                    tabindex="0">
                    <h4 className="pt-5 mt-0">Editar reserva</h4>

                    <form id="reservaForm" className="p-3 mb-4 col-12 col-lg-10 mx-auto">
                        <input type="hidden" id="idReserva">

                            <div className="row g-3">
                                <div className="col-md-3">
                                    <label className="form-label m-0">Documento</label>
                                    <input id="documentoReserva" type="number" className="form-control" readonly>
                                </div>

                                <div className="col-md-3">
                                    <label className="form-label m-0">Nombre paciente</label>
                                    <input id="nombrePacienteReserva" type="text" className="form-control" required>
                                </div>

                                <div className="col-md-3">
                                    <label className="form-label m-0">Especialidad</label>
                                    <select id="especialidadReserva" className="form-select" required></select>
                                </div>

                                <div className="col-md-3">
                                    <label className="form-label m-0">Médico</label>
                                    <select id="medicoReserva" className="form-select" required></select>
                                </div>

                                <div className="col-md-3">
                                    <label className="form-label m-0">Día</label>
                                    <select id="diaReserva" className="form-select" required>
                                        <option value="">Seleccionar...</option>
                                        <option value="lunes">Lunes</option>
                                        <option value="martes">Martes</option>
                                        <option value="miercoles">Miércoles</option>
                                        <option value="jueves">Jueves</option>
                                        <option value="viernes">Viernes</option>
                                    </select>
                                </div>

                                <div className="col-md-3">
                                    <label className="form-label m-0">Hora</label>
                                    <select id="horaReserva" className="form-select" required>
                                        <option value="">Seleccionar...</option>
                                    </select>
                                </div>

                                <div className="col-md-3">
                                    <label className="form-label m-0">Obra Social</label>
                                    <select id="obraSocialReserva" className="form-select">
                                        <option value="">Sin obra social</option>
                                    </select>
                                </div>

                                <div className="col-md-3">
                                    <label className="form-label m-0">Valor Consulta ($)</label>
                                    <input id="valorConsultaReserva" type="number" className="form-control" readonly>
                                </div>

                                <div className="col-12">
                                    <label className="form-label m-0">Motivo</label>
                                    <textarea id="motivoReserva" className="form-control" rows="2"></textarea>
                                </div>

                                <div className="col-12 d-flex justify-content-center gap-2">
                                    <button className="btn btn-primary m-0" type="submit">Guardar</button>
                                    <button type="reset" className="btn btn-secondary rounded-3 text-uppercase">Cancelar</button>
                                </div>
                            </div>
                    </form>

                    <div className="table-responsive col-12 mb-4 mx-auto px-3">
                        <table className="table table-striped align-middle" id="tablaReservas">
                            <thead className="table-success">
                                <tr>
                                    <th>Paciente</th>
                                    <th>Documento</th>
                                    <th>Especialidad</th>
                                    <th>Médico</th>
                                    <th>Día</th>
                                    <th>Hora</th>
                                    <th>Obra Social</th>
                                    <th>Valor ($)</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                </div>


                <h2>USUARIOS</h2>
                <div className="tab-pane fade" id="usuarios-tab-pane" role="tabpanel" aria-labelledby="usuarios-tab"
                    tabindex="0">
                    <h4 className="pt-5 mt-0 mb-4">Usuarios</h4>
                    <div className="table-responsive px-3 mb-4 mx-auto">
                        <table className="table table-striped align-middle" id="tablaUsuarios">
                            <thead className="table-success">
                                <tr>
                                    <th>Documento</th>
                                    <th>Nombre</th>
                                    <th>Teléfono</th>
                                    <th>Mail</th>
                                    <th>Rol</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>



                </div> */}
            </div>
        </main>
    )
}

export default PanelAdmin