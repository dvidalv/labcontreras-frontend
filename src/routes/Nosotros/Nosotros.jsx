import './Nosotros.css';
import nosotrosGroup from '../../images/nosotros1-group.png';
import edificioPrinciapal from '../../images/nosotros-edificio.png';
import { useEffect } from 'react';
function Nosotros() {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<div className="nosotros">
			<div className="nosotros__img">
				<img src={edificioPrinciapal} alt="lpcr edificio principal" />
			</div>
			<div className="nosotros__info">
				<h2>Nosotros</h2>
				<p className="nosotros__info-text">
				En nuestro laboratorio, estamos comprometidos con la excelencia en el servicio y la calidad de los resultados. Nuestro equipo de patólogos, técnicos y personal administrativo está dedicado a proporcionar resultados precisos y oportunos para ayudar a los médicos a tomar decisiones informadas.
				</p>
				<div className="nosotros__foto-group">
					<div className="nosotros__foto">
						<img src={nosotrosGroup} alt="lpcr nosotros" />
					</div>
				</div>
			</div>
		</div>
	);
}
export default Nosotros;
