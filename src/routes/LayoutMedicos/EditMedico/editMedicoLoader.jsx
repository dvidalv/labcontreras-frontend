import { getMedico } from '../../../utils/api';
export async function loader({ params }) {
	const { id } = params;
	const medico = await getMedico(id);
	return { medico };

}