//Registrar un nuevo usuario
export const register = async (name, email, password) => {
	try {
		const res = await fetch('http://localhost:3001/api/users/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ name, email, password }),
		});
		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};
