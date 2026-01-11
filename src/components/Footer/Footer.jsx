import { Link } from "react-router-dom";
import "./footer.css";
import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { IoMailOpen } from "react-icons/io5";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import logo from "../../images/logo.svg";

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
              href="#"
              target="_blank"
              rel="noreferrer"
              className="footer__social-icon">
              <FaTwitter />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className="footer__social-icon">
              <FaLinkedinIn />
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
