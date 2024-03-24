import './main.css';
import Card from '../../components/Cards/Card';
import microscopio from '../../images/microscopio.svg';
import reportes from '../../images/reportes.svg';
import mensajeria from '../../images/mensajeria.svg';
import inmunohistoquimica from '../../images/inmuno.svg';
import felix from '../../images/felix.png';
import leti from '../../images/leti.png';
import naomi from '../../images/naomi.png';
import reservas from '../../images/reservas.png';
import universal from '../../images/universal.png';
import senasa from '../../images/senasa.png';
import sigma from '../../images/sigma.png';
import palic from '../../images/palic.png';
import humano from '../../images/humano.png';
import primera from '../../images/primera.png';
import meta from '../../images/meta.png';
import { Link, useLoaderData } from 'react-router-dom';
import { useAppContext } from '../../contexts/MyContext';
import { getMedicos } from '../../utils/api';
import { useEffect } from 'react';

function Main() {

	const { setMedicos, medicos } = useAppContext();
	// console.log(medicos);
	useEffect(() => {
		const fetchMedicos = async () => {
			const data = await getMedicos();
			setMedicos(data);
		};
		fetchMedicos();
	}, [setMedicos]);


	// console.log(medicos);
	return (
		<main className="page">
			<section className="hero"></section>
			<section className="services">
				<div className="services__container">
					<h1>NUESTROS SERVICIOS</h1>
					<p>
						Seguimos tan comprometidos hoy, como lo fueron nuestros patólogos
						fundadores, para proporcionar resultados precisos de pruebas de
						diagnóstico y servicios de soporte excepcionales, con un equipo
						multidisciplinario, en todas las áreas de anatomía patológica.
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
						<Link className="about__link" to="/nosotros">Más..</Link>
					</div>
					<ul className="cards">
						{medicos.map((medico) => (
							<li key={medico._id}>
								<Card
									cargo={medico.cargo}
									nombre={medico.nombre}
									imagen={medico.url}
									correo={medico.email}
									telefono={medico.telefono}
									extension={medico.extension}
									celular={medico.celular}
								/>
							</li>
						))}
						{/* <li>
							<Card
								cargo="Director General"
								nombre="Dr. Félix Contreras"
								imagen={felix}
								correo="felix@labcontreras.com"
								telefono="5555555555"
								extension="123"
								celular="5555555555"
							/>
						</li>
						<li>
							<Card
								cargo="Patologa"
								nombre="Dra. Leticia Matias"
								imagen={leti}
								correo="leticia@labcontreras.com"
								telefono="5555555555"
								extension="123"
								celular="5555555555"
							/>
						</li>
						<li>
							<Card
								cargo="Patologa"
								nombre="Dra. Naomi Inuyama"
								imagen={naomi}
								correo="ninuyama@labcontreras.com"
								telefono="5555555555"
								extension="123"
								celular="5555555555"
							/>
						</li> */}
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
