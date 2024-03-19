import { Form, useLoaderData, useParams } from 'react-router-dom';
import avatarDoctor from '../../../images/avatarDoctor.svg';
import './medico.css';

export default function Medico() {
	const { id } = useParams();
	const { medico } = useLoaderData();
	return (
		<section className="medico">
			<div className="medico__imagen">
				<img src={medico.url ? medico.url : avatarDoctor} alt="Medico" />
			</div>
			<div className="medico__info">
				<div>
					<h3>{`${medico.nombre} ${medico.apellido}`}</h3>
					<p>
						Correo:
						<a href="mailto:correo@correo.com">{medico.email}</a>
					</p>
					<p>{`Teléfono: ${medico.telefono}`}</p>
					<p>{`Celular: ${medico.celular}`}</p>
				</div>
				<div className="medico__acciones">
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
