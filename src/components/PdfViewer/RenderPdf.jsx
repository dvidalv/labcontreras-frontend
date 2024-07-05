import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import PropTypes from 'prop-types';

function RenderPdf({ pdfUrl }) {
	return (
		<Worker
			workerUrl={`https://unpkg.com/pdfjs-dist@3.11/build/pdf.worker.min.js`}
		>
			<div
				style={{
					height: '750px',
					width: '100%',
					border: '1px solid rgba(0, 0, 0, 0.3)',
				}}
			>
				<Viewer fileUrl={pdfUrl} />
			</div>
		</Worker>
	);
}

RenderPdf.propTypes = {
    pdfUrl: PropTypes.string.isRequired,
};

export default RenderPdf;
