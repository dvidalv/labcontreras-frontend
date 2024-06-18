import API_URL from './constants';

export const registerAction = async (data) => {
	const { name, email, password } = data;

	try {
		const response = await fetch(`${API_URL}/users/signup`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ name, email, password }),
		});

		if (response.ok === false) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const res = await response.json();
		return res;
	} catch (error) {
		console.error('Error during registration:', error);
		throw error; // Rethrow the error so it can be caught by the caller
	}
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
	// console.log(token);
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

