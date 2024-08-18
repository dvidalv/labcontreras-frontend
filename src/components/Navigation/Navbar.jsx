import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import MenuLink from '../DropDown/MenuLink';
import PropTypes from 'prop-types';
import './navbar.css';
import DropDown from '../DropDown/DropDown';

function Navbar({ color, bgColor, isMenuOpen, display, setIsMenuOpen, user }) {
	const location = useLocation();
	const [openSubmenu, setOpenSubmenu] = useState(null);

	const handleMenuClick = (menuName) => {
		if (openSubmenu === menuName) {
			setOpenSubmenu(null);
		} else {
			setOpenSubmenu(menuName);
		}
		setIsMenuOpen(false);
	};

	const isActive = (path) => {
		if (path === '/') return location.pathname === '/';
		return location.pathname.startsWith(path); // true or false
	};

	return (
		<nav
			className={`navbar ${isMenuOpen ? 'open' : ''}`}
			style={{ backgroundColor: bgColor }}
		>
			<ul
				className={`navbar__menu ${display ? 'display' : ''}`}
				style={{ backgroundColor: bgColor }}
			>
				<MenuLink
					isActive={isActive('/')}
					color={color}
					onClick={() => handleMenuClick(null)}
					to="/"
					text="Inicio"
				/>

				<MenuLink
					setOpenSubmenu={setOpenSubmenu}
					isActive={isActive('/nosotros')}
					color={color}
					onClick={() => handleMenuClick('nosotros')}
					text="Nosotros"
					isOpen={openSubmenu === 'nosotros'}
					// to="/nosotros"
				>
					<DropDown
						to="/nosotros"
						text="Historia"
						setOpenSubmenu={setOpenSubmenu}
					/>
					<DropDown
						to="/nosotros"
						text="Quienes somos"
						setOpenSubmenu={setOpenSubmenu}
					/>
					<DropDown
						to="/nosotros"
						text="Mision, vision y valores"
						setOpenSubmenu={setOpenSubmenu}
					/>
				</MenuLink>

				{user && user?.role === 'admin' && (
					<MenuLink
						color={color}
						onClick={() => handleMenuClick(null)}
						to="/medicos"
						text="Médicos"
					/>
				)}

				<MenuLink
					isActive={isActive('/resultados')}
					color={color}
					onClick={() => handleMenuClick(null)}
					text="Resultados"
					to="/resultados"
				/>

				<MenuLink
					isActive={isActive('/contact')}
					color={color}
					onClick={() => handleMenuClick(null)}
					to="/contact"
					text="Contacto"
				/>
			</ul>
		</nav>
	);
}
Navbar.propTypes = {
	color: PropTypes.string,
	bgColor: PropTypes.string,
	isMenuOpen: PropTypes.bool,
	display: PropTypes.bool,
	setIsMenuOpen: PropTypes.func,
	user: PropTypes.object,
};

export default Navbar;
