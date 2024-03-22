import { Form, useNavigate } from 'react-router-dom';
import { createMedico } from '../../../utils/api';
import { useAppContext } from '../../../contexts/MyContext';
import './nuevoMedico.css';
import ToolTip from '../../../components/ToolTip/Tooltip.jsx';

function NuevoMedico() {
	const navigate = useNavigate();
	const {
		medicos,
		setMedicos,
		message,
		setMessage,
		type,
		setType,
		setError,
		location,
		setLocation,
		showTooltip,
		setShowTooltip,
	} = useAppContext();

	const handleSubmit = async (e) => {
		e.preventDefault();

		// FormData es una clase que nos permite crear un objeto clave/valor a partir de un formulario
		const formData = new FormData(e.target);
		const data = Object.fromEntries(formData);
		// console.log(data);
		try {
			// Llamar a la API para crear un nuevo médico
			const response = await createMedico(data);
			if (response.medico) {
				setMedicos([...medicos, response.medico]);
				navigate('/medicos'); // Redirigir al usuario a la lista de médicos
			} else {
				if (response.error === 'E11000') {
					setShowTooltip(true);
					setMessage('El correo ya existe');
					setType('error');
					setError(true);
					setLocation('nuevoMedico');
				}
				if (response.message === 'Validation failed') {
					setShowTooltip(true);
					setMessage('Error de Validación. Revise los datos ingresados');
					setType('error');
					setError(true);
					setLocation('nuevoMedico');
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
			<Form className="editMedico__form" onSubmit={handleSubmit}>
				<div className="form-group">
					<p className="label">Nombre</p>
					<div className="input-group">
						<input type="text" id="nombre" name="nombre" placeholder="Nombre" />
						<input
							type="text"
							id="apellido"
							name="apellido"
							placeholder="Apellido"
						/>
					</div>
				</div>

				<div className="form-group">
					<p className="label">Correo</p>
					<div className="input-group">
						<input
							type="email"
							id="correo"
							name="email"
							placeholder="Correo"
							required
							pattern="^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$"
						/>
					</div>
				</div>

				{/* <div className="form-group">
					<p className="label">Link</p>
					<div className="input-group">
						<input
							type="url"
							id="imagen"
							name="url"
							placeholder="Link de la imagen"
							disabled
						/>
					</div>
				</div> */}

				<div className="form-group">
					<p className="label">Clave</p>
					<div className="input-group">
						<input
							type="password"
							id="password"
							name="password"
							placeholder="Clave"
							minLength="6"
							required
						/>
					</div>
				</div>

				<div className="form-group">
					<p className="label">Telefono</p>
					<div className="input-group">
						<input
							type="tel"
							id="telefono"
							name="telefono"
							placeholder="Telefono"
						/>
					</div>
				</div>

				<div className="form-group">
					<p className="label">Celular</p>
					<div className="input-group">
						<input
							type="tel"
							id="celular"
							name="celular"
							placeholder="Celular"
						/>
					</div>
				</div>

				<div className="form-group">
					<p className="label">Especialidad</p>
					<div className="input-group">
						<input
							type="text"
							id="especialidad"
							name="especialidad"
							placeholder="Especialidad"
						/>
					</div>
				</div>
				<div className="form-group__buttons">
					<button type="submit">Crear</button>
					<button
						type="button"
						onClick={() => {
							navigate(-1); // navegar hacia atras
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
