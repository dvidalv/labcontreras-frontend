import { Form, useNavigate } from 'react-router-dom';
import './editMedico.css';

function EditMedico() {
	const navigate = useNavigate();
	return (
		<div className="editMedico">
			<h2 className="editMedico__title">Agregar Medico</h2>
			<Form className="editMedico__form" action="edit">
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
							name="correo"
							placeholder="Correo"
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
					<button type="submit">Guardar</button>
					<button type="button" 					onClick={() => {
						navigate(-1);
					}}>Cancelar</button>
				</div>

			</Form>
		</div>
	);
}

export default EditMedico;
