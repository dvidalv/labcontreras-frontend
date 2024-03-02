import { Link } from 'react-router-dom';
import '../form.css';
function Signup() {
	return (
		<div className="form-container">
			<h1 className="form-container__title">Signup</h1>
			<form className="form">

				<label className="form__label" htmlFor="name">
					Name
				</label>
				<input type="text" id="name" name="name" required={true} className="form__input" placeholder="Enter your name" />
				
				<label className="form__label" htmlFor="email">
					Email
				</label>
				<input type="email" id="email" name="email" required={true} className="form__input" placeholder="Enter your email" />
				
				<label className="form__label" htmlFor="password">
					Password
				</label>	
				<input type="password" id="password" name="password" required={true} className="form__input"	 placeholder="Enter your password" />

				<label className="form__label" htmlFor="password">
					Confirm Password
				</label>
				<input type="password" id="password" name="password" required={true} className="form__input"	 placeholder="Confirm your password" />
				
				<div className="form__links">
					<Link	 to="/signin" className="form__link">Ya tienes cuenta?</Link>
				</div>
				
				<button type="submit" className="form__button">Submit</button>
			</form>
		</div>
	);
}

export default Signup;
