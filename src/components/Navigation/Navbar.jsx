import './navbar.css';
// eslint-disable-next-line react/prop-types
function Navbar({ color, bgColor, isMenuOpen }) {
	return (
		<nav className={`navbar ${isMenuOpen ? 'open' : ''}`}  style={{ backgroundColor: bgColor }}>
			<ul className="navbar__menu" style={{ backgroundColor: bgColor }}>
				<li className="navbar__item">
					<a href="#inicio" className="navbar__link" style={{ color: color }}>
						Inicio
					</a>
				</li>
				<li className="navbar__item">
					<a href="#nosotros" className="navbar__link" style={{ color: color }}>
						Nosotros
					</a>
				</li>
				<li className="navbar__item">
					<a
						href="#servicios"
						className="navbar__link"
						style={{ color: color }}
					>
						Servicios
					</a>
				</li>
				<li className="navbar__item">
					<a href="#contacto" className="navbar__link" style={{ color: color }}>
						Seguros
					</a>
				</li>
				<li className="navbar__item">
					<a href="#contacto" className="navbar__link" style={{ color: color }}>
						Contacto
					</a>
				</li>
			</ul>
		</nav>
	);
}

export default Navbar;
