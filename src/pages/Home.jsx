import { Link } from "react-router"

const Home = () => {
    return (
        <div>
            <header className="d-flex flex-column justify-content-center align-items-center text-center mb-5">
                <h1>Bienestar Integral</h1>
                <h2>Clínica médica</h2>
            </header>

            <main>
                <section id="servicios" className="container-xxl d-flex flex-column mx-auto gap-5">
                    <article className="row p-0 p-md-2 p-lg-4">
                        <div className="col-12 col-sm-4 col-md-6 p-0">
                            <img src="images/doc1.webp" alt="Profesionales de la salud" className="img-fluid" />
                        </div>
                        <div className="home-box col-12 col-sm-8 col-md-6">
                            <h2 className="px-md-5">Atención médica de excelencia</h2>
                            <p>En Bienestar Integral contamos con un equipo de profesionales de primer nivel, tecnología de
                                avanzada y instalaciones modernas para brindarle la mejor atención médica. Nuestra prioridad es
                                su salud y bienestar.</p>
                            <Link to={'/institucional'}>
                                <button role="button">Conozca más</button>
                            </Link>
                        </div>
                    </article>

                    <article className="row p-0 p-md-2 p-lg-4">
                        <div className="col-12 col-sm-4 col-md-6 order-sm-2 p-0">
                            <img src="images/doc2.webp" alt="Nuestros servicios" className="img-fluid" />
                        </div>
                        <div className="home-box col-12 col-sm-8 col-md-6 order-sm-1">
                            <h2 className="px-md-5">Servicios especializados</h2>
                            <p>Ofrecemos una amplia gama de servicios médicos que incluyen consultorios externos, prácticas
                                ambulatorias, internación general y terapia intensiva. También contamos con un moderno centro de
                                diagnóstico por imágenes.</p>
                            <Link to={'/profesionales'}>
                                <button role="button">Nuestros servicios</button>
                            </Link>
                        </div>
                    </article>

                    <article className="row p-0 p-md-2 p-lg-4">
                        <div className="col-12 col-sm-4 col-md-6 p-0">
                            <img src="images/doc3.webp" alt="Servicio de emergencias" className="img-fluid" />
                        </div>
                        <div className="home-box col-12 col-sm-8 col-md-6">
                            <h2 className="px-md-5">Guardia y emergencias 24/7</h2>
                            <p>Nuestro servicio de guardia está disponible las 24 horas, los 365 dias del año, con profesionales
                                capacitados para atender urgencias y emergencias. Contamos con todas las especialidades
                                necesarias para resolver cualquier situación crítica.</p>
                            <Link to={'/contacto'}>
                                <button role="button">Más información</button>
                            </Link>
                        </div>
                    </article>
                </section>

                <section className="obras-sociales container-fluid text-center px-md-3 px-lg-5">
                    <div className="container-xxl border rounded bg-white pt-3 pb-5">
                        <h2>Obras sociales</h2>
                        <p>Trabajamos con la mayoría de las obras sociales y prepagas del país</p>
                        <div className="logos-obras-sociales d-flex flex-wrap justify-content-center">
                            <img src="images/obras_sociales/logo-construir-salud.webp" alt="logo-construir-salud" className="img-fluid" />
                            <img src="images/obras_sociales/logo-cover-salud.webp" alt="logo-cover-salud" className="img-fluid" />
                            <img src="images/obras_sociales/logo-dasuten.webp" alt="logo-dasuten" className="img-fluid" />
                            <img src="images/obras_sociales/logo-dosuba.webp" alt="logo-dosuba" className="img-fluid" />
                            <img src="images/obras_sociales/logo-elevar-pasteleros.webp" alt="logo-elevar-pasteleros" className="img-fluid" />
                            <img src="images/obras_sociales/logo-femeba.webp" alt="logo-femeba" className="img-fluid" />
                            <img src="images/obras_sociales/logo-iosfa.webp" alt="logo-iosfa" className="img-fluid" />
                            <img src="images/obras_sociales/logo-obra-social-bancarios.webp" alt="logo-obra-social-bancarios" className="img-fluid" />
                            <img src="images/obras_sociales/logo-obra-social-ferroviarios.webp" alt="logo-obra-social-ferroviarios" className="img-fluid" />
                            <img src="images/obras_sociales/logo-osecac.webp" alt="logo-osecac" className="img-fluid" />
                            <img src="images/obras_sociales/logo-osjera.webp" alt="logo-osjera" className="img-fluid" />
                            <img src="images/obras_sociales/logo-ospat.webp" alt="logo-ospat" className="img-fluid" />
                            <img src="images/obras_sociales/logo-ospe-200x50-1.webp" alt="logo-ospe" className="img-fluid" />
                            <img src="images/obras_sociales/logo-ospic.webp" alt="logo-ospic" className="img-fluid" />
                            <img src="images/obras_sociales/logo-ospim.webp" alt="logo-ospim" className="img-fluid" />
                            <img src="images/obras_sociales/logo-osplad.webp" alt="logo-osplad" className="img-fluid" />
                            <img src="images/obras_sociales/logo-ospm.webp" alt="logo-ospm" className="img-fluid" />
                            <img src="images/obras_sociales/logo-osseg.webp" alt="logo-osseg" className="img-fluid" />
                            <img src="images/obras_sociales/logo-osuthgra.webp" alt="logo-osuthgra" className="img-fluid" />
                        </div>
                    </div>
                </section>

                <section className="solicitar-turno container text-center mx-auto">
                    <h2>Tu salud es nuestra prioridad</h2>
                    <p className="mb-3">En Bienestar Integral nos preocupamos por brindarte la mejor atención en un ambiente cálido y
                        confortable. Contamos con tecnología de punta y profesionales altamente capacitados para cuidar de
                        vos y tu familia.</p>
                    <Link to={'/login'}>
                        <button role="button">Solicitar turno</button>
                    </Link>
                </section>
            </main>
        </div>
    )
}

export default Home