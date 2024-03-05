import { Link } from 'react-router-dom';
import '../form.css';
import Tooltip from '../../../components/ToolTip/Tooltip';
import { register } from '../../../utils/auth';
import { useAppContext } from '../../../contexts/MyContext';

function Signup() {
	const { showTooltip, setShowTooltip, message, setMessage, type, setType } = useAppContext();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const data = {
			name: formData.get('name'),
			email: formData.get('email'),
			password: formData.get('password'),
			confirmpassword: formData.get('confirmpassword'),
		};

		if (data.password !== data.confirmpassword) {
			alert('Las contraseñas no coinciden');
			return;
		}
		try {
			const res = await register(data.name, data.email, data.password);
			if (res.status === 'error') {
				// alert(res.message);
				setType('alert');
				setMessage(res.message);
				setShowTooltip(true);
			}
			if (res.status === 'success') {
				// alert(res.message);
				setType('success');
				setMessage('Has sido registrado con éxito');
				setShowTooltip(true);
			}
		} catch (error) {
			console.error('Error en el registro:', error);
			alert('Error al registrar');
		}
	};

	return (
		<div className="form-container">
			<h1 className="form-container__title">Signup</h1>
			<form className="form" onSubmit={handleSubmit}>
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

				<button type="submit" className="form__button">
					Submit
				</button>
			</form>
			{showTooltip && <Tooltip message={message} type={type} />}
		</div>
	);
}

export default Signup;
