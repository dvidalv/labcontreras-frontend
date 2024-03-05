import { Link } from 'react-router-dom';
import './tooltip.css';
/* eslint-disable react/prop-types */
import successIcon from '../../images/check.svg';
import alertIcon from '../../images/alert.svg';
import { useAppContext } from '../../contexts/MyContext';

function Tooltip({ message, type }) {
	const { showTooltip, setShowTooltip, message: messageContext, setMessage, type: typeContext, setType } = useAppContext();	
	console.log('showTooltip:', showTooltip);
	return (
		<div className="tooltip">
			<div className="tooltip__container">
			{type === 'success' && <img src={successIcon} alt="icon" className="tooltip__icon" />}
			{type === 'alert' && <img src={alertIcon} alt="icon" className="tooltip__icon" />}
			<p className="tooltip__message">{message}</p>
			<Link onClick={() => setShowTooltip(false)} to="/signin" className="tooltip__link">Iniciar sesión</Link>
			</div>
		</div>
	);
}

export default Tooltip;
