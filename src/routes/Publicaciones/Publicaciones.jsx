import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import './Publicaciones.css';
import PropTypes from 'prop-types';
import { getPdf } from '../../utils/api.js';
import RenderPdf from '../../components/RenderPdf/RenderPdf.jsx';
import arrowRight from '../../images/arrow-right.svg';

const searchSchema = z.object({
	search: z.string().optional(),
});

function Publicaciones({ publicaciones = [] }) {
	// console.log('publicaciones', publicaciones);
	const lastThree = publicaciones.slice(0, 3);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting, isSubmitted, isValid },
	} = useForm({
		resolver: zodResolver(searchSchema),
		mode: 'onChange',
		defaultValues: {
			search: '',
		},
	});

	const handleSearch = async (data) => {
		console.log(data);
		reset();
	};
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
				// console.log('No hay pdf');
				return;
			}

			setPdfUrls((prevUrls) => [
				{ pdf, titulo, descripcion, primaryKey, fecha },
				...prevUrls,
			]);
			setLoading(false);
		};
		lastThree.map((publicacion) => {
			// console.log('publicacion', publicacion);
			const {
				fieldData: { PDF, titulo, descripcion, primaryKey, fecha },
			} = publicacion;
			if (PDF !== '') {
				fetchPdf(PDF, titulo, descripcion, primaryKey, fecha);
			}
		});
	}, [publicaciones]);

	return (
		<>
			<h1 className="publicaciones__title">PUBLICACIONES</h1>
			<div className="publicaciones__container">
				<h2>Más recientes</h2>
				<div className="publicaciones__pdf">
					{pdfUrls.length > 0 ? (
						pdfUrls.map(
							({ pdf, titulo, descripcion, primaryKey, fecha }, index) => (
								<div
									key={index}
									style={{
										margin: '0 auto',
										border: '1px solid #cccccc3d',
										width: '100%',
										height: '400px',
										overflow: 'hidden',
										// margin: '10px',
										borderRadius: '10px',
										// backgroundColor: '#f0f0f0',
										// padding: '10px',
										boxShadow: 'rgb(0 0 0 / 32%) 5px 5px 4px 1px',
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
											backgroundColor: '#f6f6f6',
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
												whiteSpace: 'nowrap',
												overflow: 'hidden',
												textOverflow: 'ellipsis',
												width: '100%', // Asegrate de que el contenedor tenga un ancho definido
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
				<div className="publicaciones__sidebar">
					<div className="publicaciones__sidebar__title">
						<h2>Publicaciones Anteriores</h2>
						<form className="publicaciones__sidebar__form" onSubmit={handleSubmit(handleSearch)}>
							<input
								{...register('search')}
								name="search"
								type="text"
								placeholder="Buscar"
								className="publicaciones__sidebar__form__input"
							/>
							<button
								disabled={isSubmitting}
								type="submit"
								className="publicaciones__sidebar__form__button"
							>
								{isSubmitting ? 'Buscando...' : 'Buscar'}
							</button>
						</form>
					</div>
					<div className="publicaciones__sidebar__list">
						<ul>
							{publicaciones.slice(3).map((publicacion) => (
								<a href={`/publicaciones/${publicacion.fieldData.primaryKey}`} key={publicacion.fieldData.primaryKey}>
									<li>{publicacion.fieldData.titulo}</li>
								</a>
							))}
						</ul>
					</div>
				</div>
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
