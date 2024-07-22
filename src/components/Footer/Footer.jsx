import { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import facebook from '../../images/facebook.svg';
import instagram from '../../images/instagram.svg';
import './footer.css';
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
						<FaLocationDot 
							
							className="icons"
						/>
						<span>Calle Juan Bautista Pérez No. 2, Santiago, Rep. Dom.</span>
					</div>
					<div className="info">
						<FaPhone className="icons" />
						<span>Tel. (809) 580-1429</span>
					</div>
					<div className="info">
						<IoMailOpen className="icons" />
						<span>info@contrerasrobledo.com.do</span>
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
