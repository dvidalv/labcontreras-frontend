import { Form, useNavigate } from 'react-router-dom';
import './medico.css';
import { useAppContext } from '../../../contexts/MyContext';
import API_URL from '../../../utils/constants';
import { checkToken } from '../../../utils/auth';
import { useEffect } from 'react';
// import { medicos } from '../../../utils/api';

export async function loader({params, context}) {
	const response = await fetch(`https://api.example.com/medicos/${params.id}`);
	const data = await response.json();
	return {
		props: {
			medico: data,
		},
	};
}

export default function Medico() {
	return (
		<section className="paciente">
			<div className="paciente__imagen">
				<img src="https://via.placeholder.com/150" alt="Paciente" />
			</div>
			<div className="paciente__info">
				<div>
					<h3>Nommbre del Medico</h3>
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
