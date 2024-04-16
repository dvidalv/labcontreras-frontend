import { Form, useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import avatarDoctor from '../../../images/avatarDoctor.svg';
import { useEffect, useState } from 'react';
import { useAppContext } from '../../../contexts/MyContext';
import './EditMedico.css';
import { editMedico } from '../../../utils/api';
import Tooltip from '../../../components/ToolTip/Tooltip';
import { uploadAvatar } from '../../../utils/api';

import Swal from 'sweetalert2';

const schema = z.object({
	nombre: z.string().min(3).max(50),
	apellido: z.string().min(3).max(50),
	email: z.string().email(),
	telefono: z.string().min(10).max(12),
	celular: z.string().min(10).max(12),
	especialidad: z.string().min(3).max(50),
});

function EditMedico() {

	const { id } = useParams();
	const navigate = useNavigate();
	const data = useLoaderData();
	const [medicoData, setMedicoData] = useState(data.medico || {});

	const {
		message,
		setMessage,
		setType,
		avatarUrl,
		setAvatarUrl,
		setMedicos,
		medicos,
	} = useAppContext();


	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting, isValid },
	} = useForm({
		defaultValues: {
			nombre: medicoData.nombre || '',
			apellido: medicoData.apellido || '',
			email: medicoData.email || '',
			telefono: medicoData.telefono || '',
			celular: medicoData.celular || '',
			especialidad: medicoData.especialidad || '',
		},
		resolver: zodResolver(schema),
		mode: 'onChange',
	});

	useEffect(() => {
		// Actualiza el estado si data.medico cambia
		setMedicoData(data.medico || {});
	}, [data.medico]);

		const handleOpenPopup = async () => {
			const { value: file } = await Swal.fire({
				title: "Selecciona tu imagen de perfil",
				input: "file",
				inputAttributes: {
					"accept": "image/*",
					"aria-label": "Upload your profile picture"
				},
				showCancelButton: true,
				confirmButtonText: 'Cargar',
				cancelButtonText: 'Cancelar',
				preConfirm: (file) => {
					if (file) {
						const reader = new FileReader();
						reader.readAsDataURL(file);
						return new Promise((resolve) => {
							reader.onload = async () => {

								const formData = new FormData();
								formData.append("image", file);
								try {
									const response = await uploadAvatar(formData);
									if (response.url) { 
										setAvatarUrl(response.url); 
										resolve();
									} else {
										Swal.showValidationMessage("No se pudo cargar la imagen");
										resolve();
									}
								} catch (error) {
									console.error("Error al cargar la imagen:", error);
									Swal.showValidationMessage(`Error al cargar: ${error.message}`);
									resolve();
								}
							};
						});
					}
				}
			});
		
			if (file) {
				Swal.fire({
						title: "Imagen cargada",
						imageUrl: URL.createObjectURL(file),
						imageAlt: "Imagen cargada",
						timer: 2000, // El popup se cerrará después de 3000 milisegundos (3 segundos)
						timerProgressBar: true, // Muestra una barra de progreso que indica el tiempo restante
						willClose: () => {
							// Código que se ejecutará cuando el popup se cierre
						}
				});
		}
		};

	const handleForm = async (data) => {
		console.log('data', data);
		try {
			data.url = avatarUrl;
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
		} catch (error) {
			console.error('Error al editar el médico:', error);
			setError('root', {
				message: error.message,
			});
		}
	};

	return (
		<div className="editMedico">
			<h2 className="editMedico__title">Editar Médico</h2>
			<Form
				className="editMedico__form"
				method="put"
				onSubmit={handleSubmit(handleForm)}
			>
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
						<p className="error">
							{errors.apellido && errors.apellido.message}
						</p>
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

				{/* <div className="form-group">
					<p className="label">Link de la imagen</p>
					<div className="input-group">
						<input
							{...register('url_v')}
							type="url"
							id="imagen"
							name="url_v"
							placeholder="Link de la imagen"
							disabled
						/>
						<p className="error">{errors.url && errors.url.message}</p>
						<input {...register('url')} type="hidden" name="url" />
					</div>
				</div> */}

				<div className="form-group">
					<p className="label">Teléfono</p>
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
						className={`button ${isSubmitting ? 'disabled' : ''}`}
						type="submit"
						disabled={isSubmitting || !isValid}
					>
						{isSubmitting ? 'Enviando...' : 'Guardar'}
					</button>
					<button
						type="button"
						onClick={() => {
							setAvatarUrl('');

							navigate(-1); // navegar hacia atras
						}}
					>
						{isSubmitting ? 'Cancelando...' : 'Cancelar'}
					</button>
					{errors.root && <p className="error">{errors.root.message}</p>}
				</div>
			</Form>
			{/* {isOpen && (
				<AvatarPopup
					onClose={handleCLosePopup}
					setIsOpen={setIsOpen}
					isOpen={isOpen}
					setAvatarUrl={setAvatarUrl}
				/>
			)} */}
			<div className="editMedico__avatar" onClick={handleOpenPopup}>
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
