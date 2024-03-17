import { redirect } from 'react-router-dom';
import { createMedico } from '../../../src/utils/api';

export async function action({ request }) {
	try {
		const formData = await request.formData();
		const data = Object.fromEntries(formData);
		const resultado = await createMedico(data);
		if (resultado.medico) {
			return redirect(`/medicos/${resultado.medico._id}`);
		} else {
			// Asumiendo que el servidor responde con un mensaje de error en resultado.error
			return redirect('/medicos/edit', {
				state: {
					mensaje: resultado.error || 'Error desconocido al crear el médico',
				},
			});
		}
	} catch (error) {
		return redirect('/medicos/edit', {
			state: {
				mensaje: error.message || 'Error al crear el médico',
			},
		});
	}
}
