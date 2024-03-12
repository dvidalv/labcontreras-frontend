// import '../../vendor/normalize.css';
import './app.css';
import Header from '../../components/Header/Header';

import Footer from '../../components/Footer/Footer';
import { useAppContext } from '../../contexts/MyContext';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkToken } from '../../utils/auth';

function App() {
	const { isMenuOpen, setIsMenuOpen, loggedIn, setLoggedIn, token, setToken } =
		useAppContext();
	const navigate = useNavigate();


	useEffect(() => {
		const verifyToken = async () => {
			const token = localStorage.getItem('token');
			if (token) {
				try {
					const response = await checkToken(token);
					// const {
					// 	user: { email, name },
					// } = response;
					if (response.status === 'success') {
						setLoggedIn(true);
						setToken(token);
					} else {
						localStorage.removeItem('token');
						navigate('/signin');
					}
				} catch (error) {
					localStorage.removeItem('token');
					navigate('/signin');
				}
			}
		};

		verifyToken();
	}, [setLoggedIn, setToken, navigate]);

	return (
		<div className="page__content">
			<Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
			<Outlet loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
			<Footer />
		</div>
	);
}

export default App;
