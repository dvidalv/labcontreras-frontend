import './PdfCard.css';
import PropTypes from 'prop-types';
import PdfWiewer from '../RenderPdf/PdfWiewer.jsx';

const PdfCard = (pdf) => {
	// console.log(pdf)
	// const data = { url: pdf }
	// console.log(data)

	return (
		<div className="pdfCardContainerStyle">
			<embed src={pdf} />
			<button className="pdfCardButton">Ver Publicación</button>
		</div>
	);
};

PdfCard.propTypes = {
	pdf: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
};

export default PdfCard;
