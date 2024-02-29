import { Link } from 'react-router-dom';
import './signin.css';
function Signin() {
	return (
		<div className="signin">
			<h1 className="signin__title">Signin</h1>
			<form className="signin__form">
				
				<label className="signin__form-label" htmlFor="email">
					Email
				</label>
				<input type="email" id="email" name="email" className="signin__form-input" placeholder="Enter your email" />
				
				<label className="signin__form-label" htmlFor="password">
					Password
				</label>	
				<input type="password" id="password" name="password" className="signin__form-input"	 placeholder="Enter your password" />
				<div className="signin__form-links">
					<Link	to="/forgot-password" className="signin__form-link signin_form-link--forgot-password">Forgot password?</Link>
					<Link	 to="/signup" className="signin__form-link signin_form-link--create-account">Create account</Link>
				</div>
				
				<button type="submit" className="signin__form-button">Submit</button>
			</form>
		</div>
	);
}

export default Signin;
