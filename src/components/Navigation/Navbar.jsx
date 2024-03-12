import { NavLink } from 'react-router-dom';
import './navbar.css';
// eslint-disable-next-line react/prop-types
function Navbar({ color, bgColor, isMenuOpen, display, setIsMenuOpen}) {
	return (
		<nav className={`navbar ${isMenuOpen ? 'open' : ''}`}  style={{ backgroundColor: bgColor }}>
			<ul className={`navbar__menu ${display ? 'display' : ''}`} style={{ backgroundColor: bgColor }}>
				<li className="navbar__item">
					<NavLink to="/" className="navbar__link" style={{ color: color }} onClick={() => setIsMenuOpen(false)}>
						Inicio
					</NavLink>
				</li>
				<li className="navbar__item">
					<NavLink to="/nosotros" className="navbar__link" style={{ color: color }} onClick={() => setIsMenuOpen(false)}>	
						Nosotros
					</NavLink>
				</li>
				<li className="navbar__item">
					<NavLink to="/pacientes" className="navbar__link" style={{ color: color }} onClick={() => setIsMenuOpen(false)}>
					Pacientes
					</NavLink>
				</li>
				<li className="navbar__item">
					<NavLink to="/medicos" className="navbar__link" style={{ color: color }} onClick={() => setIsMenuOpen(false)}>
						Médicos
					</NavLink>
				</li>
				<li className="navbar__item">
					<NavLink to="/servicios" className="navbar__link" style={{ color: color }} onClick={() => setIsMenuOpen(false)}>
						Servicios
					</NavLink>
				</li>
				<li className="navbar__item">
					<NavLink to="/seguros" className="navbar__link" style={{ color: color }} onClick={() => setIsMenuOpen(false)}>
						Seguros
					</NavLink>
				</li>
				<li className="navbar__item">
					<NavLink to="/contact" className="navbar__link" style={{ color: color }} onClick={() => setIsMenuOpen(false)}>
						Contacto
					</NavLink>
				</li>
			</ul>
		</nav>
	);
}

export default Navbar;
