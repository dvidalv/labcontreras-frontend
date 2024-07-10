import { useNavigate } from 'react-router-dom';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import PropTypes from 'prop-types';

function RenderPdf({ pdfUrl, titulo, descripcion, primaryKey, fecha, wf }) {
	// console.log(wf);
	// console.log(titulo);
	const navigate = useNavigate();
	function handleClick(primaryKey) {
		navigate(`/publicaciones/${primaryKey}`);
	}
	return (
		<Worker
			style={{ position: 'relative' }}
			workerUrl={`https://unpkg.com/pdfjs-dist@3.11/build/pdf.worker.min.js`}
		>
			<div
				style={{
					position: 'relative',
					height: wf ? '100%' : '350px',
					width: wf ? '' : '250px',
					border: '1px solid rgba(0, 0, 0, 0.3)',
					padding: wf ? '0px' : '10px', // padding alrededor del Viewer
					boxSizing: 'border-box', // incluye el padding en el tamaño total
					backgroundColor: 'rgba(0, 0, 0, 0.8)',
					cursor: wf ? 'default' : 'pointer',
					// overflow: 'hidden',
				}}
			>
				<div
					// header
					style={{
						position: 'absolute',
						top: 18,
						left: 15,
						width: '100%',
						// backgroundColor: 'red',
						color: 'white',
						zIndex: 1,
						wordWrap: 'break-word',
						textAlign: 'left',
						fontSize: '10px',
						textOverflow: 'ellipsis',
						overflow: 'hidden',
						whiteSpace: 'nowrap',
					}}
				>
					{wf ? '' : `Fecha Publicación: ${fecha}`}
				</div>
				<div
					style={{
						position: 'relative',
						height: 'calc(100% - 50px)', // ajusta la altura para el padding y el espacio del header y footer
						width: '100%',
						marginTop: wf ? '0px' : '25px', // espacio para el header
						marginBottom: wf ? '0px' : '25px', // espacio para el footer
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
					{!wf && <div
						style={{
							position: 'absolute',
							top: 0,
							left: 0,
							width: '100%',
							height: '100%',
							backgroundColor: 'transparent',
							zIndex: 2,
							cursor: 'pointer',
						}}
						onClick={() => {
							handleClick(primaryKey);
						}}
					></div>}
				</div>
				<div
					style={{
						position: 'absolute',
						bottom: 5,
						left: 5,
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
					{titulo}
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
	titulo: PropTypes.string, // Add this if 'titulo' is also a prop
	descripcion: PropTypes.string, // Add this if 'descripcion' is also a prop
	primaryKey: PropTypes.string, // Add this if 'primaryKey' is also a prop
	fecha: PropTypes.string.isRequired, // Add 'fecha' to propTypes
};

export default RenderPdf;
