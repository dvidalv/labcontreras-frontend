import { Form, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { contact } from '../../../utils/api';
import Tooltip from '../../../components/ToolTip/Tooltip';
import lpcrPic from '../../../images/nosotros-edificio.png';
import { useAppContext } from '../../../contexts/MyContext';
import './contact.css';
import { useEffect, useState } from 'react';
import {
	APIProvider,
	Map as GoogleMap,
	AdvancedMarker,
	Pin,
	InfoWindow,
} from '@vis.gl/react-google-maps';

function Contact() {
	const [isOpen, setIsOpen] = useState(false);
	const position = {
		lat: 19.460539803163936,
		lng: -70.68068279789057,
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
			<APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API}>
				<div className="map-container">
					<GoogleMap
						id="map"
						zoom={18}
						center={position}
						mapId={import.meta.env.VITE_MAP_ID}
						options={{
							gestureHandling: 'greedy',
						}}
					>
						<AdvancedMarker position={position} onClick={() => setIsOpen(true)}>
							<Pin
								background={'purple'}
								borderColor={'black'}
								glyphColor={'red'}
							/>
						</AdvancedMarker>
						{isOpen && (
							<InfoWindow
								position={position}
								onClose={() => setIsOpen(false)}
								options={{
									opacity: 0.5,
								}}
								style={{
									backgroundColor: 'white',
									borderRadius: '10px',
									padding: '10px',
									color: 'black',
									width: '150px',
									height: '180px',
								}}
							>
								<a
									href="https://maps.app.goo.gl/rTL6Gqw5wddR9xNK8"
									target="_blank"
									rel="noopener noreferrer"
									title="Laboratorio de Patología Contreras Robledo"
								>
									<div
										style={{
											width: '100%',
											height: '100px',
											color: 'black',
											backgroundImage: `url(${lpcrPic})`,
											backgroundSize: 'cover',
											backgroundPosition: 'center',
											backgroundRepeat: 'no-repeat',
											borderRadius: '10px',
										}}
									></div>
								</a>
								<p>Laboratorio de Patología Contreras Robledo</p>
							</InfoWindow>
						)}
					</GoogleMap>
				</div>
			</APIProvider>
			<div className="form-container">
				<h1>CONTCTANOS</h1>
				<p>Si tienes alguna duda o necesitas ayuda, no dudes en contactarnos</p>
				<Form
					id="contact-form"
					className="form"
					onSubmit={handleSubmit(onSubmit)}
				>
					<input
						{...register('email')}
						className="form__input"
						placeholder="Direccion de correo electronico"
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
						placeholder="Escribe tu mensaje aqui..."
					/>
					<p className="form__error">
						{errors.message && errors.message.message}
					</p>

					<button
						disabled={isSubmitting}
						type="submit"
						className="form__button"
					>
						{isSubmitting ? 'Enviando...' : 'Enviar'}
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
			</div>
		</div>
	);
}

export default Contact;
