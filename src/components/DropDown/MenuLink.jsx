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
	external,
}) {
	const onMouseLeave = () => {
		setOpenSubmenu(null);
	};
	const className = `navbar__link ${isActive ? 'active' : ''}`;
	const style = { color: color };

	if (external) {
		return (
			<li className="navbar__item">
				<a
					href={to}
					target="_blank"
					rel="noopener noreferrer"
					className={className}
					style={style}
					onClick={() => setOpenSubmenu(null)}
				>
					{text}
				</a>
			</li>
		);
	}

	return (
		<li className="navbar__item">
			<Link
				to={to}
				className={className}
				style={style}
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
	external: PropTypes.bool,
};

export default MenuLink;
