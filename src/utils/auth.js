import API_URL from './constants';

export const registerAction = async (formData) => {
	const submission = {
		name: formData.get('name'),
		email: formData.get('email'),
		password: formData.get('password'),
	};
	const { name, email, password } = submission;

	//send post request to the server
	const response = await fetch(`${API_URL}/users/signup`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ name, email, password }),
	});
	const res = await response.json();
	return res;
};

//login and get token
export const authorize = (email, password) => {
	return fetch(`${API_URL}/users/signin`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password }),
	});
};

// comprueba el token la validez del token
export const checkToken = async (token) => {
	try {
		const response = await fetch(`${API_URL}/users/verifyToken`, {
			method: 'GET', // GET es común para verificar tokens
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`, // Asegúrate de que la capitalización de 'Authorization' sea aceptada por tu servidor
			},
		});

		if (!response.ok) {
			// Lanza un error con información específica del estado para ser manejado por la función que llama
			throw new Error(`Network response was not ok: ${response.status}`);
		}

		return await response.json(); // Retorna la respuesta del servidor
	} catch (error) {
		console.error('There has been a problem with your fetch operation:', error);
		// Lanza el error para permitir que la función que llama maneje este caso
		throw error;
	}
};
