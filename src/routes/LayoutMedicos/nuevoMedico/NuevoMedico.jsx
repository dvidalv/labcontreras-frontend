import { Form, useNavigate } from 'react-router-dom';
import './nuevoMedico.css';
import AvatarPopup  from '../../../components/AvatarPopup/AvatarPopup';
import { useState } from 'react';
import avatarDoctor from '../../../images/avatarDoctor.svg';

function NuevoMedico() {
	const [isOpen, setIsOpen] = useState(false)
	const navigate = useNavigate();

	const handleCLosePopup = () => {
		setIsOpen(false);
	};
	return (
		<div className="editMedico">
			<h2 className="editMedico__title">Agregar Medico</h2>
			<Form className="editMedico__form" action="/medicos/nuevo" method="post">
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
			{isOpen && <AvatarPopup onClose={handleCLosePopup} setIsOpen={setIsOpen} isOpen={isOpen} />}
			<div className="editMedico__avatar" onClick={() => setIsOpen(true)}>
				<img src={avatarDoctor} alt="Avatar" />
				<p>Subir Foto</p>
			</div>
		</div>
	);
}

export default NuevoMedico;
