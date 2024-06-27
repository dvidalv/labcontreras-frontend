let API_URL = '';

if (window.location.hostname === 'localhost') {
	API_URL = 'http://localhost:3001';
} else {
	API_URL = 'https://labcontreras-backend.vercel.app';
}

// export const FILEMAKER_URL = 'https://www.server-lpcr.com.doo';
// export const FILEMAKER_DATABASE = 'lpcr';
// export const FILEMAKER_LAYOUT = 'pacientes_web';



export default API_URL;
