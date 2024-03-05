import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './vendor/normalize.css';
import './index.css';
import App from './routes/App/App.jsx';
import Main from './routes/Main/Main.jsx';
import LayoutPacientes from './routes/LayoutPacientes/LayoutPacientes.jsx';
import Paciente from './routes/LayoutPacientes/Paciente/Paciente.jsx';
import LayoutMedicos from './routes/LayoutMedicos/LayoutMedico.jsx';
import Medico from './routes/LayoutMedicos/Medico/Medico.jsx';
import NotFound from './routes/NotFound/NotFound.jsx';
import { AppProvider } from './contexts/MyContext';
import Signup from './routes/Forms/Signup/Signup.jsx';
import Signin from './routes/Forms/Sigin/Signin.jsx';
import { registerAction as actionSignup } from './utils/auth.js';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{ index: true, element: <Main /> },
			{
				path: 'pacientes/',
				element: <LayoutPacientes />,
				children: [
					{
						path: ':id',
						element: <Paciente />,
					},
				],
			},
			{
				path: 'medicos/',
				element: <LayoutMedicos />,
				children: [
					{
						path: ':id',
						element: <Medico />,
					},
				],
			},
			{
				path: 'signup/',
				element: <Signup />,
				action: actionSignup,
			},
			{
				path: 'signin/',
				element: <Signin />,
			},
		],
		errorElement: <NotFound />,
	},
	// {
	// 	path: 'pacientes/',
	// 	element: <LayoutPacientes />,
	// 	children: [
	// 		{
	// 			path: ':id',
	// 			element: <Paciente />,
	// 		},
	// 	],
	// },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<AppProvider>
			<RouterProvider router={router} />
		</AppProvider>
	</React.StrictMode>
);
