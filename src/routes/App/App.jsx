// import '../../vendor/normalize.css';
import './app.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useAppContext } from '../../contexts/MyContext';
import { Outlet, useLocation } from 'react-router-dom';
import background1 from '../../images/background-1.jpg';
import background2 from '../../images/background-2.jpg';

function getRandomNumber() {
	return Math.floor(Math.random() * 2) + 1;
}
const number = getRandomNumber();

function App() {

	// console.log('App component rendered');
	const { isMenuOpen, setIsMenuOpen, loggedIn, setLoggedIn } = useAppContext();
	const location = useLocation();


	let style = {
		maxWidth: '1400px',

	};

	if (location.pathname === '/resultados') {
		style = {
			// maxWidth: '1400px',
			backgroundImage: `url(${number === 1 ? background1 : background2})`,
			backgroundSize: 'cover',
			backgroundPosition: 'center',
			backgroundRepeat: 'no-repeat',
		};
	} else  {
		style = {
			// maxWidth: '1400px',
		};
	}
	
	return (
		<div className="page__content contenedor">
			<Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

			<div
				className="content"
				style={style}
			>
				<Outlet loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
			</div>
			<div className="footer--container">
				<Footer />
			</div>
		</div>
	);
}

export default App;
