import { getUsers } from '../../../utils/api';

export async function loader() {
	const users = await getUsers();
	return users;
}