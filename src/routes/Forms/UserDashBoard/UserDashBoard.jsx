import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppContext } from '../../../contexts/MyContext';
import './UserDashBoard.css';
import avatar from '../../../images/avatar.svg';
import { uploadAvatar } from '../../../utils/api';
import Swal from 'sweetalert2';
import { updateUser } from '../../../utils/api';

const schema = z.object({
	name: z.string().min(3).max(30),
	email: z.string().email(),
	role: z.string().min(3).max(10),
	tel: z.string().min(10).max(12),
});

function UserDashBoard() {
	const { setUser, user, avatarUrl, setAvatarUrl } = useAppContext();

	const {
		register,
		handleSubmit,
		setError,
		reset,
		formState: { errors, isSubmitting, isValid },
	} = useForm({
		defaultValues: {
			name: user.name || '',
			email: user.email || '',
			tel: user.tel || '',
			role: user.role || '',
		},
		resolver: zodResolver(schema),
		mode: 'onChange',
	});

	async function handleForm(data) {
		data = { ...data, _id: user._id, url: avatarUrl };
		const { name, email, tel, role, _id, url } = data;
		try {
			const response = await updateUser({ name, email, tel, role, _id, url });
			setUser({ ...user, ...response.user });
			if (!response.user) {
				setError('root', {
					type: 'manual',
					message: 'No se pudo actualizar el usuario',
				});
				return;
			}
		} catch (err) {
			console.error(err);
			setError('root', {
				type: 'manual',
				message: 'Ha ocurrido un error al intentar actualizar el usuario',
			});
		} finally {
			reset({
				name: '',
				email: '',
				tel: '',
				role: '',
			});
			Swal.fire({
				icon: 'success',
				title: 'Usuario actualizado',
				showConfirmButton: false,
				timer: 1500,
			});
		}
	}

	const handleOpenPopup = async () => {
		const { value: file } = await Swal.fire({
			title: 'Selecciona tu imagen de perfil',
			input: 'file',
			inputAttributes: {
				accept: 'image/*',
				'aria-label': 'Selecciona tu imagen de perfil',
			},
			showCancelButton: true,
			confirmButtonText: 'Cargar',
			cancelButtonText: 'Cancelar',
			preConfirm: (file) => {
				//
				if (file) {
					const reader = new FileReader(); // Crea un objeto FileReader
					reader.readAsDataURL(file);
					return new Promise((resolve) => {
						reader.onload = async () => {
							const formData = new FormData();
							formData.append('image', file);
							try {
								const response = await uploadAvatar(formData);
								if (response.url) {
									setAvatarUrl(response.url);
									resolve(); // Resuelve la promesa
								} else {
									Swal.showValidationMessage('No se pudo cargar la imagen');
									resolve();
								}
							} catch (error) {
								console.error('Error al cargar la imagen:', error);
								Swal.showValidationMessage(`Error al cargar: ${error.message}`);
								resolve();
							}
						};
					});
				}
			},
		});

		Swal.fire({
			title: 'Imagen cargada',
			imageUrl: URL.createObjectURL(file),
			imageAlt: 'Imagen cargada',
			timer: 2000, // El popup se cerrará después de 3000 milisegundos (3 segundos)
			timerProgressBar: true, // Muestra una barra de progreso que indica el tiempo restante
			willClose: () => {
				// Código que se ejecutará cuando el popup se cierre
			},
		});
	};

	return (
		<div className="dashboard-container">
			<div className="user_dashboard">
				<div className="section user_dashboard-container">
					<h2>Dashboard</h2>
					<div
						className={`user_dashboard-avatar ${
							avatarUrl ? 'user_dashboard-avatar-selected' : ''
						}`}
						onClick={handleOpenPopup}
					>
						{avatarUrl ? (
							<img src={avatarUrl} alt="avatar" />
						) : (
							<img src={avatar} alt="avatar" />
						)}
					</div>
					<form
						className="user_dashboard-form"
						onSubmit={handleSubmit(handleForm)}
					>
						<input
							type="text"
							name="name"
							placeholder="Nombre"
							{...register('name')}
						/>
						<p className="error">{errors.name && errors.name.message}</p>

						<select {...register('role')}>
							<option defaultChecked disabled value="">
								Role
							</option>
							<option value="user">User</option>
							<option value="admin">Administrador</option>
							<option value="medico">Médico</option>
							<option value="guest">Invitado</option>
						</select>
						<p className="error">{errors.role && errors.role.message}</p>

						<input placeholder="Email" {...register('email')} />
						<p className="error">{errors.email && errors.email.message}</p>

						<input placeholder="Telefono" {...register('tel')} />
						<p className="error">{errors.tel && errors.tel.message}</p>

						<button
							className={`user_dashboard-form-button ${
								!isValid || isSubmitting ? 'disabled' : ''
							}`}
							disabled={!isValid || isSubmitting}
							type="submit"
						>
							{isSubmitting ? 'Enviando...' : 'Enviar'}
						</button>
						{errors.root && <p className="error">{errors.root.message}</p>}
					</form>
				</div>

				<div className="section medicos__white-list-container">
					<h2>Médicos con acceso</h2>
					<table className="medicos__white-list">
						<thead>
							<tr className="medicos__white-list-header columnas">
								<th>Nombre</th>
								<th>Teléfono</th>
								<th>Email</th>
							</tr>
						</thead>
						<tbody>
							<tr className="columnas contenido-tabla">
								<td className="columna columna-1">Dr. Juan J. Bloise</td>
								<td className="columna columna-2">123-456-7890</td>
								<td className="columna columna-3">juan.perez@example.com</td>
							</tr>
							<tr className="columnas contenido-tabla">
								<td className="columna columna-1">Dr. Juan J. Bloise</td>
								<td className="columna columna-2">123-456-7890</td>
								<td className="columna columna-3">juan.perez@example.com</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default UserDashBoard;
