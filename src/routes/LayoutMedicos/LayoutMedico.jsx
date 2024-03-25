import './LayoutMedico.css';
import { useAppContext } from '../../contexts/MyContext.jsx';
import {
	Outlet,
	useLoaderData,
	Form,
	NavLink,
	Link,
	useNavigation,
} from 'react-router-dom';
import Preloader from '../../components/Preloader/Preloader.jsx';

import avatarDoctor from '../../images/avatarDoctor.svg';
import { useEffect, useState } from 'react';

function LayoutMedico() {
	const { medicos, setMedicos } = useAppContext();
	const navigate = useNavigation();

	// Estado para almacenar el valor del input de búsqueda
	const [searchTerm, setSearchTerm] = useState('');

	const data = useLoaderData();
	// const medicos = useLoaderData();
	useEffect(() => {
		setMedicos(data);
	}, [data, setMedicos]);

	const filterMedicos = medicos.filter((medico) => {
		return `${medico.nombre} ${medico.apellido}`.toLowerCase().includes(searchTerm.toLowerCase());
	});

	return (
		<>
			{navigate.state === 'loading' && <Preloader />}
			<main className="main">
				<aside className="sidebar">
					<div className="search">
						<Form id="search-Form" role="search">
							<input
								id="q"
								className={''}
								aria-label="Search contacts"
								placeholder="Buscar..."
								type="search"
								name="q"
								defaultValue={''}
								onChange={(event) => {
									setSearchTerm(event.target.value); 
								}}
							/>
							<div id="search-spinner" aria-hidden hidden={''} />
							<div className="sr-only" aria-live="polite"></div>
						</Form>
						<Link to="/medicos/nuevo">
							<button type="button">Nuevo</button>
						</Link>
					</div>
					<nav className="nav">
						<ul className="nav__ul">
						{filterMedicos.map((medico) => ( 
								<li className="nav__li" key={medico._id}>
									<NavLink
										to={`/medicos/${medico._id}`}
									>{`${medico.nombre} ${medico.apellido}`}</NavLink>
									<div className="nav__li__actions">
										<img
											src={medico.url ? medico.url : avatarDoctor}
											alt="Avatar"
										/>
									</div>
								</li>
							))}
						</ul>
					</nav>
				</aside>
				<Outlet />
			</main>
		</>
	);
}

export default LayoutMedico;
