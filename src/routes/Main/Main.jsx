import './main.css';
import Card from '../../components/Cards/Card';
import microscopio from '../../images/microscopio.svg';
import reportes from '../../images/reportes.svg';
import mensajeria from '../../images/mensajeria.svg';
import inmunohistoquimica from '../../images/inmuno.svg';
import reservas from '../../images/reservas.png';
import universal from '../../images/universal.png';
import senasa from '../../images/senasa.png';
import sigma from '../../images/sigma.png';
import palic from '../../images/palic.png';
import humano from '../../images/humano.png';
import primera from '../../images/primera.png';
import meta from '../../images/meta.png';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../contexts/MyContext';
import { getMedicos } from '../../utils/api';
import { useEffect } from 'react';

function Main() {
	const { setMedicos, medicos } = useAppContext();
	useEffect(() => {
		const fetchMedicos = async () => {
			const data = await getMedicos();
			setMedicos(data);
		};
		fetchMedicos();
	}, [setMedicos]);

	return (
		<main className="page">
			<section className="hero"></section>
			<section className="services">
				<div id="services" className="services__container">
					<h1>NUESTROS SERVICIOS</h1>
					<p>
					is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book
					</p>
					<ul className="services__list">
						<li className="services__item">
							<img src={microscopio} alt="icono" />
							<p>Solicitud de Resultados</p>
						</li>
						<li className="services__item">
							<img src={reportes} alt="icono" />
							<p>Pruebas por especificidad</p>
						</li>
						<li className="services__item">
							<img src={mensajeria} alt="icono" />
							<p>Mensajería Personalizada</p>
						</li>
						<li className="services__item">
							<img src={inmunohistoquimica} alt="icono" />
							<p>Inmunohistoquimica</p>
						</li>
					</ul>
				</div>
			</section>
			<section className="about">
				<div className="about__container">
					<div className="about__text">
						<h1>SOBRE NOSOTROS</h1>
						<p>
							En nuestro laboratorio, estamos comprometidos con la excelencia en
							el servicio y la calidad de los resultados. Nuestro equipo de
							patólogos, técnicos y personal administrativo está dedicado a
							proporcionar resultados precisos y oportunos para ayudar a los
							médicos a tomar decisiones informadas.
						</p>
						<Link className="about__link" to="/nosotros">
							Más..
						</Link>
					</div>
					<ul className="cards">
						{medicos.map((medico) => (
							<li key={medico._id}>
								<Card
									cargo={medico.cargo}
									nombre={`${medico.nombre} ${medico.apellido}`}
									imagen={medico.url}
									correo={medico.email}
									telefono={medico.telefono}
									extension={medico.extension}
									celular={medico.celular}
								/>
							</li>
						))}
					</ul>
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
		</main>
	);
}

export default Main;
