import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function MenuLink({
	color,
	onClick,
	to,
	text,
	children,
	isOpen,
	isActive,
	setOpenSubmenu,
}) {
	const onMouseLeave = () => {
		setOpenSubmenu(null);
	};
	return (
		<li className="navbar__item">
			<Link
				to={to}
				className={`navbar__link ${isActive ? 'active' : ''}`}
				style={{ color: color }}
				onClick={onClick}
			>
				{text}
			</Link>
			{children && isOpen && (
				<ul className="dropdown" onMouseLeave={onMouseLeave}>
					{children}
				</ul>
			)}
		</li>
	);
}

MenuLink.propTypes = {
	color: PropTypes.string,
	onClick: PropTypes.func,
	to: PropTypes.string,
	text: PropTypes.string,
	children: PropTypes.node,
	isOpen: PropTypes.bool,
	isActive: PropTypes.bool,
	setOpenSubmenu: PropTypes.func,
};

export default MenuLink;
