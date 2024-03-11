import { Link, useNavigate } from 'react-router-dom';
import './tooltip.css';
/* eslint-disable react/prop-types */
import successIcon from '../../images/check.svg';
import alertIcon from '../../images/alert.svg';
import { useAppContext } from '../../contexts/MyContext';

function Tooltip({ message, type, location }) {
	const navigate = useNavigate();
	const { setShowTooltip } = useAppContext();
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
				{type === 'success' && location === 'signup' && (
					<Link
						onClick={() => setShowTooltip(false)}
						to="/signin"
						className="tooltip__link"
					>
						Iniciar sesión
					</Link>
				)}
				{type === 'success' && location === 'signin' && (
					<Link
						onClick={() => setShowTooltip(false)}
						to="/"
						className="tooltip__link"
					>
						Ir a Home
					</Link>
				)}
				{type === 'error' && location === 'signup' && (
					<button
						onClick={() => {
							setShowTooltip(false);
							location = '';
							navigate('/signin');
						}}
						className="tooltip__link"
					>
						Aceptar
					</button>
				)}
				{type === 'error' && location === 'signin' && (
					<button
						onClick={() => {
							setShowTooltip(false);
							location = '';
						}}
						className="tooltip__link"
					>
						Aceptar
					</button>
				)}
				{type === 'success' && location === 'contact' && (
					<button
						onClick={() => {
							setShowTooltip(false);
							location = '';
						}}
						className="tooltip__link"
					>
						Aceptar
					</button>
				)}
			</div>
		</div>
	);
}

export default Tooltip;
