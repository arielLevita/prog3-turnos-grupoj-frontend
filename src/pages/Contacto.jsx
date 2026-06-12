import Swal from 'sweetalert2'

const Contacto = () => {

    const onSubmit = async (event) => {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);

        Swal.fire({
            title: "Enviando mensaje...",
            timer: 2000,
            animation: false,
            showConfirmButton: false,
            timerProgressBar: true,
            toast: true,
            position: "bottom",
            icon: "info",
            didClose: async () => {
                formData.append("access_key", import.meta.env.VITE_APP_W3FORMS_KEY);

                try {
                    const response = await fetch("https://api.web3forms.com/submit", {
                        method: "POST",
                        body: formData
                    });

                    const data = await response.json();

                    if (data.success) {
                        Swal.fire({
                            title: "Mensaje enviado exitosamente",
                            icon: "success",
                            confirmButtonColor: "#044166"
                        });
                        form.reset();
                    } else {
                        console.log("Error", data);
                        Swal.fire({
                            title: "Error al enviar el mensaje",
                            icon: "error"
                        });
                    }
                } catch (error) {
                    console.error("Error de red:", error);
                    Swal.fire({
                        title: "Error de conexión",
                        text: "No se pudo conectar con el servidor.",
                        icon: "error"
                    });
                }
            }
        })
    };

    return (
        <main>
            <section className="container-xxl my-5">
                <h2>Contactanos</h2>
                <p className="text-center text-secondary m-0">Comuníquese con nosotros o complete el formulario.</p>
                <p className="text-center text-secondary m-0 mb-4">Nos pondremos en contacto con usted a la brevedad.</p>
                <div className="row justify-content-center gap-4 px-2">
                    <div className="canales col-12 col-sm-10 col-md-4 rounded shadow p-3 px-sm-4 border">
                        <h3 className="text-start mb-2">Nuestros canales</h3>
                        <hr className="mt-0" />
                        <ul className="d-flex flex-column gap-3 mt-4 mx-auto p-0">
                            <li className="d-flex align-items-center gap-1">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                        <path fillRule="evenodd"
                                            d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
                                    </svg>
                                </span>
                                +54 345 4231400
                            </li>
                            <li className="d-flex align-items-center gap-1">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                        <path
                                            d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                                    </svg>
                                </span>
                                123-456-789
                            </li>
                            <li className="d-flex align-items-center gap-1">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                        <path
                                            d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2zm3.708 6.208L1 11.105V5.383zM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2z" />
                                        <path
                                            d="M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648m-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8Z" />
                                    </svg>
                                </span>
                                <a href="mailto:bienestarintegral@gmail.com" className="text-break">bienestarintegral@gmail.com</a>
                            </li>
                            <li className="d-flex align-items-center gap-1">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                        <path
                                            d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                                    </svg>
                                </span>
                                Monseñor Tavella 1424, Concordia
                            </li>
                        </ul>
                    </div>

                    <div className="formulario col-12 col-sm-10 col-md-6 rounded shadow p-3 px-sm-4 border">
                        <h3 className="text-start mb-2">Complete el formulario</h3>
                        <hr className="mt-0" />
                        <form className="form fs-6 mt-2" onSubmit={onSubmit} autoComplete="on">
                            <input type='hidden' name='proyecto' value={'Bienestar Integral - Programación III - UNER'} />
                            <label htmlFor="etiqueta01" className="form-label m-0 mt-2">Nombre</label>
                            <input type="text" name="Nombre" placeholder="Ej: Juan Pérez" id="etiqueta01" required />
                            <label htmlFor="etiqueta02" className="form-label m-0 mt-2">Correo electrónico</label>
                            <input type="email" name="Correo" placeholder="Ej: perez.juan@correo.com" id="etiqueta02" required />
                            <label htmlFor="etiqueta03" className="form-label m-0 mt-2">Teléfono</label>
                            <input type="number" name="Telefono" placeholder="3456345687" id="etiqueta03" required />
                            <label htmlFor="etiqueta04" className="form-label m-0 mt-2">Su consulta</label>
                            <textarea name="mensaje" rows="6" placeholder="Escriba aquí su consulta..." id="etiqueta04" className="mb-3" required></textarea>
                            <button type="submit" className="boton-enviar" role="button">Enviar</button>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Contacto