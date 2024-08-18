import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
function DropDown({to, text, setOpenSubmenu}) {
	return (
		<ul className="dropdown__item">
			<li>
				<Link to={to} className="dropdown__link" onClick={() => setOpenSubmenu(null)}>{text}</Link>
			</li>
		</ul>
	)
}

DropDown.propTypes = {
	to: PropTypes.string,
	text: PropTypes.string,
	setOpenSubmenu: PropTypes.func.isRequired
};

export default DropDown
