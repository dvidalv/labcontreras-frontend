import { medicosWhitelist } from '../../../utils/api';

export async function loader() {
	const medicos = await medicosWhitelist();
	return medicos;
}