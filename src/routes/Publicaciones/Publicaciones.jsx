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
		const fetchPdf = async (PDF, titulo, descripcion, primaryKey) => {
			setLoading(true);
			const pdf = await getPdf(PDF);
			// console.log(pdf);
			
			if(!pdf) {
				setLoading(false);
				console.log('No hay pdf');
				return;
			}

			setPdfUrls((prevUrls) => [{ pdf, titulo, descripcion, primaryKey }, ...prevUrls]);
			setLoading(false);
		};
		publicaciones.map((publicacion) => {
			// console.log('publicacion', publicacion);
			const {
				fieldData: { PDF, titulo, descripcion, primaryKey},
			} = publicacion;
			fetchPdf(PDF, titulo, descripcion, primaryKey);
		});
	}, [publicaciones]);

	return (
		<>
			<h1 className="publicaciones__title">PUBLICACIONES</h1>
			<div className="publicaciones__container">
				{pdfUrls.length > 0 ? (
					pdfUrls.map(({ pdf, titulo, descripcion, primaryKey }, index) => <RenderPdf key={index} pdfUrl={pdf} titulo={titulo} descripcion={descripcion} primaryKey={primaryKey} />)
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
				primaryKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
				titulo: PropTypes.string.isRequired,
				PDF: PropTypes.string.isRequired,
			}).isRequired,
		})
	),
};

export default Publicaciones;
