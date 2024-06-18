import './Curriculum.css';
import CurriculumSection from '../../components/CurriculumSection/CurriculumSection';
import felix from '../../images/felix.png';

function Curriculum() {
	const descripcion = (
		<p className="curriculum-section__description-text">
			Soy Médico por la Universidad Autónoma de Madrid, Especialista en
			Patología por la Clínica Universitaria de Navarra y PhD en Biología
			celular por la Universidad de Navarra. Tengo más de 25 años de experiencia
			en la práctica de la patología en mi propio laboratorio radicado en la
			Clínica Unión Médica en Santiago, Rep. Dominicana.  Igualmente llevo más
			de 20 años impartiendo docencia como profesor asociado en la Pontificia
			Universidad Católica Madre y Maestra donde ademas he sido Decano de la
			Facultad de Ciencias de la Salud y Vicerector Académico. Participo
			habitualmente como conferenciante y profesor invitado en  multiples
			actividades y congresos de diversas sociedades. He publicado múltiples
			artículos en revistas médicas indexadas. Soy miembro de la Sociedad
			Dominicana de Patología, de la Sociedad Española de Anatomía Patológica
			(SEAP) y de la United States and Canadian Academy of Pathology (USCAP).
			Mis intereses profesionales principales son la Patología Oncológica, la
			Inmunohistoquímica y la Patología Mamaria.
		</p>
	);
	return (
		<div className="curriculum container">
			<div className="curriculum-section">
				<img className="curriculum-section__image" src={felix} alt="" />
				<h2>Félix contreras Metujo</h2>
				<p className="curriculum-section__subtitle">MD, pHD</p>
			</div>
			<CurriculumSection title="Perfil" description={descripcion} style={{ marginBottom: '20px', maxWidth: '800px' }} />
			<CurriculumSection title="Educacion Medica" description={descripcion} style={{ marginBottom: '20px', maxWidth: '800px'  }} />
		</div>
	);
}

export default Curriculum;
