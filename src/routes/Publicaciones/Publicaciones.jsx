import React, { useState, useEffect } from 'react';
import './Publicaciones.css';
import PdfCard from '../../components/PdfCard/PdfCard.jsx';
import PropTypes from 'prop-types';
import { getPdf } from '../../utils/api.js';
import RenderPdf from '../../components/PdfViewer/RenderPdf.jsx';

function Publicaciones({ publicaciones = [] }) {
	const [pdfUrls, setPdfUrls] = useState([]);

	useEffect(() => {
		const fetchPdf = async (PDF) => {
			const pdf = await getPdf(PDF);
			setPdfUrls((prevUrls) => [...prevUrls, pdf]);
		};
		publicaciones.forEach((publicacion) => {
			const {
				fieldData: { PDF },
			} = publicacion;
			fetchPdf(PDF);
		});
	}, [publicaciones]);

	return (
    <div>
      <h1>Visor de PDF</h1>
      {pdfUrls.length > 0 ? (
        pdfUrls.map((url, index) => <RenderPdf key={index} pdfUrl={url} />)
      ) : (
        <p>Cargando PDF...</p>
      )}
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
