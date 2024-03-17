import API_URL from './constants';


export async function signinUser(email, password) {
	const response = await fetch(`${API_URL}/signin`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password }),
	});
	return response.json();
}

export async function createUser(email, password) {
	const response = await fetch(`${API_URL}/users/signup`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password }),
	});
	return response.json();
}

export async function contact(email, subject, message) {
	const response = await fetch(`${API_URL}/api/contact`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, subject, message }),
	});
	console.log(response);
	return response.json();
}


export async function getMedicos() {
	const response = await fetch(`${API_URL}/medicos`);
	return response.json();
}

export async function getMedico(id) {
	const response = await fetch(`${API_URL}/medicos/${id}`);
	return response.json();
}

export async function updateMedico(id, data) {
	const response = await fetch(`${API_URL}/medicos/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
	return response.json();
}

export async function destroyMedico(id) {
	const response = await fetch(`${API_URL}/medicos/${id}`, {
		method: 'DELETE',
	});
	return response.json();
}

export async function medicosWhitelist() {
	const response = await fetch(`${API_URL}/medicos/whitelist`);
	return response.json();
}

export async function createMedico(data) {
	const response = await fetch(`${API_URL}/medicos`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
	return response.json();
}

export async function loader() {
	const medicos = await getMedicos();
	return medicos;
}

export async function getMedicoById({ params }) {
	const medico = await getMedico(params.id);
	if (!medico) {
		return {
			status: 404,
			statusText: 'Medico no encontrado',
		};
	}
	return { medico };
	
}