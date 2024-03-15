import { Form, useLoaderData, useNavigate } from 'react-router-dom';
import './medico.css';

export default function Medico() {
	const { medico } = useLoaderData();
	return (
		<section className="paciente">
			<div className="paciente__imagen">
				<img src="https://via.placeholder.com/150" alt="Paciente" />
			</div>
			<div className="paciente__info">
				<div>
					<h3>{medico.nombre}</h3>
					<p>
						Correo:
						<a href="mailto:correo@correo.com">correo@correo.com</a>
					</p>
					<p>Teléfono: 1234567890</p>
					<p>Celular: 1234567890</p>
				</div>
				<div className="paciente__acciones">
					<Form action="edit">
						<button type="submit">Editar</button>
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
