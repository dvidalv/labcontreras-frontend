import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Nosotros.css";
import WhatsApp from "../../components/WhatsApp/WhatsApp";
import VideoModal from "../../components/VideoModal/VideoModal";
import edificioPrincipal from "../../images/nosotros-edificio.png";
import nosotrosGroup from "../../images/nosotros1-group.png";
import felixImage from "../../images/felix.png";
import {
  FaBullseye,
  FaEye,
  FaHeart,
  FaLightbulb,
  FaUsers,
  FaHandHoldingHeart,
  FaScaleBalanced,
  FaShieldHalved,
  FaStar,
  FaGraduationCap,
  FaAward,
  FaPlay,
} from "react-icons/fa6";

function Nosotros() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  // URL de Cloudinary en formato de transformación para video
  // Si esta URL no funciona, necesitas obtener la URL directa desde Cloudinary Media Library
  // Formato: https://res.cloudinary.com/{cloud_name}/video/upload/{public_id}.mp4
  const videoSrc =
    "https://res.cloudinary.com/dv44uehlk/video/upload/v1768432985/lpcr/videos/CONTRERAS_Y_ROBLEDO_FINAL-_2_xkodu5.mp4";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="nosotros-page">
      {/* Hero / Intro Section */}
      <section id="about-intro" className="nosotros-intro">
        <div className="nosotros-container">
          <div className="nosotros-intro-grid">
            {/* Left Column: Building Image */}
            <div className="nosotros-intro-image-wrapper">
              <img
                src={edificioPrincipal}
                alt="Sede Principal - Laboratorio Contreras Robledo"
                className="nosotros-intro-image"
              />
              <div className="nosotros-intro-image-overlay">
                <p className="nosotros-intro-image-title">Sede Principal</p>
                <p className="nosotros-intro-image-subtitle">
                  Innovación y Tecnología
                </p>
              </div>
            </div>

            {/* Right Column: Text Content */}
            <div className="nosotros-intro-content">
              <span className="nosotros-badge">NUESTRA ESENCIA</span>
              <h1 className="nosotros-intro-title">Nosotros</h1>
              <div className="nosotros-intro-text">
                <p>
                  En nuestro laboratorio, estamos comprometidos con la{" "}
                  <span className="nosotros-text-highlight">
                    excelencia en el servicio
                  </span>{" "}
                  y la calidad de los resultados.
                </p>
                <p>
                  Nuestro equipo de patólogos, técnicos y personal
                  administrativo está dedicado a proporcionar resultados
                  precisos y oportunos para ayudar a los médicos a tomar
                  decisiones informadas.
                </p>
                <p>
                  Entendemos que detrás de cada muestra hay un paciente
                  esperando respuestas, por lo que tratamos cada análisis con la
                  máxima prioridad y ética profesional.
                </p>
              </div>

              {/* Team Image Below Text */}
              <div className="nosotros-team-image-wrapper">
                <img
                  src={nosotrosGroup}
                  alt="Equipo de profesionales del laboratorio"
                  className="nosotros-team-image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Vision Values - Corporate Identity */}
      <section id="corporate-values" className="nosotros-corporate">
        <div className="nosotros-corporate-bg-decoration"></div>
        <div className="nosotros-container">
          <div className="nosotros-corporate-header">
            <h2 className="nosotros-corporate-title">
              Nuestra Identidad Corporativa
            </h2>
            <div className="nosotros-corporate-underline"></div>
          </div>

          <div className="nosotros-mission-vision-grid">
            {/* Mission */}
            <div className="nosotros-corporate-card nosotros-mission-card">
              <div className="nosotros-corporate-card-icon">
                <FaBullseye />
              </div>
              <h3 className="nosotros-corporate-card-title">Misión</h3>
              <p className="nosotros-corporate-card-text">
                Ofrecemos a nuestros pacientes servicios de patología de
                excelencia en la prevención, diagnóstico, tratamiento y
                seguimiento para la toma de las mejores decisiones clínicas por
                medio de la innovación y el uso de tecnología avanzada.
                Contribuimos con la protección del medio ambiente.
              </p>
            </div>

            {/* Vision */}
            <div className="nosotros-corporate-card nosotros-vision-card">
              <div className="nosotros-corporate-card-icon nosotros-vision-icon">
                <FaEye />
              </div>
              <h3 className="nosotros-corporate-card-title">Visión</h3>
              <p className="nosotros-corporate-card-text">
                En el año 2030 seremos un referente en servicios de patología de
                vanguardia con honestidad incuestionable. Representaremos la
                mejor opción para nuestros pacientes, colaboradores y la
                comunidad.
              </p>
            </div>
          </div>

          {/* Values - Full Width */}
          <div className="nosotros-values-card">
            <div className="nosotros-values-header">
              <div className="nosotros-values-header-icon">
                <FaHeart />
              </div>
              <h3 className="nosotros-values-title">Valores</h3>
            </div>
            <div className="nosotros-values-grid">
              <div className="nosotros-value-item">
                <FaLightbulb className="nosotros-value-item-icon" />
                <div>
                  <h4 className="nosotros-value-item-title">Innovación</h4>
                  <p className="nosotros-value-item-text">
                    Promover las mejores ideas del talento humano
                  </p>
                </div>
              </div>
              <div className="nosotros-value-item">
                <FaUsers className="nosotros-value-item-icon" />
                <div>
                  <h4 className="nosotros-value-item-title">
                    Trabajo en Equipo
                  </h4>
                  <p className="nosotros-value-item-text">
                    Fomentar el trabajo colaborativo
                  </p>
                </div>
              </div>
              <div className="nosotros-value-item">
                <FaHandHoldingHeart className="nosotros-value-item-icon" />
                <div>
                  <h4 className="nosotros-value-item-title">
                    Compromiso con el Paciente
                  </h4>
                  <p className="nosotros-value-item-text">
                    Ofrecer diagnósticos seguros, poner al paciente en el centro
                  </p>
                </div>
              </div>
              <div className="nosotros-value-item">
                <FaScaleBalanced className="nosotros-value-item-icon" />
                <div>
                  <h4 className="nosotros-value-item-title">Ética</h4>
                  <p className="nosotros-value-item-text">
                    Actuar con máxima transparencia en beneficio del paciente
                  </p>
                </div>
              </div>
              <div className="nosotros-value-item">
                <FaShieldHalved className="nosotros-value-item-icon" />
                <div>
                  <h4 className="nosotros-value-item-title">Responsabilidad</h4>
                  <p className="nosotros-value-item-text">
                    Poner al paciente en el centro de nuestro accionar
                  </p>
                </div>
              </div>
              <div className="nosotros-value-item">
                <FaStar className="nosotros-value-item-icon" />
                <div>
                  <h4 className="nosotros-value-item-title">Excelencia</h4>
                  <p className="nosotros-value-item-text">
                    Brindar servicios de excelente calidad
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats / Trust Indicators */}
      <section id="stats" className="nosotros-stats">
        <div className="nosotros-container">
          <div className="nosotros-stats-grid">
            <div className="nosotros-stat-item">
              <div className="nosotros-stat-number">30+</div>
              <div className="nosotros-stat-label">Años de Experiencia</div>
            </div>
            <div className="nosotros-stat-item">
              <div className="nosotros-stat-number">500k+</div>
              <div className="nosotros-stat-label">Pacientes Atendidos</div>
            </div>
            <div className="nosotros-stat-item">
              <div className="nosotros-stat-number">10</div>
              <div className="nosotros-stat-label">Especialistas</div>
            </div>
            <div className="nosotros-stat-item">
              <div className="nosotros-stat-number">24h</div>
              <div className="nosotros-stat-label">Atención Continua</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Leader Section */}
      <section id="director" className="nosotros-director">
        <div className="nosotros-container">
          <div className="nosotros-director-card">
            <div className="nosotros-director-image-wrapper">
              <img
                src={felixImage}
                alt="Dr. Félix Contreras - Director General"
                className="nosotros-director-image"
              />
            </div>
            <div className="nosotros-director-content">
              <h3 className="nosotros-director-badge">Dirección General</h3>
              <h2 className="nosotros-director-name">Dr. Félix Contreras</h2>
              <p className="nosotros-director-quote">
                &ldquo;Nuestra responsabilidad va más allá de un simple análisis
                clínico; se trata de brindar certeza y esperanza a través de
                diagnósticos precisos. Cada muestra es una historia de vida que
                tratamos con el máximo respeto y profesionalismo.&rdquo;
              </p>
              <div className="nosotros-director-divider">
                <span className="nosotros-director-specialty">
                  Pathology Specialist
                </span>
              </div>
              <div className="nosotros-director-info-grid">
                <div className="nosotros-director-info-item">
                  <FaGraduationCap className="nosotros-director-info-icon" />
                  <div>
                    <h4 className="nosotros-director-info-title">
                      Formación Académica
                    </h4>
                    <p className="nosotros-director-info-text">
                      Licenciado en medicina y cirugía en la Universidad
                      Autónoma de Madrid.
                    </p>
                  </div>
                </div>
                <div className="nosotros-director-info-item">
                  <FaAward className="nosotros-director-info-icon" />
                  <div>
                    <h4 className="nosotros-director-info-title">
                      Certificaciones
                    </h4>
                    <p className="nosotros-director-info-text">
                      Especialista en Anatomía Patológica por la Clínica
                      Universitaria de la Universidad de Navarra.
                    </p>
                  </div>
                </div>
              </div>
              <div className="nosotros-director-button-wrapper">
                <Link to="/curriculum" className="nosotros-director-btn">
                  Saber más
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="nosotros-cta">
        <div className="nosotros-container">
          <div className="nosotros-cta-card">
            <h2 className="nosotros-cta-title">
              ¿Necesita realizarse estudios?
            </h2>
            <p className="nosotros-cta-text">
              Consulte nuestro catálogo de servicios o póngase en contacto con
              nosotros para recibir orientación personalizada.
            </p>
            <div className="nosotros-cta-buttons">
              <Link to="/publicaciones" className="nosotros-cta-btn-primary">
                Ver Servicios
              </Link>
              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="nosotros-cta-btn-video">
                <FaPlay style={{ marginRight: "0.5rem" }} />
                Ver Video Institucional
              </button>
              <Link to="/contact" className="nosotros-cta-btn-secondary">
                Contactar Ahora
              </Link>
            </div>
          </div>
        </div>
      </section>

      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoSrc={videoSrc}
      />

      <WhatsApp />
    </div>
  );
}

export default Nosotros;
