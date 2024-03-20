import { redirect } from 'react-router-dom';
import { updateMedico } from '../../../utils/api';
import './EditMedico.css';
export async function action({ request, params }) {
	const formData = await request.formData();
	const updates = Object.fromEntries(formData);
	console.log('updates', updates);
	await updateMedico(params.id, updates);
	return redirect(`/medicos/${params.id}`);

}



