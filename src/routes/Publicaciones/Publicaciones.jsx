import { useState, useEffect } from 'react';
import './Publicaciones.css';
import PropTypes from 'prop-types';
import { getPdf } from '../../utils/api.js';
import RenderPdf from '../../components/RenderPdf/RenderPdf.jsx';

function Publicaciones({ publicaciones = [] }) {
	// console.log('publicaciones')
	const [pdfUrls, setPdfUrls] = useState([]);
	const [loading, setLoading] = useState(false);
	// console.log(pdfUrls);

	useEffect(() => {
		const fetchPdf = async (PDF) => {
			setLoading(true);
			const pdf = await getPdf(PDF);
			setPdfUrls((prevUrls) => [...prevUrls, pdf]);
			setLoading(false);
		};
		publicaciones.forEach((publicacion) => {
			// console.log('publicacion', publicacion)
			const {
				fieldData: { PDF },
			} = publicacion;
			fetchPdf(PDF);
		});
	}, [publicaciones]);

	return (
		<div className="publicaciones">
			<h1>PUBLICACIONES</h1>
			<div className="publicaciones__container">
				{pdfUrls.length > 0 ? (
					pdfUrls.map((url, index) => <RenderPdf key={index} pdfUrl={url} />)
				) : (
					<p>{loading ? 'Cargando PDF...' : 'No hay publicaciones'}</p>
				)}
			</div>
		</div>
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
