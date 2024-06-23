import { NavLink } from 'react-router-dom';
import './navbar.css';
// eslint-disable-next-line react/prop-types
function Navbar({ color, bgColor, isMenuOpen, display, setIsMenuOpen, user}) {
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
					<NavLink to="/medicos" className="navbar__link" style={{ color: color }} onClick={() => setIsMenuOpen(false)}>
						Médicos
					</NavLink>
				</li>
		
				{user.role === 'admin' && <li className="navbar__item">
					<NavLink to="/resultados" className="navbar__link" style={{ color: color }} onClick={() => setIsMenuOpen(false)}>
						Resultados
					</NavLink>
				</li>}

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
