import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Curriculum.css";
import felix from "../../images/felix.png";
import {
  FaUser,
  FaGraduationCap,
  FaBriefcase,
  FaMicroscope,
  FaCertificate,
  FaBook,
  FaBriefcaseMedical,
  FaHospital,
  FaDisease,
  FaVial,
  FaRibbon,
  FaCheckCircle,
  FaFileAlt,
  FaChalkboardTeacher,
} from "react-icons/fa";

function Curriculum() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="curriculum-page">
      <section id="cv-hero" className="curriculum-hero">
        <div className="curriculum-container">
          <div className="curriculum-grid">
            {/* Left Column - Profile Card */}
            <div className="curriculum-profile-card-wrapper">
              <div className="curriculum-profile-card">
                <div className="curriculum-profile-image-wrapper">
                  <img
                    src={felix}
                    alt="Dr. Félix Contreras"
                    className="curriculum-profile-image"
                  />
                </div>
                <div className="curriculum-profile-content">
                  <h1 className="curriculum-profile-name">
                    Dr. Félix Contreras
                  </h1>
                  <p className="curriculum-profile-title">Médico Patólogo</p>
                  <div className="curriculum-profile-stats">
                    <div className="curriculum-profile-stat">
                      <FaBriefcaseMedical className="curriculum-stat-icon" />
                      <span>+25 años de experiencia</span>
                    </div>
                    <div className="curriculum-profile-stat">
                      <FaGraduationCap className="curriculum-stat-icon" />
                      <span>PhD en Biología Celular</span>
                    </div>
                    <div className="curriculum-profile-stat">
                      <FaHospital className="curriculum-stat-icon" />
                      <span>Clínica Unión Médica</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Content Sections */}
            <div className="curriculum-content-wrapper">
              {/* Perfil Profesional */}
              <div className="curriculum-section-card">
                <div className="curriculum-section-header">
                  <div className="curriculum-section-icon">
                    <FaUser />
                  </div>
                  <h2 className="curriculum-section-title">
                    Perfil Profesional
                  </h2>
                </div>
                <p className="curriculum-section-text">
                  Soy Médico por la Universidad Autónoma de Madrid, Especialista
                  en Patología por la Clínica Universitaria de Navarra y PhD en
                  Biología celular por la Universidad de Navarra. Tengo más de
                  25 años de experiencia en la práctica de la patología en mi
                  propio laboratorio radicado en la Clínica Unión Médica en
                  Santiago, Rep. Dominicana. Igualmente llevo más de 20 años
                  impartiendo docencia como profesor asociado en la Pontificia
                  Universidad Católica Madre y Maestra donde además he sido
                  Decano de la Facultad de Ciencias de la Salud y Vicerector
                  Académico. Participo habitualmente como conferenciante y
                  profesor invitado en múltiples actividades y congresos de
                  diversas sociedades. He publicado múltiples artículos en
                  revistas médicas indexadas. Soy miembro de la Sociedad
                  Dominicana de Patología, de la Sociedad Española de Anatomía
                  Patológica (SEAP) y de la United States and Canadian Academy
                  of Pathology (USCAP). Mis intereses profesionales principales
                  son la Patología Oncológica, la Inmunohistoquímica y la
                  Patología Mamaria.
                </p>
              </div>

              {/* Educación Médica */}
              <div className="curriculum-section-card">
                <div className="curriculum-section-header">
                  <div className="curriculum-section-icon">
                    <FaGraduationCap />
                  </div>
                  <h2 className="curriculum-section-title">Educación Médica</h2>
                </div>
                <div className="curriculum-education-list">
                  <div className="curriculum-education-item">
                    <h3 className="curriculum-education-title">
                      Licenciatura en Medicina y Cirugía
                    </h3>
                    <p className="curriculum-education-institution">
                      Universidad Autónoma de Madrid
                    </p>
                    <p className="curriculum-education-description">
                      Formación médica integral con énfasis en ciencias básicas
                      y clínicas.
                    </p>
                  </div>
                  <div className="curriculum-education-item">
                    <h3 className="curriculum-education-title">
                      Especialidad en Anatomía Patológica
                    </h3>
                    <p className="curriculum-education-institution">
                      Clínica Universitaria de Navarra
                    </p>
                    <p className="curriculum-education-description">
                      Especialización avanzada en diagnóstico histopatológico y
                      citopatológico.
                    </p>
                  </div>
                  <div className="curriculum-education-item">
                    <h3 className="curriculum-education-title">
                      PhD en Biología Celular
                    </h3>
                    <p className="curriculum-education-institution">
                      Universidad de Navarra
                    </p>
                    <p className="curriculum-education-description">
                      Investigación doctoral en mecanismos celulares y
                      moleculares de enfermedades.
                    </p>
                  </div>
                </div>
              </div>

              {/* Experiencia Profesional */}
              <div className="curriculum-section-card">
                <div className="curriculum-section-header">
                  <div className="curriculum-section-icon">
                    <FaBriefcase />
                  </div>
                  <h2 className="curriculum-section-title">
                    Experiencia Profesional
                  </h2>
                </div>
                <div className="curriculum-experience-list">
                  <div className="curriculum-experience-item">
                    <h3 className="curriculum-experience-title">
                      Director - Laboratorio de Patología
                    </h3>
                    <p className="curriculum-experience-institution">
                      Clínica Unión Médica, Santiago, RD
                    </p>
                    <p className="curriculum-experience-duration">+25 años</p>
                    <p className="curriculum-experience-description">
                      Dirección y supervisión de servicios de patología
                      diagnóstica, implementación de tecnología avanzada y
                      garantía de calidad en diagnósticos.
                    </p>
                  </div>
                  <div className="curriculum-experience-item">
                    <h3 className="curriculum-experience-title">
                      Profesor Asociado
                    </h3>
                    <p className="curriculum-experience-institution">
                      Pontificia Universidad Católica Madre y Maestra
                    </p>
                    <p className="curriculum-experience-duration">+20 años</p>
                    <p className="curriculum-experience-description">
                      Docencia en patología general y especial, formación de
                      estudiantes de medicina y residentes.
                    </p>
                  </div>
                  <div className="curriculum-experience-item">
                    <h3 className="curriculum-experience-title">
                      Decano - Facultad de Ciencias de la Salud
                    </h3>
                    <p className="curriculum-experience-institution">
                      Pontificia Universidad Católica Madre y Maestra
                    </p>
                    <p className="curriculum-experience-description">
                      Liderazgo académico y administrativo de programas de
                      salud.
                    </p>
                  </div>
                  <div className="curriculum-experience-item">
                    <h3 className="curriculum-experience-title">
                      Vicerector Académico
                    </h3>
                    <p className="curriculum-experience-institution">
                      Pontificia Universidad Católica Madre y Maestra
                    </p>
                    <p className="curriculum-experience-description">
                      Gestión de la calidad académica institucional y desarrollo
                      curricular.
                    </p>
                  </div>
                </div>
              </div>

              {/* Áreas de Interés */}
              <div className="curriculum-section-card">
                <div className="curriculum-section-header">
                  <div className="curriculum-section-icon">
                    <FaMicroscope />
                  </div>
                  <h2 className="curriculum-section-title">Áreas de Interés</h2>
                </div>
                <div className="curriculum-areas-grid">
                  <div className="curriculum-area-card">
                    <FaDisease className="curriculum-area-icon" />
                    <h3 className="curriculum-area-title">
                      Patología Oncológica
                    </h3>
                    <p className="curriculum-area-description">
                      Diagnóstico y clasificación de neoplasias
                    </p>
                  </div>
                  <div className="curriculum-area-card">
                    <FaVial className="curriculum-area-icon" />
                    <h3 className="curriculum-area-title">
                      Inmunohistoquímica
                    </h3>
                    <p className="curriculum-area-description">
                      Técnicas avanzadas de marcaje molecular
                    </p>
                  </div>
                  <div className="curriculum-area-card">
                    <FaRibbon className="curriculum-area-icon" />
                    <h3 className="curriculum-area-title">Patología Mamaria</h3>
                    <p className="curriculum-area-description">
                      Especialización en lesiones de mama
                    </p>
                  </div>
                </div>
              </div>

              {/* Membresías Profesionales */}
              <div className="curriculum-section-card">
                <div className="curriculum-section-header">
                  <div className="curriculum-section-icon">
                    <FaCertificate />
                  </div>
                  <h2 className="curriculum-section-title">
                    Membresías Profesionales
                  </h2>
                </div>
                <div className="curriculum-memberships-list">
                  <div className="curriculum-membership-item">
                    <FaCheckCircle className="curriculum-membership-icon" />
                    <div>
                      <h3 className="curriculum-membership-title">
                        Sociedad Dominicana de Patología
                      </h3>
                      <p className="curriculum-membership-status">
                        Miembro activo
                      </p>
                    </div>
                  </div>
                  <div className="curriculum-membership-item">
                    <FaCheckCircle className="curriculum-membership-icon" />
                    <div>
                      <h3 className="curriculum-membership-title">
                        Sociedad Española de Anatomía Patológica (SEAP)
                      </h3>
                      <p className="curriculum-membership-status">
                        Miembro internacional
                      </p>
                    </div>
                  </div>
                  <div className="curriculum-membership-item">
                    <FaCheckCircle className="curriculum-membership-icon" />
                    <div>
                      <h3 className="curriculum-membership-title">
                        United States and Canadian Academy of Pathology (USCAP)
                      </h3>
                      <p className="curriculum-membership-status">
                        Miembro internacional
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Publicaciones y Conferencias */}
              <div className="curriculum-section-card">
                <div className="curriculum-section-header">
                  <div className="curriculum-section-icon">
                    <FaBook />
                  </div>
                  <h2 className="curriculum-section-title">
                    Publicaciones y Conferencias
                  </h2>
                </div>
                <div className="curriculum-publications-list">
                  <div className="curriculum-publication-item">
                    <FaFileAlt className="curriculum-publication-icon" />
                    <p className="curriculum-publication-title">
                      Múltiples artículos en revistas médicas indexadas
                    </p>
                    <p className="curriculum-publication-description">
                      Publicaciones en patología oncológica, técnicas
                      diagnósticas y estudios clínicos.
                    </p>
                  </div>
                  <div className="curriculum-publication-item">
                    <FaChalkboardTeacher className="curriculum-publication-icon" />
                    <p className="curriculum-publication-title">
                      Conferenciante y profesor invitado
                    </p>
                    <p className="curriculum-publication-description">
                      Participación regular en congresos nacionales e
                      internacionales de patología.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="curriculum-cta" className="curriculum-cta">
        <div className="curriculum-container">
          <h2 className="curriculum-cta-title">
            ¿Desea conocer más sobre nuestros servicios?
          </h2>
          <p className="curriculum-cta-description">
            Contamos con tecnología de vanguardia y un equipo altamente
            calificado.
          </p>
          <div className="curriculum-cta-buttons">
            <Link
              to="/publicaciones"
              className="curriculum-cta-button curriculum-cta-button-primary"
              onClick={() => window.scrollTo(0, 0)}>
              Ver Servicios
            </Link>
            <Link
              to="/"
              className="curriculum-cta-button curriculum-cta-button-secondary"
              onClick={() => window.scrollTo(0, 0)}>
              Contactar
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Curriculum;
