import React, { useState } from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './routes/App/App.jsx';
import LayoutPacientes from './routes/LayoutPacientes/LayoutPacientes.jsx';
import Paciente from './routes/LayoutPacientes/Paciente/Paciente.jsx';
import NotFound from './routes/NotFound/NotFound.jsx';
import { AppProvider } from './contexts/MyContext';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <NotFound />,
	},
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
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<AppProvider>
			<RouterProvider router={router} />
		</AppProvider>
	</React.StrictMode>
);
