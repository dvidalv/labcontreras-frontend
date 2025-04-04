import { Form } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Tooltip from '../../../components/ToolTip/Tooltip';
import { useAppContext } from '../../../contexts/MyContext';
import { authorize } from '../../../utils/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const schema = z.object({
	email: z.string().email(),
	password: z.string().min(6).max(12),
});

const gotoTop = () => {
	window.scrollTo(0, 0);
};


function Signin() {
	
	useEffect(() => {
		gotoTop();
	}, []);
	
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
		setToken,
		location,
		setLocation,
	} = useAppContext();

	async function handleForm(data) {
		const { email, password } = data;
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
			navigate(from.pathname, { replace: true }); // Redirecciona al usuario al estado anterior
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
		<div className="form-container" style={{ paddingTop: '40px' }}>
			<p
				style={{
					textAlign: 'center',
					color: 'red',
					fontSize: '14px',
					padding: '0',
					width: '400px',
					margin: '0 auto',
				}}
			>
				Si estas tratando de acceder a los resultados de pacientes, por favor
				usa el siguiente enlace:
				<a href="https://contrerasrobledo.com/medico-signin">
					<span
						style={{
							color: 'blue',
							textDecoration: 'underline',
							margin: '0',
							padding: '0 0 10px 0',
						}}
					>
						Resultado
					</span>
				</a>
			</p>
			<h1 className="form-container__title">Ingresar</h1>
			<Form className="form" onSubmit={handleSubmit(handleForm)}>
				<label className="form__label" htmlFor="email">
					Correo electrónico
				</label>
				<input
					{...register('email')}
					autoComplete="off"
					name="email"
					id="email"
					className="form__input"
					placeholder="Ingresa tu correo electrónico"
				/>
				<p className="form__error">{errors.email?.message}</p>

				<label className="form__label" htmlFor="password">
					Clave
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
