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
					padding: '10px', // padding alrededor del Viewer
					boxSizing: 'border-box', // incluye el padding en el tamaño total
				}}
			>
				<div
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						width: '100%',
						// backgroundColor: 'rgba(0, 0, 0, 0.7)',
						color: 'white',
						textAlign: 'center',
						padding: '8px 0',
						zIndex: 1,
					}}
				>
					Título del PDF
				</div>
				<div
					style={{
						position: 'relative',
						height: 'calc(100% - 50px)', // ajusta la altura para el padding y el espacio del header y footer
						width: '100%',
						marginTop: '20px', // espacio para el header
						marginBottom: '20px', // espacio para el footer
						zIndex: 1,
					}}
				>
					<Viewer fileUrl={pdfUrl} />
				</div>
				<div
					style={{
						position: 'absolute',
						bottom: 0,
						left: 0,
						width: '100%',
						// backgroundColor: 'rgba(0, 0, 0, 0.7)',
						color: 'white',
						textAlign: 'center',
						padding: '10px 0',
						zIndex: 1,
					}}
				>
					Descripción del PDF
				</div>
				<div
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						width: '100%',
						height: '100%',
						backgroundColor: 'rgba(0, 0, 0, 0.5)', // tono opaco
					}}
				></div>
			</div>
		</Worker>
	);
}

RenderPdf.propTypes = {
	pdfUrl: PropTypes.string.isRequired,
};

export default RenderPdf;
