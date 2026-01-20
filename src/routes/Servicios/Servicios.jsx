import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Servicios.css";
import {
  FaMicroscope,
  FaVial,
  FaDna,
  FaChartSimple,
  FaUserDoctor,
  FaAtom,
  FaStopwatch,
  FaDroplet,
  FaFlaskVial,
  FaSyringe,
  FaLayerGroup,
  FaAward,
  FaHeartPulse,
  FaFileLines,
  FaArrowRight,
} from "react-icons/fa6";

function Servicios() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="servicios-page">
      {/* Hero Section */}
      <section id="services-hero" className="servicios-hero">
        <div className="servicios-hero-decoration-top"></div>
        <div className="servicios-hero-decoration-bottom"></div>

        <div className="servicios-container">
          <div className="servicios-hero-content">
            <div className="servicios-badge">EXCELENCIA CLÍNICA</div>
            <h1 className="servicios-hero-title">Nuestros Servicios</h1>
            <p className="servicios-hero-text">
              En Laboratorio de Patología Contreras Robledo, nos comprometemos a
              brindarle servicios de patología clínica de la más alta calidad,
              utilizando tecnología de vanguardia y un enfoque centrado en el
              paciente.
            </p>
          </div>

          {/* Services List Container */}
          <div className="servicios-catalog-card">
            <div className="servicios-catalog-header">
              <div className="servicios-catalog-line"></div>
              <h2 className="servicios-catalog-title">
                Catálogo de Especialidades
              </h2>
              <div className="servicios-catalog-line"></div>
            </div>
            <div className="servicios-catalog-grid">
              {/* Left Column */}
              <div className="servicios-catalog-column">
                <div className="servicios-catalog-item">
                  <div className="servicios-catalog-icon">
                    <FaMicroscope />
                  </div>
                  <span className="servicios-catalog-text">Histoquímica</span>
                </div>
                <div className="servicios-catalog-item">
                  <div className="servicios-catalog-icon">
                    <FaVial />
                  </div>
                  <span className="servicios-catalog-text">
                    Inmunohistoquímica
                  </span>
                </div>
                <div className="servicios-catalog-item">
                  <div className="servicios-catalog-icon">
                    <FaDna />
                  </div>
                  <span className="servicios-catalog-text">FISH/SISH</span>
                </div>
                <div className="servicios-catalog-item">
                  <div className="servicios-catalog-icon">
                    <FaChartSimple />
                  </div>
                  <span className="servicios-catalog-text">
                    Citometría de flujo
                  </span>
                </div>
                <div className="servicios-catalog-item">
                  <div className="servicios-catalog-icon">
                    <FaUserDoctor />
                  </div>
                  <span className="servicios-catalog-text">
                    Patología quirúrgica y médica
                  </span>
                </div>
              </div>

              {/* Right Column */}
              <div className="servicios-catalog-column">
                <div className="servicios-catalog-item">
                  <div className="servicios-catalog-icon">
                    <FaAtom />
                  </div>
                  <span className="servicios-catalog-text">
                    Biología molecular (rt-PCR, Idylla, etc.)
                  </span>
                </div>
                <div className="servicios-catalog-item">
                  <div className="servicios-catalog-icon">
                    <FaStopwatch />
                  </div>
                  <span className="servicios-catalog-text">
                    Biopsias intraoperatorias
                  </span>
                </div>
                <div className="servicios-catalog-item">
                  <div className="servicios-catalog-icon">
                    <FaDroplet />
                  </div>
                  <span className="servicios-catalog-text">
                    Citología de líquidos y secreciones
                  </span>
                </div>
                <div className="servicios-catalog-item">
                  <div className="servicios-catalog-icon">
                    <FaFlaskVial />
                  </div>
                  <span className="servicios-catalog-text">ThinPrep</span>
                </div>
                <div className="servicios-catalog-item">
                  <div className="servicios-catalog-icon">
                    <FaSyringe />
                  </div>
                  <span className="servicios-catalog-text">P.A.A.F</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Services Grid */}
      <section id="service-details" className="servicios-details">
        <div className="servicios-container">
          <div className="servicios-details-grid">
            {/* Service Card 1 */}
            <div className="servicios-card">
              <div className="servicios-card-icon">
                <FaMicroscope />
              </div>
              <h3 className="servicios-card-title">Patología Quirúrgica</h3>
              <p className="servicios-card-text">
                Análisis microscópico de tejidos extirpados quirúrgicamente para
                determinar la presencia, etapa y extensión de la enfermedad.
              </p>
              <a href="#" className="servicios-card-link">
                Saber más <FaArrowRight className="servicios-card-arrow" />
              </a>
            </div>

            {/* Service Card 2 */}
            <div className="servicios-card">
              <div className="servicios-card-icon">
                <FaDna />
              </div>
              <h3 className="servicios-card-title">Biología Molecular</h3>
              <p className="servicios-card-text">
                Pruebas avanzadas como rt-PCR e Idylla para detectar marcadores
                genéticos específicos y guiar tratamientos personalizados.
              </p>
              <a href="#" className="servicios-card-link">
                Saber más <FaArrowRight className="servicios-card-arrow" />
              </a>
            </div>

            {/* Service Card 3 */}
            <div className="servicios-card">
              <div className="servicios-card-icon">
                <FaVial />
              </div>
              <h3 className="servicios-card-title">Citología (ThinPrep)</h3>
              <p className="servicios-card-text">
                Tecnología de base líquida para el examen de células, ofreciendo
                mayor precisión en la detección de anomalías cervicales y otras.
              </p>
              <a href="#" className="servicios-card-link">
                Saber más <FaArrowRight className="servicios-card-arrow" />
              </a>
            </div>

            {/* Service Card 4 */}
            <div className="servicios-card">
              <div className="servicios-card-icon">
                <FaStopwatch />
              </div>
              <h3 className="servicios-card-title">
                Biopsias Intraoperatorias
              </h3>
              <p className="servicios-card-text">
                Consultas urgentes durante la cirugía para proporcionar
                diagnósticos rápidos que guíen el curso inmediato de la
                operación.
              </p>
              <a href="#" className="servicios-card-link">
                Saber más <FaArrowRight className="servicios-card-arrow" />
              </a>
            </div>

            {/* Service Card 5 */}
            <div className="servicios-card">
              <div className="servicios-card-icon">
                <FaSyringe />
              </div>
              <h3 className="servicios-card-title">P.A.A.F</h3>
              <p className="servicios-card-text">
                Punción Aspiración con Aguja Fina. Procedimiento mínimamente
                invasivo para obtener muestras de nódulos o masas superficiales.
              </p>
              <a href="#" className="servicios-card-link">
                Saber más <FaArrowRight className="servicios-card-arrow" />
              </a>
            </div>

            {/* Service Card 6 */}
            <div className="servicios-card">
              <div className="servicios-card-icon">
                <FaLayerGroup />
              </div>
              <h3 className="servicios-card-title">Inmunohistoquímica</h3>
              <p className="servicios-card-text">
                Uso de anticuerpos para detectar antígenos específicos en
                tejidos, crucial para el diagnóstico preciso de tumores.
              </p>
              <a href="#" className="servicios-card-link">
                Saber más <FaArrowRight className="servicios-card-arrow" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="servicios-team">
        <div className="servicios-team-decoration-top"></div>
        <div className="servicios-team-decoration-bottom"></div>
        <div className="servicios-container">
          <div className="servicios-team-grid">
            {/* Image Side */}
            <div className="servicios-team-image-wrapper">
              <div className="servicios-team-image-container">
                <img
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/hVBB4y0c3KdiWZkXKwn7XmBZaYl1%2F28956e1b-10ea-4028-9d7d-b987f84c0d90.png"
                  alt="professional diverse medical team of 5 people standing together smiling, white coats, main senior doctor in center with red tie, clean white studio background, high quality medical photography"
                  className="servicios-team-image"
                />
                {/* Floating Badge */}
                <div className="servicios-team-badge">
                  <h3 className="servicios-team-badge-title">
                    DIAGNÓSTICOS PRECISOS
                  </h3>
                  <p className="servicios-team-badge-text">
                    Estamos comprometidos con la excelencia en el servicio y la
                    calidad de los resultados
                  </p>
                </div>
              </div>
            </div>

            {/* Text Side */}
            <div className="servicios-team-content">
              <div className="servicios-team-badge-small">NUESTRO EQUIPO</div>
              <h2 className="servicios-team-title">
                Expertos en Patología a su Servicio
              </h2>
              <p className="servicios-team-text">
                Nuestro equipo está conformado por patólogos certificados con
                amplia experiencia en diagnóstico de enfermedades. Utilizamos
                tecnología de vanguardia y seguimos los más altos estándares de
                calidad para garantizar resultados confiables.
              </p>
              <div className="servicios-team-features">
                <div className="servicios-team-feature">
                  <div className="servicios-team-feature-icon">
                    <FaAward />
                  </div>
                  <div>
                    <h4 className="servicios-team-feature-title">
                      Certificación Internacional
                    </h4>
                    <p className="servicios-team-feature-text">
                      Nuestros especialistas cuentan con certificaciones de
                      organismos internacionales reconocidos.
                    </p>
                  </div>
                </div>
                <div className="servicios-team-feature">
                  <div className="servicios-team-feature-icon">
                    <FaMicroscope />
                  </div>
                  <div>
                    <h4 className="servicios-team-feature-title">
                      Tecnología Avanzada
                    </h4>
                    <p className="servicios-team-feature-text">
                      Equipamiento de última generación para diagnósticos
                      precisos y confiables.
                    </p>
                  </div>
                </div>
                <div className="servicios-team-feature">
                  <div className="servicios-team-feature-icon">
                    <FaHeartPulse />
                  </div>
                  <div>
                    <h4 className="servicios-team-feature-title">
                      Compromiso con el Paciente
                    </h4>
                    <p className="servicios-team-feature-text">
                      Ponemos al paciente en el centro de nuestro accionar con
                      ética y responsabilidad.
                    </p>
                  </div>
                </div>
              </div>
              <Link to="/historia" className="servicios-team-button">
                <span>Conocer al Equipo</span>
                <FaArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="servicios-cta">
        <div className="servicios-container">
          <h2 className="servicios-cta-title">
            ¿Necesita Consultar sus Resultados?
          </h2>
          <p className="servicios-cta-text">
            Acceda a sus estudios de forma rápida y segura a través de nuestro
            portal en línea.
          </p>
          <Link to="/resultados" className="servicios-cta-button">
            <FaFileLines />
            <span>Ver Mis Resultados</span>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Servicios;
