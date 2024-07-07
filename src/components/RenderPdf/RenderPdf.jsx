import { Worker, Viewer, Position } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import PropTypes from 'prop-types';

function RenderPdf({ pdfUrl, titulo, descripcion }) {
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
						padding: '8px 10px',
						zIndex: 1,
						wordWrap: 'break-word',
						textAlign: 'left',
						fontSize: '10px',
						textTransform: 'uppercase',
						textOverflow: 'ellipsis',
						overflow: 'hidden',
						whiteSpace: 'nowrap',
					}}
				>
					{titulo}
				</div>
				<div
					style={{
						position: 'relative',
						height: 'calc(100% - 50px)', // ajusta la altura para el padding y el espacio del header y footer
						width: '100%',
						marginTop: '25px', // espacio para el header
						marginBottom: '25px', // espacio para el footer
						zIndex: 1,
						border: '1px solid rgba(0, 0, 0, 0.3)',
						borderRadius: '10px',
						overflow: 'hidden',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Viewer fileUrl={pdfUrl} />
					{/* Div transparente para bloquear la interacción */}
					<div
						style={{
							position: 'absolute',
							top: 0,
							left: 0,
							width: '100%',
							height: '100%',
							backgroundColor: 'transparent',
							zIndex: 2,
						}}
					></div>
				</div>
				<div
					style={{
						position: 'absolute',
						bottom: 0,
						left: 0,
						width: '100%',
						// backgroundColor: 'rgba(0, 0, 0, 0.7)',
						color: 'white',
						textAlign: 'left',
						padding: '10px 10px 10px 10px',
						zIndex: 1,
						fontSize: '10px',
						textTransform: 'uppercase',
						textOverflow: 'ellipsis',
						overflow: 'hidden',
						whiteSpace: 'nowrap',
					}}
				>
					{descripcion}
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
