// const API_URL = 'https://labcontreras-backend.vercel.app';
// const API_URL = 'http://localhost:3001';

let API_URL = '';

if (window.location.hostname === 'localhost') {
	API_URL = 'http://localhost:3001';
} else {
	API_URL = 'https://labcontreras-backend.vercel.app';
}

export default API_URL;
