// import '../../vendor/normalize.css';
import './app.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useAppContext } from '../../contexts/MyContext';
import { Outlet, useLocation } from 'react-router-dom';
import background1 from '../../images/background-1.jpg';
import background2 from '../../images/background-2.jpg';
import background3 from '../../images/background-3.jpg';
import background4 from '../../images/background-4.jpg';
import background5 from '../../images/background-5.jpg';

function getRandomNumber() {
	return Math.floor(Math.random() * 5) + 1;
}
const number = getRandomNumber();

function App() {
	// console.log('App component rendered');
	const { isMenuOpen, setIsMenuOpen, loggedIn, setLoggedIn} = useAppContext();
	const location = useLocation();

	let style = {
		maxWidth: '1400px',
	};

	if (location.pathname === '/resultados') {
		style = {
			// maxWidth: '1400px',
			backgroundImage: `url(${
				number === 1
					? background1
					: number === 2
					? background2
					: number === 3
					? background3
					: number === 4
					? background4
					: background5
			})`,
			backgroundSize: 'cover',
			backgroundPosition: 'top',
			backgroundRepeat: 'no-repeat',
		};
	} else {
		style = {
			// maxWidth: '1400px',
		};
	}

	return (
		<div className="page__content contenedor">
			<Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

			<div className="content" style={style}>
				<Outlet loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
			</div>
			<div className="footer--container">
				<Footer />
			</div>
		</div>
	);
}

export default App;
