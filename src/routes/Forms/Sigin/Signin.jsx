import { Form, Link, useSubmit } from 'react-router-dom';
import '../form.css';
import Tooltip from '../../../components/ToolTip/Tooltip';
import { useAppContext } from '../../../contexts/MyContext';
import { getContact } from '../../../utils/api';

export async function action() {
	const contact = await getContact();
	return contact;
}

function Signin() {
	const { showTooltip } = useAppContext();

	const submit = useSubmit();

	const handleSubmit = (event) => {
		event.preventDefault();
		submit(event.currentTarget);
	};

	return (
		<div className="form-container">
			<h1 className="form-container__title">Signin</h1>
			<Form className="form" onSubmit={handleSubmit}>
				<label className="form__label" htmlFor="email">
					Email
				</label>
				<input
					type="email"
					id="email"
					name="email"
					required={true}
					className="form__input"
					placeholder="Enter your email"
				/>

				<label className="form__label" htmlFor="password">
					Password
				</label>
				<input
					required={true}
					type="password"
					id="password"
					name="password"
					className="form__input"
					placeholder="Enter your password"
				/>
				<div className="form__links">
					<Link
						to="/forgot-password"
						className="form__link form-link--forgot-password"
					>
						Forgot password?
					</Link>
					<Link to="/signup" className="form__link form__link_create-account">
						Create account
					</Link>
				</div>

				<button type="submit" className="form__button">
					Submit
				</button>
			</Form>
			{showTooltip && (
				<Tooltip message="You have successfully signed in" type="success" />
			)}
		</div>
	);
}

export default Signin;
