import { Form, useLoaderData, useNavigate, useParams } from 'react-router-dom';
import './nuevoMedico.css';

function EditMedico() {
	const { id } = useParams();
	const navigate = useNavigate();
	const { medico } = useLoaderData();
	return (
		<div className="editMedico">
			<h2 className="editMedico__title">Editar Medico</h2>
			<Form className="editMedico__form" action={`/medicos/${id}/edit`} method="put">
				<div className="form-group">
					<p className="label">Nombre</p>
					<div className="input-group">
						<input
							type="text"
							id="nombre"
							name="nombre"
							placeholder="Nombre"
							defaultValue={medico.nombre}
						/>
						<input
							type="text"
							id="apellido"
							name="apellido"
							placeholder="Apellido"
							defaultValue={medico.apellido}
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
							defaultValue={medico.email}
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
							defaultValue={medico.password}
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
							defaultValue={medico.telefono}
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
							defaultValue={medico.celular}
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
							defaultValue={medico.especialidad}
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
		</div>
	);
}

export default EditMedico;
