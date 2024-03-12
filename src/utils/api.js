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
