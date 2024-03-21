import { Form, useNavigate } from 'react-router-dom';
import './nuevoMedico.css';

function NuevoMedico() {
	const navigate = useNavigate();

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
							defaultValue="David"
						/>
						<input
							type="text"
							id="apellido"
							name="apellido"
							placeholder="Apellido"
							defaultValue="Vidal"
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
							defaultValue="david.vidal@medicapp.com"
						/>
					</div>
				</div>

				<div className="form-group">
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
							defaultValue="1234567"
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
							defaultValue="0987654321"
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
							defaultValue="Cardiologia"
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
		</div>
	);
}

export default NuevoMedico;
