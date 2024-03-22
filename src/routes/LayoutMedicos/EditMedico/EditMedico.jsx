import { Form, useLoaderData, useNavigate, useParams } from 'react-router-dom';
import AvatarPopup from '../../../components/AvatarPopup/AvatarPopup';
import avatarDoctor from '../../../images/avatarDoctor.svg';
import { useEffect, useState } from 'react';
import { useAppContext } from '../../../contexts/MyContext';
import './EditMedico.css';
import { editMedico } from '../../../utils/api';
import Tooltip from '../../../components/ToolTip/Tooltip';

function EditMedico() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = useState(false);
// Estado inicial como cadena vacía
	const {
		message,
		setMessage,
		setType,
		medico,
		setMedico,
		avatarUrl,
		setAvatarUrl,
		setMedicos,
		medicos,
	} = useAppContext();
	
	useEffect(() => {
		// Este efecto no hace nada por sí mismo, pero se re-ejecutará cuando `medicos` cambie.
	}, [medicos]);

	// console.log(avatarUrl);

	// console.log(message);

	const handleCLosePopup = () => {
		setIsOpen(false);
	};
	// console.log(isOpen);
	const handleSubmint = async (event) => {
		event.preventDefault();
		const formData = new FormData(event.target);
		const data = Object.fromEntries(formData);
		// console.log('data', data);
		const response = await editMedico(id, data);
		setMedicos(
			medicos.map((medico) => {
					return medico._id === id ? {...medico, ...response.medico} : medico;
			})
	);
		if (response.error) {
			setMessage(response.error);
			setType(!response.success ? 'false' : 'error');
		} else {
			navigate(`/medicos/${id}`);
		}
	};

	const { medico: medicoData } = useLoaderData();

	useEffect(() => {
		setMedico(medicoData);
	}, [medicoData, setMedico]);

	return (
		<div className="editMedico">
			<h2 className="editMedico__title">Editar Médico</h2>
			<Form className="editMedico__form" method="put" onSubmit={handleSubmint}>
				<div className="form-group">
					<p className="label">Nombre</p>
					<div className="input-group">
						<input
							type="text"
							id="nombre"
							name="nombre"
							placeholder="Nombre"
						/>
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

				<div className="form-group">
					<p className="label">Link de la imagen</p>
					<div className="input-group">
						<input
							type="url"
							id="imagen"
							name="url"
							placeholder="Link de la imagen"
							pattern="https?://.+\.(png|jpg|jpeg|gif|svg)$"
							disabled
						/>
						<input
							type="hidden"
							name="url"
						/>
					</div>
				</div>

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
					<p className="label">Teléfono</p>
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
					<button type="submit">Guardar</button>
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
			{isOpen && (
				<AvatarPopup
					onClose={handleCLosePopup}
					setIsOpen={setIsOpen}
					isOpen={isOpen}
					setAvatarUrl={setAvatarUrl}
				/>
			)}
			<div className="editMedico__avatar" onClick={() => setIsOpen(true)}>
				<img src={avatarUrl ? avatarUrl : avatarDoctor} alt="Avatar" />
				<p>Subir Foto</p>
			</div>
			{message && (
				<Tooltip
					type="error"
					message={message}
					location="editMedico"
					setMessage={setMessage}
					className="tooltip--visible"
				/>
			)}
		</div>
	);
}

export default EditMedico;
