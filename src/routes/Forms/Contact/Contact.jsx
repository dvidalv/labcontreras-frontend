import { Form, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { contact } from '../../../utils/api';
import Tooltip from '../../../components/ToolTip/Tooltip';
import lpcrPic from '../../../images/nosotros-edificio.png';
import { useAppContext } from '../../../contexts/MyContext';
import WhatsApp from '../../../components/WhatsApp/WhatsApp';
import './contact.css';
import { useEffect, useState } from 'react';
import {
	APIProvider,
	Map as GoogleMap,
	AdvancedMarker,
	Pin,
	InfoWindow,
} from '@vis.gl/react-google-maps';

import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { MdOutlineAccessTime } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";

function Contact() {
	const [isOpen, setIsOpen] = useState(false);
	const position = {
		lat: 19.46041468707586,
		lng: -70.68062997202419,
	};
	const location = 'contact';
	const schema = z.object({
		email: z.string().email(),
		subject: z.string().min(3).max(50),
		message: z.string().min(10).max(500),
	});

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
		reset,
	} = useForm({
		defaultValues: {
			email: '',
			subject: '',
			message: '',
		},
		resolver: zodResolver(schema),
	});

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const navigation = useNavigate();

	const { showTooltip, setShowTooltip, message, setMessage, type, setType } =
		useAppContext();

	const onSubmit = async (data) => {
		const { email, subject, message } = data;
		try {
			const res = await contact(email, subject, message);
			if (res.status === 'success') {
				setShowTooltip(true);
				setType('success');
				setMessage('Mensaje enviado');
				reset();
			}
		} catch (error) {
			setShowTooltip(true);
			setType('error');
			setMessage('Ha ocurrido un error al enviar el mensaje');
			setError('root', {
				message: error.message,
			});
		}
	};

	return (
		<div className="contact-container">
		
				<div className="map-container">
				<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3761.8881627429405!2d-70.68325772346496!3d19.460388081824945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8eb1c50062fc15f1%3A0x439490309857aaff!2sLaboratorio%20de%20Patolog%C3%ADa%20Contreras%20Robledo!5e0!3m2!1ses-419!2sdo!4v1768152014927!5m2!1ses-419!2sdo" width="600" height="450" style={{border:0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
				</div>
		
			<div className="form-container">
				<h1>CONTÁCTANOS!</h1>
				<p>
					Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.
				</p>
				<Form
					id="contact-form"
					className="form"
					onSubmit={handleSubmit(onSubmit)}
					style={{
						marginBottom: '20px',
					}}
				>
					<input
						{...register('email')}
						className="form__input"
						placeholder="Dirección de correo electrónico"
					/>
					<p className="form__error">{errors.email && errors.email.message}</p>

					<input
						{...register('subject')}
						className="form__input"
						placeholder="Asunto de tu mensaje"
					/>
					<p className="form__error">
						{errors.subject && errors.subject.message}
					</p>

					<textarea
						style={{
							height: '100px',
							resize: 'none',
						}}
						{...register('message')}
						className="form__input"
						placeholder="Escribe tu mensaje aquí..."
					/>
					<p className="form__error">
						{errors.message && errors.message.message}
					</p>

					<button
						disabled={isSubmitting}
						type="submit"
						className="form__button"
					>
						{isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
					</button>
					{errors.root && <p className="form__error">{errors.root.message}</p>}
				</Form>
				{showTooltip && (
					<Tooltip
						message={message}
						type={type}
						location={location}
						className="tooltip--visible"
					/>
				)}
				{navigation.state === 'loading' && (
					<div
						id="details"
						className={navigation.state === 'loading' ? 'loading' : ''}
					>
						<p>Detalles</p>
					</div>
				)}
				<div className="horarios">
					<h2 className="horarios__title">Horarios de atención</h2>
					<div className="horarios__container">
						<MdOutlineAccessTimeFilled size={20} className="horarios__icon" />
						<p className="horarios__text">Lunes a Viernes: 8:00 am - 6:00 pm</p>
					</div>
					<div className="horarios__container">
						<MdOutlineAccessTime size={20} className="horarios__icon" />
						<p className="horarios__text">Sábado: 9:00 am - 12:00 pm</p>
					</div>
					<div className="horarios__container">
						<MdOutlineAccessTimeFilled size={20} className="horarios__icon" />
						<p className="horarios__text">Domingo: Cerrado</p>
					</div>
				</div>
			</div>
			<WhatsApp />
		</div>
	);
}

export default Contact;
