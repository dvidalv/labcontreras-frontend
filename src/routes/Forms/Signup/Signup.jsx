import { Form, Link } from 'react-router-dom';
import '../form.css';
import Tooltip from '../../../components/ToolTip/Tooltip';
import { useAppContext } from '../../../contexts/MyContext';
import { useState } from 'react';
import {registerAction} from '../../../utils/auth';

function Signup() {
	const location = 'signup';
	const { showTooltip, setShowTooltip, message, setMessage, type, setType } =
	useAppContext();
	

	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const res = await registerAction(formData);

		if (res.status === 'success') {
			setMessage(res.message);
			setType('success');
			setShowTooltip(true);
		} else {
			setMessage(res.message);
			setType('error');
			setShowTooltip(true);
		}
		setIsSubmitting(true);
	
	};

	return (
		<div className="form-container">
			<h1 className="form-container__title">Signup</h1>
			<Form className="form" onSubmit={handleSubmit}>
				<label className="form__label" htmlFor="name">
					Name
				</label>
				<input
					type="text"
					id="name"
					name="name"
					required={true}
					className="form__input"
					placeholder="Enter your name"
				/>

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
					type="password"
					id="password"
					name="password"
					required={true}
					className="form__input"
					placeholder="Enter your password"
				/>

				<label className="form__label" htmlFor="password">
					Confirm Password
				</label>
				<input
					type="password"
					id="confirmpassword"
					name="confirmpassword"
					required={true}
					className="form__input"
					placeholder="Confirm your password"
				/>

				<div className="form__links">
					<Link to="/signin" className="form__link">
						Ya tienes cuenta?
					</Link>
				</div>

				<button type="submit" className="form__button" disabled={isSubmitting}>
					{isSubmitting ? 'Enviando...' : 'Enviar'}
				</button>
			</Form>
			{showTooltip && <Tooltip message={message} type={type} location={location} />}
		</div>
	);
}

export default Signup;
