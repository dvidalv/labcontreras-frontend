import { Form, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createMedico } from '../../../utils/api';
import { useAppContext } from '../../../contexts/MyContext';
import './nuevoMedico.css';
import ToolTip from '../../../components/ToolTip/Tooltip.jsx';

const schema = z.object({
	nombre: z.string().min(3).max(50),
	apellido: z.string().min(3).max(50),
	email: z.string().email(),
	telefono: z.string().min(10).max(10),
	celular: z.string().min(10).max(10),
	especialidad: z.string().min(3).max(50),
});

function NuevoMedico() {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting, isValid },
	} = useForm({
		defaultValues: {
			nombre: '',
			apellido: '',
			email: '',
			telefono: '',
			celular: '',
			especialidad: '',
		},
		resolver: zodResolver(schema),
		mode: 'onChange',
	});

	const navigate = useNavigate();
	const {
		medicos,
		setMedicos,
		message,
		setMessage,
		type,
		setType,
		location,
		setLocation,
		showTooltip,
		setShowTooltip,
	} = useAppContext();

	const handleForm = async (data) => {
		try {
			const response = await createMedico(data);
			if (response.medico) {
				setMedicos([...medicos, response.medico]);
				navigate('/medicos');
			} else {
				if (response.error === 'E11000') {
					setShowTooltip(true);
					setMessage('El correo ya existe');
					setType('error');
	
					setLocation('nuevoMedico');
					return
				}
				if (response.message === 'Validation failed') {
					setShowTooltip(true);
					setMessage('Error de Validación. Revise los datos ingresados');
					setType('error');
					setLocation('nuevoMedico');
					return;
				}
				return;
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="editMedico">
			<h2 className="editMedico__title">Agregar Medico</h2>
			<Form className="editMedico__form" onSubmit={handleSubmit(handleForm)}>
				<div className="form-group">
					<p className="label">Nombre</p>
					<div className="input-group">
						<input
							{...register('nombre')}
							type="text"
							id="nombre"
							name="nombre"
							placeholder="Nombre"
						/>
						<p className="error">{errors.nombre && errors.nombre.message}</p>
					</div>
				</div>
				<div className="form-group">
					<p className="label">Apellido</p>
					<div className="input-group">
						<input
							{...register('apellido')}
							type="text"
							id="apellido"
							name="apellido"
							placeholder="Apellido"
						/>
						<p className="error">{errors.apellido && errors.apellido.message}</p>
					</div>
				</div>

				<div className="form-group">
					<p className="label">Correo</p>
					<div className="input-group">
						<input
							{...register('email')}
							type="email"
							id="correo"
							name="email"
							placeholder="Correo"
						/>
						<p className="error">{errors.email && errors.email.message}</p>
					</div>
				</div>

				<div className="form-group">
					<p className="label">Telefono</p>
					<div className="input-group">
						<input
							{...register('telefono')}
							type="tel"
							id="telefono"
							name="telefono"
							placeholder="Telefono"
						/>
						<p className="error">
							{errors.telefono && errors.telefono.message}
						</p>
					</div>
				</div>

				<div className="form-group">
					<p className="label">Celular</p>
					<div className="input-group">
						<input
							{...register('celular')}
							type="tel"
							id="celular"
							name="celular"
							placeholder="Celular"
						/>
						<p className="error">{errors.celular && errors.celular.message}</p>
					</div>
				</div>

				<div className="form-group">
					<p className="label">Especialidad</p>
					<div className="input-group">
						<input
							{...register('especialidad')}
							type="text"
							id="especialidad"
							name="especialidad"
							placeholder="Especialidad"
						/>
						<p className="error">
							{errors.especialidad && errors.especialidad.message}
						</p>
					</div>
				</div>
				<div className="form-group__buttons">
					<button
						className={`button ${!isValid || isSubmitting ? 'disabled' : ''}`}
						disabled={!isValid || isSubmitting}
						type="submit"
					>
						Crear
					</button>
					<button
						type="button"
						onClick={() => {
							navigate(-1);
						}}
					>
						Cancelar
					</button>
				</div>
			</Form>
			{showTooltip && (
				<ToolTip
					message={message}
					type={type}
					location={location}
					className="tooltip--visible"
					setMessage={setMessage}
				/>
			)}
		</div>
	);
}

export default NuevoMedico;
