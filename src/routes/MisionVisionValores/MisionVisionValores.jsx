import { useState, useEffect } from 'react';
import { useAppContext } from '../../contexts/MyContext';
import './MisionVisionValores.css';
// import letyTrabajando from '../../images/lety-trabajando.jpg';
import { FaHeart } from 'react-icons/fa';
import { FaEye } from 'react-icons/fa6';
import { TbTargetArrow } from 'react-icons/tb';

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

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	useEffect(() => {
		if (viewportWidth > 768) {
			setIsMenuOpen(false);
		}
	}, [viewportWidth, setIsMenuOpen]);
	return (
		<div className="historia__hero">
			<div className="historia">
			<div className="historia__mision">
				<div className="historia__imagen">
					<div className="historia__imagen-container">
						<TbTargetArrow size={25} color="white" />
					</div>
					<h2 className="historia__titulo">Misión</h2>
				</div>
				<p className="historia__texto">
					En el año 2030 seremos un referente en servicios de patología de
					vanguardia con honestidad incuestionable. Representaremos la mejor
					opción para nuestros pacientes, colaboradores y la comunidad.
				</p>
			</div>

			<div className="historia__vision">
				<div className="historia__imagen">
					<div className="historia__imagen-container">
						<FaEye size={25} color="white" />
					</div>
					<h2 className="historia__titulo">Visión</h2>
				</div>
				<p className="historia__texto">
					Ofrecemos a nuestros pacientes servicios de patología de excelencia en
					la prevención, diagnóstico, tratamiento y seguimiento para la toma de
					las mejores decisiones clínicas por medio de la innovación y el uso de
					tecnología avanzada. Contribuimos con la protección del medio
					ambiente.
				</p>
			</div>

			<div className="historia__valores">
				<div className="historia__imagen">
					<div className="historia__imagen-container">
						<FaHeart size={25} color="white" />
					</div>
					<h2 className="historia__titulo">Valores</h2>
				</div>
				<ul className="historia__lista">
					<li className="historia__item">Innovación</li>
					<li className="historia__item">Trabajo en equipo</li>
					<li className="historia__item">Ética</li>
					<li className="historia__item">Excelencia</li>
				</ul>
			</div>

			<div className="historia__principios">
				<div className="historia__imagen">
					<div className="historia__imagen-container">
						<FaHeart size={25} color="white" />
					</div>
					<h2 className="historia__titulo">Principios</h2>
				</div>
				<ul className="historia__lista">
					<li className="historia__item">Ética</li>
					<li className="historia__item">Honestidad</li>
				</ul>
				</div>
			</div>
		</div>
	);
}

export default MisionVisionValores;
