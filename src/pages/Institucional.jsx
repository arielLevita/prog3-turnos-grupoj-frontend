const Institucional = () => {
    return (
        <div>
            <header id="header-institucional" className="d-flex flex-column justify-content-center align-items-center text-center">
                <h1>Bienestar Integral</h1>
                <h2>Institucional</h2>
            </header>


            <main>
                <section id="institucional">
                    <article className="px-4 pt-3 pb-5">
                        <h2>Nuestra Historia</h2>
                        <p className="col-md-10 text-center">El Centro Médico Bienestar Integral abrió en 2010 con un pequeño equipo y la misión de acercar salud
                            de calidad a la comunidad. Con esfuerzo constante crecimos en infraestructura, especialidades y
                            tecnología. En 2015 sumamos diagnóstico por imágenes de alta complejidad y en 2019 obtuvimos certificaciones
                            internacionales de calidad. En 2023 incorporamos telemedicina y un portal digital de pacientes. Cada
                            avance fue posible gracias a nuestro equipo y a la confianza de miles de pacientes que nos eligen
                            cada año.</p>
                    </article>

                    <article className="px-4 pt-3 pb-5">
                        <h2>¿Quiénes somos?</h2>
                        <p className="col-md-10 text-center">En el Centro Médico Bienestar Integral creemos que la salud es un derecho universal. Buscamos unir
                            ciencia y humanidad ofreciendo atención profesional, tecnología avanzada y un trato cercano. Gracias
                            a la confianza de nuestros pacientes y al compromiso de nuestros equipos, nos consolidamos como
                            referente regional. Acompañamos a cada persona en prevención, diagnóstico, tratamiento y recuperación,
                            garantizando accesibilidad, calidad y calidez en todo momento.</p>
                    </article>

                    <article className="px-4 pt-3 pb-5">
                        <h2>Nuestra Misión</h2>
                        <p className="col-md-10 text-center">Nuestra misión es brindar atención integral que contemple lo físico, emocional y social. Queremos que
                            cada persona se sienta escuchada y acompañada. Promovemos la prevención, hábitos saludables y la
                            confianza médico-paciente. Contamos con un equipo interdisciplinario capacitado, que trabaja con
                            protocolos basados en evidencia y herramientas innovadoras. Nuestro compromiso es ofrecer atención
                            ética, inclusiva y sostenida en valores humanos.</p>
                    </article>

                    <article className="px-4 pt-3 pb-5">
                        <h2>Nuestra Visión</h2>
                        <p className="col-md-10 text-center">Aspiramos a ser un centro de referencia regional y nacional, reconocido no solo por la calidad
                            técnica, sino por el impacto positivo en la vida de las personas. Buscamos liderar con innovación,
                            incorporando nuevas tecnologías diagnósticas y terapéuticas, y ampliando nuestro alcance mediante programas
                            comunitarios y campañas preventivas. Creemos en una medicina que combine excelencia científica,
                            inclusión social y sostenibilidad ambiental.</p>
                    </article>

                    <article className="container p-4">
                        <h2 className="mb-4 text-center">Nuestros Valores</h2>

                        <div id="valores" className="row row-cols-1 row-cols-sm-2 row-cols-lg-3">
                            <div className="col d-flex justify-content-center">
                                <div className="valores-contenedor p-3">
                                    <h3 className="h5 mb-2">Humanidad</h3>
                                    <p className="mb-0 text-center">Ponemos a las personas en el centro. Escuchar,
                                        comprender y contener es tan importante como un diagnóstico certero.</p>
                                </div>
                            </div>

                            <div className="col d-flex justify-content-center">
                                <div className="valores-contenedor p-3">
                                    <h3 className="h5 mb-2">Excelencia</h3>
                                    <p className="mb-0 text-center">Formación continua y protocolos basados en evidencia
                                        para elevar la calidad de la atención.</p>
                                </div>
                            </div>

                            <div className="col d-flex justify-content-center">
                                <div className="valores-contenedor p-3">
                                    <h3 className="h5 mb-2">Transparencia</h3>
                                    <p className="mb-0 text-center">Información clara y completa para decisiones conscientes
                                        de pacientes y familias.</p>
                                </div>
                            </div>

                            <div className="col d-flex justify-content-center">
                                <div className="valores-contenedor p-3">
                                    <h3 className="h5 mb-2">Trabajo en equipo</h3>
                                    <p className="mb-0 text-center">Colaboración interdisciplinaria y diálogo permanente
                                        centrados en la persona.</p>
                                </div>
                            </div>

                            <div className="col d-flex justify-content-center">
                                <div className="valores-contenedor p-3">
                                    <h3 className="h5 mb-2">Innovación</h3>
                                    <p className="mb-0 text-center">Tecnología que mejora seguridad, reduce tiempos y amplía
                                        el acceso sin perder calidez.</p>
                                </div>
                            </div>

                            <div className="col d-flex justify-content-center">
                                <div className="valores-contenedor p-3">
                                    <h3 className="h5 mb-2">Compromiso social</h3>
                                    <p className="mb-0 text-center">Campañas, talleres y acciones comunitarias para promover
                                        salud y reducir desigualdades.</p>
                                </div>
                            </div>
                        </div>
                    </article>
                </section>
            </main>
        </div>
    )
}

export default Institucional