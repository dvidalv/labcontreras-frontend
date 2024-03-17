import { Outlet, Form, useSubmit, Link } from 'react-router-dom';

function LayoutPacientes() {
	const submit = useSubmit();

	return (
		<main className="main">
			<aside className="sidebar">
				<h2>Pacientes</h2>
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
							<Link to={'/pacientes/1'}>Paciente 1</Link>
						</li>
						<li>
							<Link to={'/pacientes/2'}>Paciente 2</Link>
						</li>
						<li>
							<Link to={'/pacientes/3'}>Paciente 3</Link>
						</li>
					</ul>
				</nav>
			</aside>
			<Outlet />
		</main>
	);
}

export default LayoutPacientes;
