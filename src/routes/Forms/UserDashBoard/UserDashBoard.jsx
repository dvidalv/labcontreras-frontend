import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppContext } from '../../../contexts/MyContext';
import './UserDashBoard.css';

const schema = z.object({
	name: z.string().min(3).max(10),
	email: z.string().email(),
	password: z.string().min(6).max(12),
});

function UserDashBoard() {

	const { user, setUser, token } = useAppContext();

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm({
		defaultValues: {
			name: user.name || '',
			email: user.email || '',
			password: '',
		},
		resolver: zodResolver(schema),
	});

	const handleForm = async (data) => {
		try {
			await new Promise((resolve) => {
				setTimeout(resolve, 1000);
			});
			console.log(data);
			throw new Error('Error');
		} catch (error) {
			console.log(error.message);
			setError('root', {
				message: error.message,
			});
		}
	};

	return (
		<div className="user_dashboard">
			<div className="user_dashboard-container">
				<h1>DASHBOARD</h1>
				<form
					className="user_dashboard-form"
					onSubmit={handleSubmit(handleForm)}
				>

						<input
							type="text"
							name="name"
							placeholder="Nombre"
							{...register('name')}
						/>
						<p className="error">{errors.name && errors.name.message}</p>


						<input placeholder="Email" {...register('email')} />
						<p className="error">{errors.email && errors.email.message}</p>


						<input
							type="password"
							name="password"
							placeholder="Password"
							{...register('password')}
						/>
						<p className="error">
							{errors.password && errors.password.message}
						</p>
					<button
						className="user_dashboard-button"
						disabled={isSubmitting}
						type="submit"
					>
						{isSubmitting ? 'Enviando...' : 'Enviar'}
					</button>
					{errors.root && <p className="error">{errors.root.message}</p>}
				</form>
			</div>
		</div>
	);
}

export default UserDashBoard;
