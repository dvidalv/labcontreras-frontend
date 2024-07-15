import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Publicaciones.css';
import PropTypes from 'prop-types';
import { getPdf } from '../../utils/api.js';
import RenderPdf from '../../components/RenderPdf/RenderPdf.jsx';
import arrowRight from '../../images/arrow-right.svg';

function Publicaciones({ publicaciones = [] }) {
	// console.log('publicaciones')
	const navigate = useNavigate();
	const [pdfUrls, setPdfUrls] = useState([]);
	const [loading, setLoading] = useState(false);
	// console.log(pdfUrls);

	useEffect(() => {
		const fetchPdf = async (PDF, titulo, descripcion, primaryKey, fecha) => {
			setLoading(true);
			const pdf = await getPdf(PDF);
			// console.log(pdf);

			if (!pdf) {
				setLoading(false);
				console.log('No hay pdf');
				return;
			}

			setPdfUrls((prevUrls) => [
				{ pdf, titulo, descripcion, primaryKey, fecha },
				...prevUrls,
			]);
			setLoading(false);
		};
		publicaciones.map((publicacion) => {
			// console.log('publicacion', publicacion);
			const {
				fieldData: { PDF, titulo, descripcion, primaryKey, fecha },
			} = publicacion;
			fetchPdf(PDF, titulo, descripcion, primaryKey, fecha);
		});
	}, [publicaciones]);

	return (
		<>
			<h1 className="publicaciones__title">PUBLICACIONES</h1>
			<div className="publicaciones__container">
				{pdfUrls.length > 0 ? (
					pdfUrls.map(
						({ pdf, titulo, descripcion, primaryKey, fecha }, index) => (
							<div
								key={index}
								style={{
									margin: '0 auto',
									border: '1px solid #ccc',
									width: '100%',
									height: '400px',
									overflow: 'hidden',
									// margin: '10px',
									borderRadius: '10px',
									backgroundColor: '#f0f0f0',
									// padding: '10px',
								}}
							>
								<RenderPdf
									pdfUrl={pdf}
									titulo={titulo}
									descripcion={descripcion}
									primaryKey={primaryKey}
									fecha={fecha}
								/>
								<footer
									style={{
										display: 'flex',
										flexDirection: 'column',
										justifyContent: 'center',
										alignItems: 'center',
										backgroundColor: '#ccc',
										width: '100%',
										height: '100px',
										padding: '10px',
										color: '#000',
										margin: '0 auto',
									}}
								>
									<p
										style={{
											fontSize: '16px',
											fontWeight: 'normal',
											textAlign: 'center',
											whitespace: 'nowrap',
											overflow: 'hidden',
											textOverflow: 'ellipsis',
										}}
									>
										{titulo}
									</p>
									<span
										style={{
											fontSize: '12px',
											fontWeight: 'bold',
											cursor: 'pointer',
											alignSelf: 'center',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											gap: '5px',
										}}
										onClick={() => {
											navigate(`/publicaciones/${primaryKey}`);
										}}
									>
										Leer mas{' '}
										<img
											src={arrowRight}
											alt="arrow-right"
											style={{ width: '15px', height: '15px' }}
										/>
										
									</span>
								</footer>
							</div>
						)
					)
				) : (
					<p>
						{loading ? 'Cargando publicaciones...' : 'No hay publicaciones'}
					</p>
				)}
			</div>
		</>
	);
}

Publicaciones.propTypes = {
	publicaciones: PropTypes.arrayOf(
		PropTypes.shape({
			fieldData: PropTypes.shape({
				primaryKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
					.isRequired,
				titulo: PropTypes.string.isRequired,
				PDF: PropTypes.string.isRequired,
			}).isRequired,
		})
	),
};

export default Publicaciones;
