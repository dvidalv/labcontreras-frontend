import { Form, useNavigate } from 'react-router-dom';
import { contact } from '../../../utils/api';
import Tooltip from '../../../components/ToolTip/Tooltip';
import { useAppContext } from '../../../contexts/MyContext';
import Map from '../../../components/Map/Map';
import './contact.css';

function Contact() {
	const location = 'contact';

	const resetform = () => {
		document.getElementById('contact-form').reset();
	};

	const navigation = useNavigate();

	const { showTooltip, setShowTooltip, message, setMessage, type, setType } =
		useAppContext();

	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const email = formData.get('email');
		const subject = formData.get('subject');
		const message = formData.get('message');

		contact(email, subject, message).then((res) => {
			if (res.status === 'success') {
				setShowTooltip(true);
				setType('success');
				setMessage('Mensaje enviado');
				resetform();
			} else {
				setShowTooltip(true);
				setType('error');
				setMessage('Ha ocurrido un error al enviar el mensaje');
			}
		});
	};

	return (
		<div className="contact-container">
			<Map />
			<div className="form-container">
				<h1>Contáctanos</h1>
				<p>Si tienes alguna duda o necesitas ayuda, no dudes en contactarnos</p>
				<Form id="contact-form" className="form" onSubmit={handleSubmit}>
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
					/>

					<label className="form__label" htmlFor="message">
						Mensaje
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
				{showTooltip && (
					<Tooltip message={message} type={type} location={location} className='tooltip--visible' />
				)}
				{navigation.state === 'loading' && (
					<div
						id="details"
						className={navigation.state === 'loading' ? 'loading' : ''}
					>
						<p>Detalles</p>
					</div>
				)}
			</div>
		</div>
	);
}

export default Contact;
