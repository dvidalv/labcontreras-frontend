import API_URL from './constants';
import {} from './constants';
// console.log(API_URL);

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

export async function updateUser({ data, token }) {
	const response = await fetch(`${API_URL}/users/update`, {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(data),
	});
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

export async function editMedico(id, data) {
	const response = await fetch(`${API_URL}/medicos/${id}/edit`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
	if (response.ok) {
		const responseData = await response.json();
		return {
			success: true,
			medico: responseData.medico,
		};
	} else {
		const errorData = await response.json();
		return {
			success: false,
			error: errorData.message,
			status: errorData.status,
		};
	}
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

export async function contact(email, subject, message) {
	const response = await fetch(`${API_URL}/api/contact`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, subject, message }),
	});

	return response.json();
}

export async function uploadAvatar(data) {
	const response = await fetch(`${API_URL}/upload`, {
		method: 'POST',
		body: data,
	});
	if (!response.ok) {
		throw new Error('Network response was not ok');
	}
	const result = await response.json();
	return result;
}

// FILEMAKER
export const getFileMakerToken = async () => {
	try {
		// console.log('Starting fetch request to getFileMakerToken');
		const response = await fetch(`${API_URL}/resultados`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		// console.log('Fetch request completed', response);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json(); // Convertir la respuesta a JSON
		// console.log('Response data:', data); // Mostrar los datos en la consola
		return data; // Devolver los datos
	} catch (error) {
		console.error('Error fetching data:', error);
	}
};

export const getResultados = async (token, medicoId) => {
	// console.log(token);
	const response = await fetch(`${API_URL}/resultados/records`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ token, medicoId }),
	});
	return response.json();
};

export const getResultadosByName = async (token, name, medicoId) => {
	const response = await fetch(`${API_URL}/resultados/record/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ token, name, medicoId }),
	});
	return response.json();
};

export const getPublicaciones = async () => {

	const response = await fetch(`${API_URL}/publicaciones`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},

	});
	// console.log(response);
	return response.json();
};

export const getPublicacion = async (id) => {
	const response = await fetch(`${API_URL}/publicaciones/${id}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
	});
	return response.json();
};
// Verificar si el token ha expirado
export const isTokenExpired = () => {
	const now = new Date();
	const tokenTimestamp = localStorage.getItem('tokenTimestamp');
	const timeElapsed = now.getTime() - tokenTimestamp;
	const timeRemaining = 900000 - timeElapsed; // 15 minutos en milisegundos
	const minutesRemaining = Math.floor(timeRemaining / 60000);
	// console.log(`Tiempo restante: ${minutesRemaining} minutos`);
	return timeElapsed > 900000;
};

export const getPdf = async (url) => {
	const response = await fetch(`${API_URL}/publicaciones/pdf`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ url }),
	});
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
	const pdfBlob = await response.blob();
	const pdf = URL.createObjectURL(pdfBlob);
	// console.log(pdfUrl)
	return pdf;
};
