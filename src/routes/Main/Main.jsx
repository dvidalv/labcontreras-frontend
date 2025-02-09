import './main.css';
import { useState, useEffect } from 'react';
import Card from '../../components/Cards/Card';
import reservas from '../../images/reservas.png';
import universal from '../../images/universal.png';
import senasa from '../../images/senasa.png';
import sigma from '../../images/sigma.png';
import palic from '../../images/palic.png';
import humano from '../../images/humano.png';
import primera from '../../images/primera.png';
import meta from '../../images/meta.png';
import { useAppContext } from '../../contexts/MyContext';
import { getMedicos, getPublicaciones } from '../../utils/api';
import 'animate.css';
import Publicaciones from '../Publicaciones/Publicaciones';
import WhatsApp from '../../components/WhatsApp/WhatsApp';
import { motion } from 'framer-motion';

function Main() {
	const [publicaciones, setPublicaciones] = useState([]);
	const [errorFetchPublicaciones, setErrorFetchPublicaciones] = useState(false);
	const { setMedicos, medicos } = useAppContext();
	const [isVisible, setIsVisible] = useState(false);

	const gotoTop = () => {
		window.scrollTo(0, 0);
	};

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 100) {
				setIsVisible(true);
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	useEffect(() => {
		gotoTop();
		const fetchMedicos = async () => {
			try {
				const data = await getMedicos();
				setMedicos(data);
			} catch (error) {
				console.error('Error fetching medicos:', error);
			}
		};

		const fetchPublicaciones = async () => {
			const tiempoTranscurridoEnMinutos =
				(Date.now() - localStorage.getItem('tokenTimestamp')) / 60000;
			try {
				const dataPublicaciones = await getPublicaciones();
				if (dataPublicaciones.messages[0].message === 'OK') {
					localStorage.setItem('tokenTimestamp', Date.now());
				}
				const {
					response: { data },
				} = dataPublicaciones;
				setPublicaciones(data);
			} catch (error) {
				setErrorFetchPublicaciones(true);
				console.error('Error fetching publicaciones:', error);
			}
		};

		fetchMedicos();
		fetchPublicaciones();
	}, [setMedicos]);

	return (
		<main className="page">
			<section className="hero"></section>

			<section className="about">
				<div className="about__container">
					<div className="about__text">
						<h1 className="about__title animate__animated animate__backInLeft">
							SOBRE NOSOTROS
						</h1>
						<p>
							En nuestro laboratorio, estamos comprometidos con la excelencia en
							el servicio y la calidad de los resultados. Nuestro equipo de
							patólogos, técnicos y personal administrativo está dedicado a
							proporcionar resultados precisos y oportunos para ayudar a los
							médicos a tomar decisiones informadas.
						</p>
						{/* <Link className="about__link" to="/nosotros">
							Más..
						</Link> */}
					</div>

					<h2 className="about__title">NUESTROS MÉDICOS</h2>

					<motion.ul
						className="cards"
						variants={{
							hidden: { opacity: 0, scale: 0.5 },
							visible: { opacity: 1, scale: 1 },
						}}
						initial="hidden"
						animate={isVisible ? 'visible' : 'hidden'}
						transition={{ duration: 0.5 }}
					>
						{medicos.map((medico, index) => (
							<motion.li
								key={medico._id}
								variants={{
									hidden: { opacity: 0, scale: 0.5 },
									visible: { opacity: 1, scale: 1 },
								}}
								initial="hidden"
								animate={isVisible ? 'visible' : 'hidden'}
								transition={{ duration: 0.5, delay: index * 0.2 }} // Ajusta el delay según el índice
							>
								<Card
									cargo={medico.cargo}
									nombre={`${medico.nombre} ${medico.apellido}`}
									imagen={medico.url}
									correo={medico.email}
									telefono={medico.telefono}
									extension={medico.extension}
									celular={medico.celular}
									curriculumUrl={`curriculum/`}
									id={medico._id}
									especialidad={medico.especialidad}
								/>
							</motion.li>
						))}
					</motion.ul>
				</div>
			</section>
			<section className="services">
				<div id="services" className="services__container">
					<h1>NUESTROS SERVICIOS</h1>
					<p>
						En Laboratorio de Patología Contreras Robledo, nos comprometemos a
						brindarle servicios de patología clínica de la más alta calidad,
						utilizando tecnología de vanguardia y un enfoque centrado en el
						paciente. Nuestros servicios incluyen:
					</p>
					<div className="services__list-container">
						<ul className="services__list">
							<li className="services__item">
								<p>BIOPSIAS INCISIONALES Y EXCISIONALES</p>
							</li>
							<li className="services__item">
								<p>PUNCION ASPIRACIÓN CON AGUJA FINA</p>
							</li>
							<li className="services__item">
								<p>CITOLOGÍA DE LÍQUIDO Y SECRECIONES</p>
							</li>
							<li className="services__item">
								<p>CITOLOGÍA CERVICO-VAGINAL</p>
							</li>
							<li className="services__item">
								<p>BIOPSIAS INTRAOPERATORIAS POR CONGELACIÓN</p>
							</li>
							<li className="services__item">
								<p>HISTOQUÍMICA</p>
							</li>
							<li className="services__item">
								<p>INMUNOHISTOQUÍMICA</p>
							</li>
							<li className="services__item">
								<p>HIBRIDATION In Situ (FISH Y SISH)</p>
							</li>
							<li className="services__item">
								<p>rt-PCR</p>
							</li>
							<li className="services__item">
								<p>CITOMETRÍA DE FLUJO</p>
							</li>
						</ul>
						<div className="services__image"></div>
					</div>
				</div>
			</section>

			<section className="seguros">
				<div className="seguros__container">
					<h2>ACEPTAMOS TODOS LOS SEGUROS</h2>
					<ul>
						<li>
							<img src={reservas} alt="icono" />
						</li>
						<li>
							<img src={universal} alt="icono" />
						</li>
						<li>
							<img src={senasa} alt="icono" />
						</li>
						<li>
							<img src={sigma} alt="icono" />
						</li>
						<li>
							<img src={palic} alt="icono" />
						</li>
						<li>
							<img src={humano} alt="icono" />
						</li>
						<li>
							<img src={primera} alt="icono" />
						</li>
						<li>
							<img src={meta} alt="icono" />
						</li>
					</ul>
				</div>
			</section>

			<section id="publicaciones" className="publicaciones">
				{errorFetchPublicaciones ? (
					<p style={{ color: 'red', textAlign: 'center', fontSize: '1rem' }}>
						Error al cargar las publicaciones
					</p>
				) : (
					<Publicaciones
						publicaciones={publicaciones}
						setPublicaciones={setPublicaciones}
					/>
				)}
			</section>
			<WhatsApp />
		</main>
	);
}

export default Main;
