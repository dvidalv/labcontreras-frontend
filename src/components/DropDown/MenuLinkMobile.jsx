import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './MenuLinkMobile.css';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

function MenuLinkMobile({ to, text, isSubmenu, children }) {
	const [isOpen, setIsOpen] = useState(false);
	// console.log(isOpen)

	return (
		<div className="menu-link-mobile">
			<div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
				<Link to={to}>{text}</Link>
				{isSubmenu && <IoIosArrowUp className={isOpen ? 'arrow-icon open' : 'arrow-icon'} onClick={() => setIsOpen(!isOpen)} />}
			</div>
			{isOpen && children}
		</div>
	)
}

MenuLinkMobile.propTypes = {
	to: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	isSubmenu: PropTypes.bool.isRequired,
	children: PropTypes.node,
};

export default MenuLinkMobile;