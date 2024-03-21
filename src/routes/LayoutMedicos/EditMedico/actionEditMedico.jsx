import { redirect } from 'react-router-dom';
import { updateMedico } from '../../../utils/api';
import './EditMedico.css';


export async function action({ request, params }) {
	const formData = await request.formData();
	const updates = Object.fromEntries(formData);
	// console.log('updates', updates);
	const response = await updateMedico(params.id, updates);

	if (response.error) {
		return redirect(`/medicos/${params.id}/edit`, {
			state: {
				mensaje: response.error,
			},
		});
	}

	return redirect(`/medicos/${params.id}`);

}



