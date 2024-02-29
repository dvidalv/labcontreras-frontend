import { Link } from 'react-router-dom';
import './signup.css';
function Signup() {
	return (
		<div className="signup">
			<h1 className="signup__title">Signup</h1>
			<form className="signup__form">

				<label className="signup__form-label" htmlFor="name">
					Name
				<input type="text" id="name" name="name" className="signup__form-input" placeholder="Enter your name" />
				</label>
				
				<label className="signup__form-label" htmlFor="email">
					Email
				<input type="email" id="email" name="email" className="signup__form-input" placeholder="Enter your email" />
				</label>
				
				<label className="signup__form-label" htmlFor="password">
					Password
				<input type="password" id="password" name="password" className="signup__form-input"	 placeholder="Enter your password" />
				</label>	

				<label className="signup__form-label" htmlFor="password">
					Confirm Password
				<input type="password" id="password" name="password" className="signup__form-input"	 placeholder="Confirm your password" />
				</label>
				
				<div className="signup__form-links">
					<Link	 to="/signin" className="signup__form-link">Ya tienes cuenta?</Link>
				</div>
				
				<button type="submit" className="signup__form-button">Submit</button>
			</form>
		</div>
	);
}

export default Signup;
