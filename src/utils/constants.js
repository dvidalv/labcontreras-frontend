let API_URL = '';

if (window.location.hostname === 'localhost') {
	API_URL = 'http://localhost:3001';
} else {
	API_URL = 'https://labcontreras-backend.vercel.app';
}

export const menuLinks = [
	{ to: '/', text: 'Inicio' },
	{
		to: '#',
		text: 'Nosotros',
		submenu: true,
		submenuItems: [
			{ to: '/historia', text: 'Historia' },
			{
				to: '/nosotros/mision-vision-valores',
				text: 'Mision, vision y valores',
			},
		],
	},
	{ to: '/medicos', text: 'Médicos' },
	{ to: '/resultados', text: 'Resultados' },
	{ to: '/contact', text: 'Contacto' },
];

// export const FILEMAKER_URL = 'https://www.server-lpcr.com.doo';
// export const FILEMAKER_DATABASE = 'lpcr';
// export const FILEMAKER_LAYOUT = 'pacientes_web';

export default API_URL;
