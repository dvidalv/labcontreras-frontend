
// import '../../vendor/normalize.css';
import './app.css';
import Header from '../../components/Header/Header';

import Footer from '../../components/Footer/Footer';
import { useAppContext } from '../../contexts/MyContext';
import { Outlet } from 'react-router-dom';

function App() {
	const { isMenuOpen, setIsMenuOpen } = useAppContext();

	return (
		<div className="page__content">
			<Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
			<Outlet />
			<Footer />
		</div>
	);
}

export default App;
