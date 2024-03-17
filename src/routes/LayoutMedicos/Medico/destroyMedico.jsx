import { redirect } from 'react-router-dom';
import { destroyMedico } from '../../../utils/api';

export async function action({ params }) {
	// console.log('params', params);
	const resultado = await destroyMedico(params.id);
	if (resultado.medico) {
		return redirect('/medicos');
	} else {
		// Asumiendo que el servidor responde con un mensaje de error en resultado.error
		return redirect('/medicos', {
			state: {
				mensaje: resultado.error || 'Error desconocido al eliminar el médico',
			},
		});
	}

}
