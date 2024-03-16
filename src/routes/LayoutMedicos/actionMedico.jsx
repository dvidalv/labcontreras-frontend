import { redirect } from 'react-router-dom';
import { createMedico } from '../../utils/api';

export async function action(){
	// const medicos = await createMedico();
	// return redirect(`/medicos/${medicos._id}/edit`);
	return redirect(`/medicos/edit`);
}
