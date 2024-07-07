import { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import pin from '../../images/pin.svg';
import phone from '../../images/telefono.svg';
import mail from '../../images/mail.svg';
import facebook from '../../images/facebook.svg';
import instagram from '../../images/instagram.svg';
import './footer.css';

function getCurrentYear() {
	const currentYear = new Date().getFullYear();
	return currentYear;
}

function Footer() {
	const derechosRef = useRef(null);
	const controls = useAnimation();

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						controls.start({ x: 0, opacity: 1 });
					} else {
						controls.start({ x: '-100%', opacity: 0 });
					}
				});
			},
			{ threshold: 0.1 }
		);

		if (derechosRef.current) {
			observer.observe(derechosRef.current);
		}

		return () => {
			if (derechosRef.current) {
				observer.unobserve(derechosRef.current);
			}
		};
	}, [controls]);

	return (
		<footer className="footer">
			<div className="info-compania">
				<div className="datos">
					<div className="info">
						<img src={pin} alt="pin" className="icons-footer" />
						<span>Calle Juan Bautista Pérez No. 2, Santiago, Rep. Dom.</span>
					</div>
					<div className="info">
						<img src={phone} alt="phone" className="icons-footer" />
						<span>Tel. (809)-580-1429</span>
					</div>
					<div className="info">
						<img src={mail} alt="mail" className="icons-footer" />
						<span>labcontreras@gmail.com</span>
					</div>
				</div>
			</div>
			<div className="redes-sociales">
				<a href="https://www.facebook.com/contrerasrobledo/?locale=es_LA" target="_blank" rel="noreferrer">
					<img src={facebook} alt="facebook" />
				</a>
				<a href="https://www.instagram.com/labcontrerasrobledo/" target="_blank" rel="noreferrer">
					<img src={instagram} alt="instagram" />
				</a>
			</div>
			<div className="derechos" ref={derechosRef}>
				<motion.p
					initial={{ x: '-100%', opacity: 0 }}
					animate={controls}
					transition={{ type: 'spring', stiffness: 100, damping: 10 }}
				>
					Desarrollado por Giganet Services SRL
				</motion.p>
				<span>
					© {getCurrentYear()} Laboratorio de Patología Contreras Robledo. Todos los derechos
					reservados.
				</span>
			</div>
		</footer>
	);
}

export default Footer;
