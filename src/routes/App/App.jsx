import { useState, useEffect } from 'react';
import '../../vendor/normalize.css';
import './app.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import { useAppContext } from '../../contexts/MyContext';


function App() {

	const { isMenuOpen, setIsMenuOpen } = useAppContext();
	//get viewport width
	
	// useEffect(() => {
	// 	const resizeListener = () => {
	// 		let windowWidth = window.innerWidth; // Almacenar en una variable
	// 		let vw = windowWidth * 0.01;
	// 		document.documentElement.style.setProperty('--vw', `${vw}px`);
	// 		setIsMenuOpen(windowWidth <= 768);
	// 	};
	// 	window.addEventListener('resize', resizeListener);
	// 	// Initial check
	// 	resizeListener();
	// 	return () => {
	// 		window.removeEventListener('resize', resizeListener);
	// 	};
	// }, [setIsMenuOpen]);

	return (
		<div className="page__content">
			<Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
			<Main />
			<Footer />
		</div>
	);
}

export default App;
