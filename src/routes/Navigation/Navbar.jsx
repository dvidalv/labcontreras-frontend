import { Link, NavLink } from 'react-router-dom';
import './navbar.css';
// eslint-disable-next-line react/prop-types
function Navbar({ color, bgColor, isMenuOpen, display }) {
	return (
		<nav className={`navbar ${isMenuOpen ? 'open' : ''}`}  style={{ backgroundColor: bgColor }}>
			<ul className={`navbar__menu ${display ? 'display' : ''}`} style={{ backgroundColor: bgColor }}>
				<li className="navbar__item">
					<NavLink to="/" className="navbar__link" style={{ color: color }}>
						Inicio
					</NavLink>
				</li>
				<li className="navbar__item">
					<NavLink to="/nosotros" className="navbar__link" style={{ color: color }}>	
						Nosotros
					</NavLink>
				</li>
				<li className="navbar__item">
					<NavLink to="/pacientes" className="navbar__link" style={{ color: color }}>
					Pacientes
					</NavLink>
				</li>
				<li className="navbar__item">
					<NavLink to="/servicios" className="navbar__link" style={{ color: color }}>
						Servicios
					</NavLink>
				</li>
				<li className="navbar__item">
					<NavLink to="/seguros" className="navbar__link" style={{ color: color }}>
						Seguros
					</NavLink>
				</li>
				<li className="navbar__item">
					<NavLink to="/contacto" className="navbar__link" style={{ color: color }}>
						Contacto
					</NavLink>
				</li>
			</ul>
		</nav>
	);
}

export default Navbar;
