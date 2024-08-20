import { useState, useEffect } from 'react';
import { useAppContext } from '../../contexts/MyContext';
import './Historia.css';

const getViewportWidth = () => {
	return Math.max(
		document.documentElement.clientWidth || 0,
		window.innerWidth || 0
	);
};

function Historia() {
	const { setIsMenuOpen } = useAppContext();
	const [viewportWidth, setViewportWidth] = useState(getViewportWidth());
	useEffect(() => {
		const handleResize = () => {
			setViewportWidth(getViewportWidth());
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	useEffect(() => {
		if (viewportWidth > 768) {
			setIsMenuOpen(false);
		}
	}, [viewportWidth, setIsMenuOpen]);
	return (
		<div className="historia">
			<header className="historia__header">
				<h1>FOTO</h1>
			</header>
			<main className="historia__main">
				<section className="historia__section-1">
					<h2>Section 1</h2>
				</section>
				<section className="historia__section-2">
					<h2>Section 2</h2>
				</section>
			</main>
		</div>
	);
}

export default Historia;
