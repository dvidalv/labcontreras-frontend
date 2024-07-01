import { Form } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Tooltip from '../../../components/ToolTip/Tooltip';
import { useAppContext } from '../../../contexts/MyContext';
import { authorizeMedico } from '../../../utils/auth';
import { useLocation, useNavigate } from 'react-router-dom';

const schema = z.object({
	username: z.string(),
	password: z.string().min(6).max(12),
});

function Signin() {
	//hook form
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting, isValid },
	} = useForm({
		resolver: zodResolver(schema),
		mode: 'onChange',
	});

	const locationState = useLocation();
	const navigate = useNavigate();
	const { from } = locationState.state || { from: { pathname: '/' } }; // Si no hay estado, redirecciona al inicio
	const {
		showTooltip,
		setShowTooltip,
		message,
		setMessage,
		type,
		setType,
		location,
		setLocation,
		setFileMakerToken,
		setMedicoUser,
	} = useAppContext();
	// console.log(fileMakerToken);

	async function handleForm(data) {
		const { username, password } = data;
		try {
			const response = await authorizeMedico(username, password);
			const res = await response.json();
			const dataMedico = res.response.data[0].fieldData;
			const { nombre, apellido, email, ID, foto } = dataMedico;
			localStorage.setItem(
				'medicoUser',
				JSON.stringify({ nombre, apellido, email, ID, foto })
			);
			setMedicoUser((prev) => ({ ...prev, nombre, apellido, email, ID, foto }));
			if (!res.token) {
				setShowTooltip(true);
				setType('error');
				setMessage('Usuario o contraseña incorrectos');
				setLocation('signin');
				return;
			}
			// console.log(res.response.token);
			if (res.messages[0].code === '401') {
				setShowTooltip(true);
				setType('error');
				setMessage('Usuario o contraseña incorrectos');
				setLocation('signin');
				return;
			}

			localStorage.setItem('fileMakerToken', res.token);
			localStorage.setItem('tokenTimestamp', new Date().getTime());
			setFileMakerToken(() => res.token);
			navigate(from.pathname, { replace: true }); // Redirecciona al usuario al estado anterior
			// navigate('/resultados');
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
			<Form className="form" onSubmit={handleSubmit(handleForm)}>
				<label className="form__label" htmlFor="email">
					Usuario
				</label>
				<input
					{...register('username')}
					autoComplete="off"
					name="username"
					id="username"
					className="form__input"
					placeholder="Ingresa tu nombre de usuario"
				/>
				<p className="form__error">{errors.username?.message}</p>

				<label className="form__label" htmlFor="password">
					Contraseña
				</label>
				<input
					{...register('password')}
					autoComplete="off"
					name="password"
					type="password"
					id="password"
					className="form__input"
					placeholder="Ingresa tu clave"
				/>
				<p className="form__error">{errors.password?.message}</p>
				<div className="form__link form__link_create-account">
					{/* <Link
						to="/forgot-password"
						className="form__link form-link--forgot-password"
					>
						¿Olvidaste tu contraseña?
					</Link> */}
					{/* <Link to="/signup" >
						Crear cuenta
					</Link> */}
				</div>

				<button
					disabled={!isValid || isSubmitting}
					type="submit"
					className={`form__button ${
						!isValid || isSubmitting ? 'disabled' : ''
					}`}
				>
					{isSubmitting ? 'Enviando...' : 'Ingresar'}
				</button>
				<p className="form__error">{errors.root && errors.root.message}</p>
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
