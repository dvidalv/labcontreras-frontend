import './LayoutMedico.css';
import {
	Outlet,
	useLoaderData,
	Form,
	redirect,
	NavLink,
	useNavigate,
	useSubmit,
	Link,
} from 'react-router-dom';
import { useEffect } from 'react';
import { getMedicos } from '../../utils/api';

export async	function loader() {
		return getMedicos();
	}

function LayoutMedico() {
	const medicos = useLoaderData();
	const submit = useSubmit();	
	const navigate = useNavigate();


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
							<li>
								<Link to={"/medicos/1"}>Medico 1</Link>
							</li>
							<li>
								<Link to={"/medicos/2"}>Medico 2</Link>
							</li>
							<li>
								<Link to={"/medicos/3"}>Medico 3</Link>
							</li>
						</ul>
					</nav>
				</aside>
				<Outlet />
			</main>
	);
}

export default LayoutMedico;
