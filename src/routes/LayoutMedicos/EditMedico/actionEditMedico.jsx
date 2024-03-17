import { redirect } from 'react-router-dom';
import { updateMedico } from '../../../utils/api';

export async function action({ request, params }) {
	const formData = await request.formData();
	const updates = Object.fromEntries(formData);
	await updateMedico(params.id, updates);
	return redirect(`/medicos/${params.id}`);

}



