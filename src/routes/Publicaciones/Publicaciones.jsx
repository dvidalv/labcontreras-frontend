import { useState, useEffect } from 'react';
import './Publicaciones.css';
import PropTypes from 'prop-types';
import { getPdf } from '../../utils/api.js';
import RenderPdf from '../../components/RenderPdf/RenderPdf.jsx';

function Publicaciones({ publicaciones = [] }) {
	// console.log('publicaciones')
	const [pdfUrls, setPdfUrls] = useState([]);
	const [loading, setLoading] = useState(false);
	console.log(pdfUrls);

	useEffect(() => {
		const fetchPdf = async (PDF, titulo, descripcion) => {
			setLoading(true);
			const pdf = await getPdf(PDF);
			setPdfUrls((prevUrls) => [{ pdf, titulo, descripcion }, ...prevUrls]);
			setLoading(false);
		};
		publicaciones.forEach((publicacion) => {
			console.log('publicacion', publicacion);
			const {
				fieldData: { PDF, titulo, descripcion },
			} = publicacion;
			fetchPdf(PDF, titulo, descripcion);
		});
	}, [publicaciones]);

	return (
		<>
			<h1 className="publicaciones__title">PUBLICACIONES</h1>
			<div className="publicaciones__container">
				{pdfUrls.length > 0 ? (
					pdfUrls.map(({ pdf, titulo, descripcion }, index) => <RenderPdf key={index} pdfUrl={pdf} titulo={titulo} descripcion={descripcion} />)
				) : (
					<p>{loading ? 'Cargando publicaciones...' : 'No hay publicaciones'}</p>
				)}
			</div>
		</>
	);
}

Publicaciones.propTypes = {
	publicaciones: PropTypes.arrayOf(
		PropTypes.shape({
			fieldData: PropTypes.shape({
				primaryKey: PropTypes.string.isRequired,
				titulo: PropTypes.string.isRequired,
				PDF: PropTypes.string.isRequired,
			}).isRequired,
		})
	),
};

export default Publicaciones;
