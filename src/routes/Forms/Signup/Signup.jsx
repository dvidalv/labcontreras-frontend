import { Form, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import '../form.css';
import Tooltip from '../../../components/ToolTip/Tooltip';
import { useAppContext } from '../../../contexts/MyContext';
import { useState } from 'react';
import { registerAction } from '../../../utils/auth';

const schema = z.object({
	name: z.string().min(3).max(10),
	email: z.string().email(),
	password: z.string().min(6).max(12),
});

function Signup() {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting, isValid },
	} = useForm({
		defaultValues: {
			name: '',
			email: '',
			password: '',
		},
		resolver: zodResolver(schema),
		mode: 'onChange',
	});

	const {
		showTooltip,
		setShowTooltip,
		message,
		setMessage,
		type,
		setType,
		location,
		setLocation,
	} = useAppContext();

	// const [isSubmitting, setIsSubmitting] = useState(false);

	const handleForm = async (data) => {
		// console.log(res);
		try {
			const res = await registerAction(data);
			if (res.status === 'success') {
				setMessage(res.message);
				setType('success');
				setShowTooltip(true);
				setLocation('signup');
			} else {
				setMessage(res.message);
				setType('error');
				setShowTooltip(true);
				setLocation('signup');
			}
		} catch (error) {
			if(error.toString().includes('409')){
				setError('root', {
					message: 'El correo ya existe',
				});
			}else{
				setError('root', {
					message: 'Ha ocurrido un error',
				});
			}
		}
	};

	return (
		<div className="form-container">
			<h1 className="form-container__title">Crear cuenta</h1>
			<Form className="form" onSubmit={handleSubmit(handleForm)}>
				<label className="form__label" htmlFor="name">
					Nombre
				</label>
				<input
					type="text"
					id="name"
					name="name"
					className="form__input"
					placeholder="Ingresa tu nombre"
					{...register('name')}
				/>
				<p className="form__error">{errors.name?.message}</p>

				<label className="form__label" htmlFor="email">
					Correo electrónico
				</label>
				<input
					id="email"
					name="email"
					required={true}
					className="form__input"
					placeholder="Ingresa tu correo electrónico"
					{...register('email')}
				/>
				<p className="form__error">{errors.email?.message}</p>

				<label className="form__label" htmlFor="password">
					Clave
				</label>
				<input
					type="password"
					id="password"
					name="password"
					className="form__input"
					placeholder="Ingresa tu clave"
					{...register('password')}
				/>
				<p className="form__error">{errors.password?.message}</p>

				<div className="form__links form__link_create-account">
					<Link to="/signin">Ya tienes cuenta?</Link>
				</div>

				<button className={`form__button ${!isValid || isSubmitting ? 'disabled' : ''}`} type="submit">
					{isSubmitting ? 'Enviando...' : 'Enviar'}
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

export default Signup;
