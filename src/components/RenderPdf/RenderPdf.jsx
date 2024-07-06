import { Worker, Viewer, Position } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import PropTypes from 'prop-types';

function RenderPdf({ pdfUrl }) {
	return (
		<Worker
			style={{ position: 'relative' }}
			workerUrl={`https://unpkg.com/pdfjs-dist@3.11/build/pdf.worker.min.js`}
		>
			<div
				style={{
					position: 'relative',
					height: '350px',
					width: '250px',
					border: '1px solid rgba(0, 0, 0, 0.3)',
				}}
			>
				<Viewer fileUrl={pdfUrl} />
				<div
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						backgroundColor: 'rgba(0, 0, 0, 0.5)',
						width: '100%',
						height: '100%',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						color: 'white',
						fontSize: '20px',
						fontWeight: 'bold',
						cursor: 'pointer',
					}}
				>
					Ver...
				</div>
			</div>
		</Worker>
	);
}

RenderPdf.propTypes = {
	pdfUrl: PropTypes.string.isRequired,
};

export default RenderPdf;
