import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import './UserDashBoard.css';

const schema = z.object({
	name: z.string().min(3).max(10),
	email: z.string().email(),
	password: z.string().min(6).max(12),
});

function UserDashBoard() {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm({
		defaultValues: {
			name: '',
			email: '',
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
					<label htmlFor="name">
						Nombre
					</label>
					<input
						type="text"
						name="name"
						placeholder="Nombre"
						{...register('name')}
					/>
					{errors.name && <p className="error">{errors.name.message}</p>}
					<label htmlFor="email">Email</label>
					<input placeholder="Email" {...register('email')} />
					{errors.email && <p className="error">{errors.email.message}</p>}
					<label htmlFor="password">Password</label>
					<input
						type="password"
						name="password"
						placeholder="Password"
						{...register('password')}
					/>
					{errors.password && (
						<p className="error">{errors.password.message}</p>
					)}
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
