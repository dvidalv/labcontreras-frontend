import { createMedico } from '../../../utils/api';

export async function action({ request }) {
	const formData = await request.formData();
	// console.log(formData);
	const data = Object.fromEntries(formData);
	const medico = await createMedico(data);
	return {
		status: 303,
		mensaje: 'Medico creado',
		body: JSON.stringify(medico),
		headers: {
			location: `/medicos/${medico._id}`,
		},
	};
}
