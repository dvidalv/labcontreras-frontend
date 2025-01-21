import { useForm } from 'react-hook-form';
import { Form, useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import './Sugerencias.css';
import { sugerencias } from '../../utils/api';
import background1 from '../../images/background-1.jpg';
import background2 from '../../images/background-2.jpg';
import background3 from '../../images/background-3.jpg';
import background4 from '../../images/background-4.jpg';
import background5 from '../../images/background-5.jpg';

import 'animate.css';

function getRandomNumber() {
	return Math.floor(Math.random() * 5) + 1;
}
const number = getRandomNumber();

// console.log(number);

const sugerenciaSchema = z.object({
	mensaje: z
		.string({
			required_error: 'El mensaje es requerido',
		})
		.min(10, 'El mensaje debe tener al menos 10 caracteres')
		.max(500, 'El mensaje no puede exceder los 500 caracteres')
		.trim(),
});

function Sugerencias() {
	const navigate = useNavigate();
	const [showBanner, setShowBanner] = useState(false);
	const [message, setMessage] = useState('');
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: zodResolver(sugerenciaSchema),
	});

	const timeoutRef = useRef(null);

	const onSubmit = async (data) => {
		try {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}

			const res = await sugerencias(data);
			const { mensaje } = res;
			setMessage(mensaje);
			setShowBanner(true);

			timeoutRef.current = setTimeout(() => {
				setShowBanner(false);
				navigate('/');
			}, 5000);
		} catch (error) {
			console.error('Error al enviar sugerencia:', error);
		}
	};

	let style = {
		backgroundImage: `url(${
			number === 1
				? background1
				: number === 2
				? background2
				: number === 3
				? background3
				: number === 4
				? background4
				: background5
		})`,
		backgroundSize: 'cover',
		backgroundPosition: 'top',
		backgroundRepeat: 'no-repeat',
	};

	return (
		<div className="sugerencias-container" style={style}>
			{showBanner && (
				<div className="success-banner">
					<p style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>
						{message}
					</p>
				</div>
			)}
			<h2 className="animate__animated animate__backInDown">
				Envíanos tus sugerencias
			</h2>
			<Form onSubmit={handleSubmit(onSubmit)} className="form">
				<div className="form-group">
					<textarea
						{...register('mensaje')}
						placeholder="Escribe tu mensaje aquí..."
						rows={6}
						className={errors.mensaje ? 'error' : ''}
					/>
					{errors.mensaje && (
						<span className="error-message">{errors.mensaje.message}</span>
					)}
				</div>
				<button className="button" type="submit" disabled={isSubmitting}>
					{isSubmitting ? 'Enviando...' : 'Enviar sugerencia'}
				</button>
			</Form>
		</div>
	);
}

export default Sugerencias;
