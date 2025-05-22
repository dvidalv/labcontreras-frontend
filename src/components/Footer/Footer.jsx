import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import facebook from "../../images/facebook.svg";
import instagram from "../../images/instagram.svg";
import "./footer.css";
import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { IoMailOpen } from "react-icons/io5";

function getCurrentYear() {
  const currentYear = new Date().getFullYear();
  return currentYear;
}

function Footer() {
  const derechosRef = useRef(null);
  const controls = useAnimation();

  useEffect(() => {
    let mounted = true;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (mounted) {
            if (entry.isIntersecting) {
              controls.start({ x: 0, opacity: 1 });
            } else {
              controls.start({ x: "-100%", opacity: 0 });
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (derechosRef.current) {
      observer.observe(derechosRef.current);
    }

    return () => {
      mounted = false;
      if (derechosRef.current) {
        observer.unobserve(derechosRef.current);
      }
    };
  }, [controls]);

  return (
    <footer className="footer">
      <div className="info-compania">
        <div className="datos">
          <div>
            <a
              className="info"
              href="https://maps.app.goo.gl/Ehop7VTXqgbqtkbn8"
              target="_blank"
              rel="noreferrer">
              <FaLocationDot className="icons" />
              <span>Calle Juan Bautista Pérez No. 2, Santiago, Rep. Dom.</span>
            </a>
          </div>
          <div className="info">
            <a className="info" href="tel:8095801429">
              <FaPhone className="icons" />
              <span>Tel. (809) 580-1429</span>
            </a>
          </div>
          <div className="info">
            <a className="info" href="mailto:info@contrerasrobledo.com.do">
              <IoMailOpen className="icons" />
              <span>informacion@contrerasrobledo.com.do</span>
            </a>
          </div>
        </div>
      </div>
      <div className="redes-sociales">
        <a
          href="https://www.facebook.com/contrerasrobledo/?locale=es_LA"
          target="_blank"
          rel="noreferrer">
          <img src={facebook} alt="facebook" />
        </a>
        <a
          href="https://www.instagram.com/labcontrerasrobledo/"
          target="_blank"
          rel="noreferrer">
          <img src={instagram} alt="instagram" />
        </a>
      </div>
      <div className="derechos" ref={derechosRef}>
        <a href="https://www.giganet-srl.com/" target="_blank" rel="noreferrer">
          <motion.p
            initial={{ x: "-100%", opacity: 0 }}
            animate={controls}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}>
            Desarrollado por Giganet Services SRL
          </motion.p>
        </a>
        <span>
          © {getCurrentYear()} Laboratorio de Patología Contreras Robledo. Todos
          los derechos reservados.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
