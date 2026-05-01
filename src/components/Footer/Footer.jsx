import { Link } from "react-router-dom";
import "./footer.css";
import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { IoMailOpen } from "react-icons/io5";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

// Nombre real en disco: "a" + U+0301 (NFD), no la "á" precompuesta (NFC).
const CATALOGO_SERVICIOS_PDF =
  "/DE-D-01 Cata\u0301logo de Servicios V0 4.pdf";

async function handleCatalogoServiciosDownload(event) {
  event.preventDefault();
  const url = encodeURI(CATALOGO_SERVICIOS_PDF);
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("fetch failed");
    const contentType = response.headers.get("content-type") || "";
    if (contentType.includes("text/html")) {
      throw new Error("expected pdf, got html");
    }
    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = objectUrl;
    link.download = "Catálogo_Servicios.pdf";
    link.rel = "noopener";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(objectUrl);
  } catch {
    window.open(url, "_blank", "noopener,noreferrer");
  }
}

function getCurrentYear() {
  const currentYear = new Date().getFullYear();
  return currentYear;
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        {/* Columna Izquierda - Información de la Compañía */}
        <div className="footer__column footer__company">
          <div className="footer__logo">
            <Link to="/" onClick={() => window.scrollTo(0, 0)}>
              {/* <img src={logo} alt="Logo LPCR" /> */}
              <span className="footer__logo-text">Patología Contreras Robledo</span>
            </Link>
          </div>
          <p className="footer__description">
            Líderes en diagnóstico patológico, comprometidos con la salud y el
            bienestar de nuestros pacientes a través de la ciencia y la
            tecnología.
          </p>
          <div className="footer__social">
            <a
              href="https://www.facebook.com/contrerasrobledo/?locale=es_LA"
              target="_blank"
              rel="noreferrer"
              className="footer__social-icon">
              <FaFacebookF />
            </a>
            <a
              href="https://www.instagram.com/labcontrerasrobledo/"
              target="_blank"
              rel="noreferrer"
              className="footer__social-icon">
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Columna Central - Enlaces Rápidos */}
        <div className="footer__column footer__links">
          <h3 className="footer__heading">Enlaces Rápidos</h3>
          <ul className="footer__link-list">
            <li>
              <Link to="/" onClick={() => window.scrollTo(0, 0)}>
                Inicio
              </Link>
            </li>
            <li>
              <Link to="/historia/" onClick={() => window.scrollTo(0, 0)}>
                Nosotros
              </Link>
            </li>
            <li>
              <Link to="/publicaciones/" onClick={() => window.scrollTo(0, 0)}>
                Servicios
              </Link>
            </li>
            <li>
              <Link to="/resultados/" onClick={() => window.scrollTo(0, 0)}>
                Resultados en Línea
              </Link>
            </li>
            <li>
              <a
                href={encodeURI(CATALOGO_SERVICIOS_PDF)}
                rel="noopener noreferrer"
                onClick={handleCatalogoServiciosDownload}
              >
                Catálogo de Servicios
              </a>
            </li>
          </ul>
        </div>

        {/* Columna Derecha - Contacto */}
        <div className="footer__column footer__contact">
          <h3 className="footer__heading">Contacto</h3>
          <div className="footer__contact-info">
            <a
              href="https://maps.app.goo.gl/Ehop7VTXqgbqtkbn8"
              target="_blank"
              rel="noreferrer"
              className="footer__contact-item">
              <FaLocationDot className="footer__contact-icon" />
              <span>Calle Juan Bautista Pérez No. 2, Santiago, Rep. Dom.</span>
            </a>
            <a href="tel:8095801429" className="footer__contact-item">
              <FaPhone className="footer__contact-icon" />
              <span>Tel. (809) 580-1429</span>
            </a>
            <a
              href="mailto:informacion@contrerasrobledo.com.do"
              className="footer__contact-item">
              <IoMailOpen className="footer__contact-icon" />
              <span>informacion@contrerasrobledo.com.do</span>
            </a>
          </div>
        </div>
      </div>

      {/* Sección Inferior - Copyright y Legal */}
      <div className="footer__bottom">
        <div className="footer__copyright">
          <span>
            © {getCurrentYear()} Laboratorio de Patología Contreras Robledo.
            Todos los derechos reservados.
          </span>
        </div>
        <div className="footer__legal">
          <Link to="#">Privacidad</Link>
          <Link to="#">Términos</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
