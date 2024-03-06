import { Link } from 'react-router-dom';
import './tooltip.css';
/* eslint-disable react/prop-types */
import successIcon from '../../images/check.svg';
import alertIcon from '../../images/alert.svg';
import { useAppContext } from '../../contexts/MyContext';

function Tooltip({ message, type }) {

	const { setShowTooltip, token } = useAppContext();
	return (
		<div className="tooltip">
			<div className="tooltip__container">
				{type === 'success' && (
					<img src={successIcon} alt="icon" className="tooltip__icon" />
				)}
				{type === 'error' && (
					<img src={alertIcon} alt="icon" className="tooltip__icon" />
				)}
				<p className="tooltip__message">{message}</p>
				{type === 'success' && !token && (
					<Link
						onClick={() => setShowTooltip(false)}
						to="/signin"
						className="tooltip__link"
					>
						Iniciar sesión
					</Link>
				)}
				{type === 'success' && token && (
					<Link
						onClick={() => setShowTooltip(false)}
						to="/"
						className="tooltip__link"
					>
						Ir a Home
					</Link>
				)}
				{type === 'error' && (
					<Link
						onClick={() => setShowTooltip(false)}
						to="/signin"
						className="tooltip__link"
					>
						Iniciar sesión
					</Link>
				)}
			</div>
		</div>
	);
}

export default Tooltip;
