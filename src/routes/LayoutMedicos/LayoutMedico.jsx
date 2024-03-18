import './LayoutMedico.css';
import {
	Outlet,
	useLoaderData,
	Form,
	useSubmit,
	NavLink,
	Link,
	useNavigation,
} from 'react-router-dom';
import Preloader from '../../components/Preloader/Preloader.jsx';

function LayoutMedico() {
	const navigate = useNavigation();
	const medicos = useLoaderData();

	const submit = useSubmit();

	return (
		<>
			{navigate.state === 'loading' && <Preloader />}
			<main className="main">
				<aside className="sidebar">
					<h2>Agregar</h2>
					<div className="search">
						<Form id="search-Form" role="search">
							<input
								id="q"
								className={''}
								aria-label="Search contacts"
								placeholder="Search"
								type="search"
								name="q"
								defaultValue={''}
								onChange={(event) => {
									const isFirstSearch = '' == null;
									submit(event.currentTarget.form, {
										replace: isFirstSearch,
									});
								}}
							/>
							<div id="search-spinner" aria-hidden hidden={''} />
							<div className="sr-only" aria-live="polite"></div>
						</Form>
						<Link to="/medicos/nuevo">
							<button type="button">New</button>
						</Link>
					</div>
					<nav className="nav">
						<ul className="nav__ul">
							{medicos.map((medico) => (
								<li className="nav__li" key={medico._id}>
								<NavLink
									to={`/medicos/${medico._id}`}
								>{`${medico.nombre} ${medico.apellido}`}</NavLink>
								<div className="nav__li__actions">
									<img src={medico.url} alt="Avatar" />
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
