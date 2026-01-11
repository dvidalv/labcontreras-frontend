import { useState, useEffect } from "react";
import { useAppContext } from "../../contexts/MyContext";
import "./MisionVisionValores.css";
import {
  FaHeart,
  FaHandshake,
  FaEye,
  FaBullseye,
  FaLightbulb,
  FaUsers,
  FaScaleBalanced,
  FaMedal,
  FaGavel,
  FaShieldHeart,
  FaArrowRight,
} from "react-icons/fa6";

const getViewportWidth = () => {
  return Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );
};

function MisionVisionValores() {
  const { setIsMenuOpen } = useAppContext();
  const [viewportWidth, setViewportWidth] = useState(getViewportWidth());
  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(getViewportWidth());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (viewportWidth > 768) {
      setIsMenuOpen(false);
    }
  }, [viewportWidth, setIsMenuOpen]);
  return (
    <div className="mvv-container">
      {/* Hero Section */}
      <section className="mvv-hero">
        <div className="mvv-hero-content">
          <span className="mvv-badge">Nuestra Identidad</span>
          <h1 className="mvv-hero-title">
            Excelencia en <br />
            <span className="mvv-gradient-text">Diagnóstico Patológico</span>
          </h1>
          <p className="mvv-hero-description">
            Comprometidos con la precisión y el cuidado del paciente a través de
            la innovación tecnológica y la experiencia médica.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="mvv-content">
        <div className="mvv-content-wrapper">
          {/* Top Row: Mission & Vision */}
          <div className="mvv-top-row">
            {/* Mission Card */}
            <div className="mvv-card mvv-mission-card">
              <div className="mvv-card-bg-effect"></div>
              <div className="mvv-card-content">
                <div className="mvv-card-icon mvv-mission-icon">
                  <FaBullseye />
                </div>
                <h2 className="mvv-card-title">Misión</h2>
                <p className="mvv-card-text">
                  En el año 2030 seremos un referente en servicios de patología
                  de vanguardia con honestidad incuestionable. Representaremos
                  la mejor opción para nuestros pacientes, colaboradores y la
                  comunidad, brindando diagnósticos precisos que salvan vidas.
                </p>
                <div className="mvv-card-link">
                  <span>Saber más</span>
                  <FaArrowRight />
                </div>
              </div>
            </div>

            {/* Vision Card */}
            <div className="mvv-card mvv-vision-card">
              <div className="mvv-card-bg-effect mvv-vision-bg"></div>
              <div className="mvv-card-content">
                <div className="mvv-card-icon mvv-vision-icon">
                  <FaEye />
                </div>
                <h2 className="mvv-card-title">Visión</h2>
                <p className="mvv-card-text">
                  Ofrecemos a nuestros pacientes servicios de patología de
                  excelencia en la prevención, diagnóstico, tratamiento y
                  seguimiento para la toma de las mejores decisiones clínicas
                  por medio de la innovación y el uso de tecnología avanzada.
                  Contribuimos con la protección del medio ambiente.
                </p>
                <div className="mvv-card-link mvv-vision-link">
                  <span>Nuestra meta</span>
                  <FaArrowRight />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row: Values & Principles */}
          <div className="mvv-bottom-row">
            {/* Values Card */}
            <div className="mvv-values-card">
              <div className="mvv-values-header">
                <div className="mvv-values-icon">
                  <FaHeart />
                </div>
                <h2 className="mvv-values-title">Valores</h2>
              </div>

              <div className="mvv-values-grid">
                <div className="mvv-value-item">
                  <FaLightbulb className="mvv-value-icon" />
                  <div>
                    <h3 className="mvv-value-name">Innovación</h3>
                    <p className="mvv-value-desc">
                      Búsqueda constante de mejora.
                    </p>
                  </div>
                </div>
                <div className="mvv-value-item">
                  <FaUsers className="mvv-value-icon" />
                  <div>
                    <h3 className="mvv-value-name">Trabajo en equipo</h3>
                    <p className="mvv-value-desc">
                      Sinergia multidisciplinaria.
                    </p>
                  </div>
                </div>
                <div className="mvv-value-item">
                  <FaScaleBalanced className="mvv-value-icon" />
                  <div>
                    <h3 className="mvv-value-name">Ética</h3>
                    <p className="mvv-value-desc">Integridad en cada acción.</p>
                  </div>
                </div>
                <div className="mvv-value-item">
                  <FaMedal className="mvv-value-icon" />
                  <div>
                    <h3 className="mvv-value-name">Excelencia</h3>
                    <p className="mvv-value-desc">Calidad superior siempre.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Principles Card */}
            <div className="mvv-principles-card">
              <div className="mvv-principles-header">
                <div className="mvv-principles-icon">
                  <FaHandshake />
                </div>
                <h2 className="mvv-principles-title">Principios</h2>
              </div>

              <div className="mvv-principles-content">
                <div className="mvv-principle-item">
                  <div className="mvv-principle-icon">
                    <FaGavel />
                  </div>
                  <div>
                    <h3 className="mvv-principle-name">Ética Profesional</h3>
                    <p className="mvv-principle-desc">
                      Actuar con rectitud y transparencia.
                    </p>
                  </div>
                </div>

                <div className="mvv-principle-item">
                  <div className="mvv-principle-icon">
                    <FaShieldHeart />
                  </div>
                  <div>
                    <h3 className="mvv-principle-name">Honestidad</h3>
                    <p className="mvv-principle-desc">
                      Verdad y sinceridad ante todo.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="mvv-technology">
        <div className="mvv-technology-wrapper">
          <div className="mvv-technology-card">
            <div className="mvv-technology-image">
              <div className="mvv-technology-overlay">
                <div className="mvv-technology-content">
                  <h3 className="mvv-technology-title">Tecnología de Punta</h3>
                  <p className="mvv-technology-text">
                    Nuestros laboratorios están equipados con la última
                    tecnología para garantizar diagnósticos precisos y rápidos.
                  </p>
                  <button className="mvv-technology-button">
                    Conocer Instalaciones
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default MisionVisionValores;
