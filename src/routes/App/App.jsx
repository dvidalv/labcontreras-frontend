// import '../../vendor/normalize.css';
import './app.css';
import Header from '../../components/Header/Header';

import Footer from '../../components/Footer/Footer';
import { useAppContext } from '../../contexts/MyContext';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
	const { isMenuOpen, setIsMenuOpen, loggedIn, setLoggedIn, token, setToken } = useAppContext();
	const navigate = useNavigate();

	useEffect(() => {
		if (!loggedIn) {
			navigate('/signin');
		}
	}, [loggedIn, navigate]);


	return (
		<div className="page__content">
			<Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
			<Outlet loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
			<Footer />
		</div>
	);
}

export default App;
