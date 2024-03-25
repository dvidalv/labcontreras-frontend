import { Link, useNavigate } from 'react-router-dom';
import './tooltip.css';
/* eslint-disable react/prop-types */
import successIcon from '../../images/check.svg';
import alertIcon from '../../images/alert.svg';
import { useAppContext } from '../../contexts/MyContext';
import { useEffect } from 'react';

function Tooltip({ type, location, className}) {
	const navigate = useNavigate();
	const { setShowTooltip, message, setMessage } = useAppContext();

	// Manejador para cerrar el tooltip cuando se presiona Enter
	useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.key === 'Enter' || event.key === 'Escape') {
				event.preventDefault();
				setShowTooltip(false);
			}
		};

		// Agregar listener
		window.addEventListener('keydown', handleKeyDown);

		// Remover listener al desmontar
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [setShowTooltip]);

	const closeTooltip = () => {
		setShowTooltip(false);
	};

	return (
		<div className={`tooltip ${className}`} onClick={closeTooltip}>
			<div className="tooltip__container" onClick={e => e.stopPropagation()}>
				{type === 'success' && (
					<img src={successIcon} alt="icon" className="tooltip__icon" />
				)}
				{type === 'error' && (
					<img src={alertIcon} alt="icon" className="tooltip__icon" />
				)}
				<p className="tooltip__message">{message}</p>
				{type === 'success' && location === 'signup' && (
					<button
						onClick={() => {
							setShowTooltip(false);
							setMessage('');
							navigate('/signin');
						}}
						className="tooltip__link"
					>
						Iniciar sesión
					</button>
				)}
				{type === 'success' && location === 'signin' && (
					<Link
						onClick={() => {
							setShowTooltip(false);
							setMessage('');
						}}
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
							setMessage('');
							navigate('/signin');
						}}
						className="tooltip__link"
					>
						Aceptar
					</button>
				)}
				{type === 'success' && location === 'signin' && (
					<button
						onClick={() => {
							setShowTooltip(false);
							location = '';
							setMessage('');
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
							setMessage('');
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
				{type === 'error' && location === 'editMedico' && (
					<button
						onClick={() => {
							setShowTooltip(false);
							location = '';
							setMessage('');
						}}
						className="tooltip__link"
					>
						Aceptar
					</button>
				)}
				{type === 'error' && location === 'nuevoMedico' && (
					<button
						onClick={() => {
							setShowTooltip(false);
							location = '';
							setMessage('');
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
