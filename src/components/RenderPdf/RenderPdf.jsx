import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import PropTypes from 'prop-types';

function RenderPdf({ pdfUrl, titulo, descripcion, primaryKey, fecha, wf }) {
	// console.log(wf);
	// console.log(titulo);

	return (
		<div
			style={{
				width: '100%',
				height: 'calc(100% - 100px)',
				overflow: 'hidden',
				padding: '10px',
				cursor: 'pointer',
				pointerEvents: 'none',
			}}
		>
		<Worker
			workerUrl={`https://unpkg.com/pdfjs-dist@3.11/build/pdf.worker.min.js`}
		>
			<Viewer fileUrl={pdfUrl} />
			<div
				style={{
					width: '100%',
					height: 'calc(100% - 100px)',
					overflow: 'hidden',
					padding: '10px',
					cursor: 'pointer',
				}}
			></div>
		</Worker>
		</div>
	);
}

RenderPdf.propTypes = {
	pdfUrl: PropTypes.string.isRequired,
	titulo: PropTypes.string, // Add this if 'titulo' is also a prop
	descripcion: PropTypes.string, // Add this if 'descripcion' is also a prop
	primaryKey: PropTypes.string, // Add this if 'primaryKey' is also a prop
	fecha: PropTypes.string.isRequired, // Add 'fecha' to propTypes
};

export default RenderPdf;
