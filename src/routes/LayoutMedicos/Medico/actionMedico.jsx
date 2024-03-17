import { redirect } from 'react-router-dom';

export async function action() {
	// const medicos = await createMedico();
	// return redirect(`/medicos/${medicos._id}/edit`);
	return redirect(`/medicos/edit`);
}
