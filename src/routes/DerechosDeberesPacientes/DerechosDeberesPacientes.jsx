import "./DerechosDeberesPacientes.css";
import { FaShieldHalved, FaClipboardCheck } from "react-icons/fa6";

export default function DerechosDeberesPacientes() {
  return (
    <section id="rights-duties" className="rights-duties-section">
      <div className="rights-duties-container">
        <div className="rights-duties-header">
          <span className="rights-duties-badge">
            Información para el Paciente
          </span>
          <h2 className="rights-duties-title">
            Derechos y Deberes de Pacientes
          </h2>
          <div className="rights-duties-underline"></div>
        </div>
        <div className="rights-duties-grid">
          {/* Derechos Column */}
          <div className="rights-card">
            <div className="rights-card-top-bar"></div>
            <h3 className="rights-card-title">
              <FaShieldHalved className="rights-card-icon" />
              Derechos de los pacientes LPCR
            </h3>
            <ul className="rights-list">
              <li className="rights-list-item">
                <div className="rights-bullet"></div>
                <p>
                  A mantener la confidencialidad y protección de su información
                  clínica.
                </p>
              </li>
              <li className="rights-list-item">
                <div className="rights-bullet"></div>
                <p>
                  Recibir información precisa, suficiente, clara, oportuna,
                  veraz y fácil de comprender.
                </p>
              </li>
              <li className="rights-list-item">
                <div className="rights-bullet"></div>
                <p>
                  A recibir una atención digna y no discriminatoria, respetando
                  sus creencias y costumbres, así como las opiniones que tenga
                  acerca de los procedimientos.
                </p>
              </li>
              <li className="rights-list-item">
                <div className="rights-bullet"></div>
                <p>
                  A recibir asistencia con los mínimos riesgos, dolor y
                  molestias psíquicas y físicas.
                </p>
              </li>
              <li className="rights-list-item">
                <div className="rights-bullet"></div>
                <p>
                  A contar con facilidades para obtener una segunda opinión.
                </p>
              </li>
              <li className="rights-list-item">
                <div className="rights-bullet"></div>
                <p>
                  A conocer el proceso para presentar quejas, sugerencias y
                  felicitaciones, así como a recibir una respuesta por escrito.
                </p>
              </li>
              <li className="rights-list-item">
                <div className="rights-bullet"></div>
                <p>
                  Recibir los servicios en condiciones de higiene, seguridad y
                  respeto a su intimidad.
                </p>
              </li>
              <li className="rights-list-item">
                <div className="rights-bullet"></div>
                <p>
                  A ser informado cuando el laboratorio sea requerido por
                  autoridad competente a dar a conocer información relacionada
                  con su proceso de atención, incluidos los resultados de sus
                  análisis.
                </p>
              </li>
              <li className="rights-list-item">
                <div className="rights-bullet"></div>
                <p>
                  A solicitar información acerca de sus análisis y no solamente
                  el informe final.
                </p>
              </li>
              <li className="rights-list-item">
                <div className="rights-bullet"></div>
                <p>
                  Revisar y recibir información acerca del valor de los
                  servicios prestados.
                </p>
              </li>
              <li className="rights-list-item">
                <div className="rights-bullet"></div>
                <p>
                  Acceder a los servicios y tecnologías de salud, que le
                  garanticen una atención integral, oportuna y de alta calidad.
                </p>
              </li>
              <li className="rights-list-item">
                <div className="rights-bullet"></div>
                <p>
                  Ser incluido en estudios de investigación científica, solo
                  mediante autorización expresa.
                </p>
              </li>
              <li className="rights-list-item">
                <div className="rights-bullet"></div>
                <p>
                  A que el laboratorio le proporcione una asistencia técnica
                  correcta con personal calificado que garantice la práctica de
                  exámenes con calidad, confiabilidad y oportunidad.
                </p>
              </li>
            </ul>
          </div>

          {/* Deberes Column */}
          <div className="duties-card">
            <div className="duties-card-top-bar"></div>
            <h3 className="duties-card-title">
              <FaClipboardCheck className="duties-card-icon" />
              Deberes de los pacientes LPCR
            </h3>
            <ul className="duties-list">
              <li className="duties-list-item">
                <div className="duties-bullet"></div>
                <p>
                  Acatar las instrucciones de preparación suministradas por el
                  laboratorio.
                </p>
              </li>
              <li className="duties-list-item">
                <div className="duties-bullet"></div>
                <p>
                  Suministrar información veraz, clara y concisa durante su
                  proceso de atención.
                </p>
              </li>
              <li className="duties-list-item">
                <div className="duties-bullet"></div>
                <p>
                  Tratar de manera respetuosa al personal del laboratorio y
                  demás personas con que se relacione en su proceso de atención.
                </p>
              </li>
              <li className="duties-list-item">
                <div className="duties-bullet"></div>
                <p>
                  Cuidar, conservar y proteger las instalaciones, recursos y
                  pertenencias del Laboratorio de Patología Contreras Robledo.
                </p>
              </li>
              <li className="duties-list-item">
                <div className="duties-bullet"></div>
                <p>
                  Respetar y ser solidario con los demás pacientes y
                  acompañantes.
                </p>
              </li>
              <li className="duties-list-item">
                <div className="duties-bullet"></div>
                <p>Mantener una higiene personal adecuada.</p>
              </li>
              <li className="duties-list-item">
                <div className="duties-bullet"></div>
                <p>
                  Cumplir las normas, reglamentos, instrucciones y medidas de
                  seguridad según directriz del laboratorio.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
