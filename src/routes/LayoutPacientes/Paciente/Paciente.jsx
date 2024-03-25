import { Form } from 'react-router-dom';
import './paciente.css';
import {useAppContext} from '../../../contexts/MyContext';


function Paciente() {

	const { sharedState, updateSharedState } = useAppContext();


	return (
		<section className="paciente">
			<div className="paciente__imagen">
				<img src="https://via.placeholder.com/150" alt="Paciente" />
			</div>
			<div className="paciente__info">
				<div>
					<h3>Información del Paciente</h3>
					<p>Edad: 25 años</p>
					<p>Sexo: Masculino</p>
					<p>
						Correo:
						<a href="mailto:correo@correo.com">correo@correo.com</a>
					</p>
					<p>Teléfono: 1234567890</p>
				</div>
				<div className="paciente__acciones">
					<Form action="edit">
						<button type="submit">
							Editar
						</button>
					</Form>
					<Form
						action="destroy"
						method="post"
						onSubmit={(event) => {
							if (!confirm('Please confirm you want to delete this record.')) {
								event.preventDefault();
							}
						}}
					>
						<button type="submit">Eliminar</button>
					</Form>
				</div>
			</div>
		</section>
	);
}

export default Paciente;
