import { Form, Link } from 'react-router-dom';
import './Signin.css';
import Tooltip from '../../../components/ToolTip/Tooltip';
import { useAppContext } from '../../../contexts/MyContext';
import { authorize } from '../../../utils/auth';
import { useLocation, useNavigate } from 'react-router-dom';

function Signin() {
	const locationState = useLocation();
	const navigate = useNavigate();
	const { from } = locationState.state || { from: { pathname: '/' } };
	const {
		showTooltip,
		setShowTooltip,
		message,
		setMessage,
		type,
		setType,
		setToken,
		location,
		setLocation,
	} = useAppContext();

	async function handleSubmit(e) {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const email = formData.get('email');
		const password = formData.get('password');
		try {
			const response = await authorize(email, password);
			if (!response.ok) {
				setShowTooltip(true);
				setType('error');
				setMessage('Password o Email incorrectos');
				setLocation('signin');
				return;
			}
			const res = await response.json();
			navigate(from.pathname, { replace: true });
			if (res.token) {
				setToken(res.token);
				localStorage.setItem('token', res.token);
			}
		} catch (err) {
			console.error(err);
			setType('error');
			setMessage('Ha ocurrido un error al intentar iniciar sesión.');
			setShowTooltip(true);
		}
	}

	return (
		<div className="form-container">
			<h1 className="form-container__title">Ingresar</h1>
			<Form className="form" onSubmit={handleSubmit}>
				<label className="form__label" htmlFor="email">
					Correo electrónico
				</label>
				<input
					type="email"
					id="email"
					name="email"
					required={true}
					className="form__input"
					placeholder="Ingresa tu correo electrónico"
				/>

				<label className="form__label" htmlFor="password">
					Clave
				</label>
				<input
					required={true}
					type="password"
					id="password"
					name="password"
					className="form__input"
					placeholder="Ingresa tu clave"
				/>
				<div className="form__links">
					{/* <Link
						to="/forgot-password"
						className="form__link form-link--forgot-password"
					>
						¿Olvidaste tu contraseña?
					</Link> */}
					<Link to="/signup" className="form__link form__link_create-account">
						Crear cuenta
					</Link>
				</div>

				<button type="submit" className="form__button">
					Ingresar
				</button>
			</Form>
			{showTooltip && (
				<Tooltip
					message={message}
					type={type}
					location={location}
					className="tooltip--visible"
				/>
			)}
		</div>
	);
}

export default Signin;
