import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import MenuLink from '../DropDown/MenuLink';
import PropTypes from 'prop-types';
import './navbar.css';
import DropDown from '../DropDown/DropDown';
import { useAppContext } from '../../contexts/MyContext';
import { menuLinks } from '../../utils/constants';


function Navbar({ color, bgColor, isMenuOpen, display, setIsMenuOpen }) {
	const location = useLocation();
	const [openSubmenu, setOpenSubmenu] = useState(null);
	const { user } = useAppContext();

	const handleMenuClick = (menuName) => {
		if (openSubmenu === menuName) {
			setOpenSubmenu(null);
		} else {
			setOpenSubmenu(menuName);
		}
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
				{menuLinks.map((link) => {
					// console.log(link);
					if (!user || (user.role !== 'admin' && link.to !== '/medicos')) {
						return (
							<MenuLink 
								key={link.to} 
								{...link} 
								isActive={isActive(link.to)}
								isOpen={openSubmenu === link.text}
								onClick={() => handleMenuClick(link.text)}
								setOpenSubmenu={setOpenSubmenu}
							>
								{link.submenu && link.submenuItems.map((subItem) => (
									<DropDown
										key={subItem.to}
										to={subItem.to}
										text={subItem.text}
										setOpenSubmenu={setOpenSubmenu}
									/>
								))}
							</MenuLink>
						);
					} else if (user.role === 'admin') {
						return (
							<MenuLink 
								key={link.to} 
								{...link} 
								isActive={isActive(link.to)}
								isOpen={openSubmenu === link.text}
								onClick={() => handleMenuClick(link.text)}
								setOpenSubmenu={setOpenSubmenu}
							>
								{link.submenu && link.submenuItems.map((subItem) => (
									<DropDown
										key={subItem.to}
										to={subItem.to}
										text={subItem.text}
										setOpenSubmenu={setOpenSubmenu}
									/>
								))}
							</MenuLink>
						);
					}
					return null;
				})}
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
