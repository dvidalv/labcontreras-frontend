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
	const data = useLoaderData();
	const [medicoData, setMedicoData] = useState(data.medico || {});

	const {
		message,
		setMessage,
		setType,
		setMedico,
		avatarUrl,
		setAvatarUrl,
		setMedicos,
		medicos,
	} = useAppContext();

	console.log(avatarUrl);

	useEffect(() => {
		// Actualiza el estado si data.medico cambia
		setMedicoData(data.medico || {});
	}, [data.medico]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setMedicoData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

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
				return medico._id === id ? { ...medico, ...response.medico } : medico;
			})
		);
		setAvatarUrl('');
		if (response.error) {
			setMessage(response.error);
			setType(!response.success ? 'false' : 'error');
		} else {
			navigate(`/medicos/${id}`);
		}
	};

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
							value={medicoData.nombre || ''}
							onChange={handleChange}
						/>
						<input
							type="text"
							id="apellido"
							name="apellido"
							placeholder="Apellido"
							value={medicoData.apellido || ''}
							onChange={handleChange}
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
							value={medicoData.email || ''}
							onChange={handleChange}
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
							value={avatarUrl || medicoData.url || ''}
							onChange={handleChange}
							disabled
						/>
						<input
							type="hidden"
							name="url"
							value={avatarUrl || medicoData.url || ''}
							onChange={handleChange}
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
							value={medicoData.password || ''}
							onChange={handleChange}
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
							value={medicoData.telefono || ''}
							onChange={handleChange}
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
							value={medicoData.celular || ''}
							onChange={handleChange}
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
							value={medicoData.especialidad || ''}
							onChange={handleChange}
						/>
					</div>
				</div>
				<div className="form-group__buttons">
					<button type="submit">Guardar</button>
					<button
						type="button"
						onClick={() => {
							setAvatarUrl('');
							console.log('papa');
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
