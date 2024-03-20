import './Nosotros.css';
import nosotrosGroup from '../../images/nosotros1-group.png';
import edificioPrinciapal from '../../images/nosotros-edificio.png';
function Nosotros() {
	return (
		<div className="nosotros">
			<div className="nosotros__img">
				<img src={edificioPrinciapal} alt="lpcr edificio principal" />
			</div>
			<div className="nosotros__info">
				<h2>Nosotros</h2>
				<p className="nosotros__info-text">
					Lorem simply dummy text of the printing and typesetting
					industry. Lorem Ipsum has been the standard dummy text ever
					since the 1500s, when an unknown printer took a galley of type and
					scrambled it to make a type specimen book. It has survived not only
					five centuries, but also the leap into electronic typesetting,
					remaining essentially unchanged. It was popularised in the 1960s with
					the release of Letraset sheets containing Lorem Ipsum passages, and
					more recently with desktop publishing software like Aldus PageMaker
					including versions of Lorem Ipsum. of Letraset sheets containing Lorem
					Ipsum passages, and more recently with desktop publishing software
					like Aldus PageMaker including versions of Lorem Ipsum.
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
