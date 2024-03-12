import { Form, Link } from 'react-router-dom';
import '../form.css';
import Tooltip from '../../../components/ToolTip/Tooltip';
import { useAppContext } from '../../../contexts/MyContext';
import { authorize } from '../../../utils/auth';
import { useLocation, useNavigate } from 'react-router-dom';

function Signin() {
	const location = 'signin';
	const locationState = useLocation();
	const navigate = useNavigate();
	const { from } = locationState.state || { from: { pathname: '/' } };
	const { showTooltip, setShowTooltip, message, setMessage, type, setType, token, setToken } =
		useAppContext();

	async function handleSubmit(e) {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const email = formData.get('email');
		const password = formData.get('password');
		try {
			const response = await authorize(email, password);
			console.log(response);
			if (!response.ok) {
				// Si la respuesta no es OK, muestra el tooltip con el mensaje de error y detiene la ejecución.
				setShowTooltip(true);
				setType('error');
				setMessage('Password o Email incorrectos');
				return; // Detiene la ejecución si la respuesta no es exitosa.
			}
			const res = await response.json();
			navigate(from.pathname, { replace: true }); // Redirect to the previous page
			if (res.token) {
				// Si la respuesta es OK, guarda el token en el estado y en el almacenamiento local.
				setToken(res.token);
				localStorage.setItem('token', res.token); // Correctly saves the token with a key 'token'; // Guarda el token en el almacenamiento local.
				// Configura los mensajes y muestra el tooltip de éxito.
				// setMessage('Inicio de sesión exitoso');
				// setType('success');
				// setShowTooltip(true);
				//redirect to home
			}
		} catch (err) {
			console.error(err); // Es útil para depuración ver el error en la consola.
			setType('error');
			setMessage('Ha ocurrido un error al intentar iniciar sesión.');
			setShowTooltip(true);
		}
	}

	return (
		<div className="form-container">
			<h1 className="form-container__title">Signin</h1>
			<Form className="form" onSubmit={handleSubmit}>
				<label className="form__label" htmlFor="email">
					Email
				</label>
				<input
					type="email"
					id="email"
					name="email"
					required={true}
					className="form__input"
					placeholder="Enter your email"
				/>

				<label className="form__label" htmlFor="password">
					Password
				</label>
				<input
					required={true}
					type="password"
					id="password"
					name="password"
					className="form__input"
					placeholder="Enter your password"
				/>
				<div className="form__links">
					<Link
						to="/forgot-password"
						className="form__link form-link--forgot-password"
					>
						Forgot password?
					</Link>
					<Link to="/signup" className="form__link form__link_create-account">
						Create account
					</Link>
				</div>

				<button type="submit" className="form__button">
					Submit
				</button>
			</Form>
			{showTooltip && (
				<Tooltip
					message={message}
					type={type}
					location={location}
				/>
			)}
		</div>
	);
}

export default Signin;
