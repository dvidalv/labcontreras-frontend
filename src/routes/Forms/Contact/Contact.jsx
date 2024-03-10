import { Form } from 'react-router-dom';
import {contact} from '../../../utils/api';

function Contact() {
	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const email = formData.get('email');
		const subject = formData.get('subject');
		const message = formData.get('message');

		contact(email, subject, message).then((res) => {
			console.log(res);
		});
	};

	return (
		<div className="form-container">
			<h1>Contactanos</h1>
			<p>Si tienes alguna duda o necesitas ayuda, no dudes en contactarnos</p>
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
					placeholder="Direccion de correo electronico"
				/>

				<label className="form__label" htmlFor="subject">
					Asunto
				</label>
				<input
					type="text"
					id="subject"
					name="subject"
					required={true}
					className="form__input"
					placeholder="Asunto de tu mensaje"
					defaultValue="Contacto"
				/>

				<label className="form__label" htmlFor="message">
					Message
				</label>
				<textarea
					id="message"
					name="message"
					required={true}
					className="form__input"
					placeholder="Escribe tu mensaje aqui..."
				/>

				<button type="submit" className="form__button">
					Enviar
				</button>
			</Form>
		</div>
	);
}

export default Contact;
