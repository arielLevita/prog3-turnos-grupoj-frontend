import { useEffect, useState } from "react";
import apiUrl from "../api";

const Profesionales = () => {
    const [especialidades, setEspecialidades] = useState([]);
    const [medicos, setMedicos] = useState([]);

    useEffect(() => {
        const obtenerEspecialidades = async () => {
            try {
                const response = await fetch(`${apiUrl}/v2/public/especialidades`);

                if (!response.ok) throw new Error("Error al obtener las especialidades");

                const esp = await response.json();

                setEspecialidades(esp);
            } catch (error) {
                console.error("Error cargando los profesionales:", error);
            }
        };

        const obtenerMedicos = async () => {
            try {
                const response = await fetch(`${apiUrl}/v2/public/medicos`);

                if (!response.ok) throw new Error("Error al obtener los médicos");

                const med = await response.json();

                setMedicos(med);
            } catch (error) {
                console.error("Error cargando los profesionales:", error);
            }
        };

        obtenerEspecialidades();
        obtenerMedicos();
    }, []);

    return (
        <main>
            <section className="container my-5">
                <h2>Nuestros profesionales</h2>
                <div className="accordion accordion-flush" id="profesionales">
                    {
                        especialidades
                            .map((esp, index) => (
                                <div className="accordion-item border-0" key={esp.idEspecialidad}>
                                    <h3 className="accordion-header mt-4 shadow-sm">
                                        <button
                                            className={`accordion-button py-0 border rounded ${index !== 0 ? 'collapsed' : ''}`}
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target={`#collapse-${esp.idEspecialidad}`}
                                            aria-expanded={index === 0 ? "true" : "false"}
                                            aria-controls={`collapse-${esp.idEspecialidad}`}
                                        >
                                            <h3>{esp.nombre}</h3>
                                        </button>
                                    </h3>
                                    <div
                                        id={`collapse-${esp.idEspecialidad}`}
                                        className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
                                    >
                                        <div className="accordion-body">
                                            <div className="row row-cols-1 row-cols-md-3 g-4">
                                                {
                                                    medicos
                                                        .filter(medico => medico.idEspecialidad === esp.idEspecialidad)
                                                        .map((medico) => (
                                                            <div className="col" key={medico.idMedico}>
                                                                <div className="card h-100">
                                                                    <img
                                                                        src={medico.fotoPath || null}
                                                                        className="card-img-top"
                                                                        alt={`Imagen de ${medico.nombres} ${medico.apellido}`}
                                                                    /> 
                                                                    <div className="card-body">
                                                                        <h5 className="card-title">
                                                                            {medico.nombres} {medico.apellido}
                                                                        </h5>
                                                                        <p className="card-text">{medico.descripcion || ''}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                    }
                </div>
            </section>
        </main>
    );
}

export default Profesionales;