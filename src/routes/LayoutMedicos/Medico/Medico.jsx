import { Form, useLoaderData, useParams } from 'react-router-dom';
import avatarDoctor from '../../../images/avatarDoctor.svg';

export default function Medico() {
	const { id } = useParams();
	const { medico } = useLoaderData();
	return (
		<section className="paciente">
			<div className="paciente__imagen">
				<img src={medico.url ? medico.url : avatarDoctor} alt="Paciente" />
			</div>
			<div className="paciente__info">
				<div>
					<h3>{`${medico.nombre} ${medico.apellido}`}</h3>
					<p>
						Correo:
						<a href="mailto:correo@correo.com">{medico.email}</a>
					</p>
					<p>{`Teléfono: ${medico.telefono}`}</p>
					<p>{`Celular: ${medico.celular}`}</p>
				</div>
				<div className="paciente__acciones">
					<Form action="edit">
						<button type="submit">Editar</button>
					</Form>
					<Form
						action={`/medicos/${id}/destroy`}
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
