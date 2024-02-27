import { useRouteError } from "react-router-dom";
import { Link } from 'react-router-dom';
import './notFound.css';

function NotFound() {
	const error = useRouteError();
	return (
		<div className='notFound'>
			<h1>Oops</h1>
			<p>Sorry, an unexpected error has occurred.</p>
			<p>
			<i>{error.statusText || error.message}</i>
			</p>
			<p>Page not found</p>
			<Link to="/" className='notFound__link'>Go back to home</Link>
		</div>
	)
}

export default NotFound
