import { Link } from 'react-router-dom';
import './navbar.css';
// eslint-disable-next-line react/prop-types
function Navbar({ color, bgColor, isMenuOpen }) {
	return (
		<nav className={`navbar ${isMenuOpen ? 'open' : ''}`}  style={{ backgroundColor: bgColor }}>
			<ul className="navbar__menu" style={{ backgroundColor: bgColor }}>
				<li className="navbar__item">
					<Link to="/" className="navbar__link" style={{ color: color }}>
						Inicio
					</Link>
				</li>
				<li className="navbar__item">
					<Link to="/nosotros" className="navbar__link" style={{ color: color }}>	
						Nosotros
					</Link>
				</li>
				<li className="navbar__item">
					<Link to="/pacientes" className="navbar__link" style={{ color: color }}>
					Pacientes
					</Link>
				</li>
				<li className="navbar__item">
					<Link to="/servicios" className="navbar__link" style={{ color: color }}>
						Servicios
					</Link>
				</li>
				<li className="navbar__item">
					<Link to="/seguros" className="navbar__link" style={{ color: color }}>
						Seguros
					</Link>
				</li>
				<li className="navbar__item">
					<a href="/contacto" className="navbar__link" style={{ color: color }}>
						Contacto
					</a>
				</li>
			</ul>
		</nav>
	);
}

export default Navbar;
