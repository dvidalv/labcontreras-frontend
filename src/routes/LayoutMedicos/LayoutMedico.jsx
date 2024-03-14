import './LayoutMedico.css';
import {
	Outlet,
	useLoaderData,
	Form,
	useNavigate,
	useSubmit,
	Link,
} from 'react-router-dom';
import { getMedicos } from '../../utils/api';

export async function loader() {
	const medicos = await getMedicos();
	return medicos;
}

function LayoutMedico() {
	const medicos = useLoaderData();
	console.log(medicos);

	const submit = useSubmit();

	return (
		<main className="main">
			<aside className="sidebar">
				<h2>Medicos</h2>
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
					<Form method="post">
						<button type="submit">New</button>
					</Form>
				</div>
				<nav>
					<ul>
						{medicos.map((medico) => (
							<li key={medico._id}>
								<Link to={`/medicos/${medico._id}`}>{medico.nombre}</Link>
							</li>
						))}
					</ul>
				</nav>
			</aside>
			<Outlet />
		</main>
	);
}

export default LayoutMedico;
