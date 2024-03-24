import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './vendor/normalize.css';
import './index.css';
import { AppProvider } from './contexts/MyContext';
import RequireAuth from './components/ProtectedRoute/RequireAuth.jsx';
import App from './routes/App/App.jsx';
import Main from './routes/Main/Main.jsx';
import LayoutPacientes from './routes/LayoutPacientes/LayoutPacientes.jsx';
import Paciente from './routes/LayoutPacientes/Paciente/Paciente.jsx';
import NotFound from './routes/NotFound/NotFound.jsx';
import Signin from './routes/Forms/Sigin/Signin.jsx';
import Signup from './routes/Forms/Signup/Signup.jsx';
import Contact from './routes/Forms/Contact/Contact.jsx';

import LayoutMedicos from './routes/LayoutMedicos/LayoutMedico.jsx';
import { loader as loaderMedicos } from './routes/LayoutMedicos/layoutMedicoLoader.jsx';

import { getMedicoById as loaderMedico } from './utils/api';

import Medico from './routes/LayoutMedicos/Medico/Medico.jsx';
import { action as actionMedico } from './routes/LayoutMedicos/Medico/actionMedico.jsx';
import { action as destroyMedico } from './routes/LayoutMedicos/Medico/destroyMedico.jsx';

import NuevoMedico from './routes/LayoutMedicos/nuevoMedico/NuevoMedico.jsx';

import EditMedico from './routes/LayoutMedicos/EditMedico/EditMedico.jsx';
import { loader as editMedicoLoader } from './routes/LayoutMedicos/EditMedico/editMedicoLoader.jsx';

import Nosotros from './routes/Nosotros/Nosotros.jsx';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				index: true,
				element: <Main />,
				loader: loaderMedicos,
			},
			{
				path: 'pacientes/',
				element: (
					<RequireAuth>
						<LayoutPacientes />
					</RequireAuth>
				),
				children: [
					{
						path: ':id',
						element: <Paciente />,
					},
				],
			},
			{
				path: 'nosotros/',
				element: <Nosotros />,
			},
			{
				path: 'medicos/',
				element: (
					<RequireAuth>
						<LayoutMedicos />
					</RequireAuth>
				),
				loader: loaderMedicos,
				action: actionMedico,
				children: [
					{
						path: ':id',
						element: <Medico />,
						loader: loaderMedico,
					},
					{
						path: ':id/edit',
						element: <EditMedico />,
						loader: editMedicoLoader,
					},
					{
						path: ':id/destroy',
						action: destroyMedico,
						element: <h1>Eliminando...</h1>,
						errorElement: <h1>Hubo un error al eliminar el medico</h1>,
					},
					{
						path: 'nuevo/',
						element: <NuevoMedico />,
					},
				],
			},
			{
				path: 'signup/',
				element: <Signup />,
			},
			{
				path: 'signin/',
				element: <Signin />,
			},
			{
				path: 'contact/',
				element: <Contact />,
			},
		],
		errorElement: <NotFound />,
	},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<AppProvider>
			<RouterProvider router={router} />
		</AppProvider>
	</React.StrictMode>
);
