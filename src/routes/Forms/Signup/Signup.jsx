import { Form, Link } from 'react-router-dom';
import '../form.css';
import Tooltip from '../../../components/ToolTip/Tooltip';
import { useAppContext } from '../../../contexts/MyContext';
import { useState } from 'react';
import { registerAction } from '../../../utils/auth';

function Signup() {
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

	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const res = await registerAction(formData);

		if (res.status === 'success') {
			console.log(1);
			setMessage(res.message);
			setType('success');
			setShowTooltip(true);
		} else {
			console.log(2);
			setMessage(res.message);
			setType('error');
			setShowTooltip(true);
			setLocation('signup');
		}
		setIsSubmitting(true);
	};

	return (
		<div className="form-container">
			<h1 className="form-container__title">Crear cuenta</h1>
			<Form className="form" onSubmit={handleSubmit}>
				<label className="form__label" htmlFor="name">
					Nombre
				</label>
				<input
					type="text"
					id="name"
					name="name"
					required={true}
					className="form__input"
					placeholder="Ingresa tu nombre"
				/>

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
					type="password"
					id="password"
					name="password"
					required={true}
					className="form__input"
					placeholder="Ingresa tu clave"
				/>

				<div className="form__links">
					<Link to="/signin" className="form__link">
						Ya tienes cuenta?
					</Link>
				</div>

				<button type="submit" className="form__button" disabled={isSubmitting}>
					{isSubmitting ? 'Enviando...' : 'Enviar'}
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

export default Signup;
