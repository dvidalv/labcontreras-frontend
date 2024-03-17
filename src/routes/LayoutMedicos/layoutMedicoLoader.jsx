import { getMedicos } from '../../utils/api';

export async function loader() {
	const medicos = await getMedicos();
	return medicos;
}