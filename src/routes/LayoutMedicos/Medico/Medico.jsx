import { Form, useLoaderData, useParams, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAppContext } from '../../../contexts/MyContext';
import avatarDoctor from '../../../images/avatarDoctor.svg';
import './medico.css';
import Swal from 'sweetalert2';

import { destroyMedico } from '../../../utils/api';

export default function Medico() {
	const { medicos, setMedicos } = useAppContext();
	const { id } = useParams();
	const { medico } = useLoaderData();
	const location = useLocation();
	const { mensaje } = location.state || {};

	const { handleSubmit } = useForm();

	const handleForm = async () => {
		Swal.fire({
			title: '¿Estás seguro de eliminar este medico?',
			text: 'No podrás revertir esto',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, eliminar',
		})
			.then((result) => {
				if (result.isConfirmed) {
					destroyMedico(id);
					setMedicos(medicos.filter((medico) => medico._id !== id));
				}
			})
			.then(() => {
				Swal.fire('Eliminado', 'El medico ha sido eliminado', 'success');
			});
	};

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
						// onSubmit={(event) => {
						// 	if (!confirm('Please confirm you want to delete this record.')) {
						// 		event.preventDefault();
						// 	}
						// }}
						onSubmit={handleSubmit(handleForm)}
					>
						<button type="submit">Eliminar</button>
						<div>{mensaje && <div>{mensaje}</div>}</div>
					</Form>
				</div>
			</div>
		</section>
	);
}
