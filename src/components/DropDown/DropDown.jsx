import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './MenuLinkMobile.css';

const styles = {
	dropdown: {
		// color: '#c0bfbf',
		// fontSize: '14px',
	}
}


function DropDown({to, text, onClick}) {
	return (
		
		<ul style={styles.dropdown}>
			<li>
				<Link to={to} className="dropdown__link" style={styles.dropdown} onClick={onClick}>{text}</Link>
			</li>
		</ul>
	)
}

DropDown.propTypes = {
	to: PropTypes.string,
	text: PropTypes.string,
	onClick: PropTypes.func,
};

export default DropDown
