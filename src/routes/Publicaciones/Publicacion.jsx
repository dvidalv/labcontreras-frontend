import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Publicacion.css';
import { getPublicacion, getPdf } from '../../utils/api';
import RenderPdf from '../../components/RenderPdf/RenderPdf.jsx';
import Preloader from '../../components/Preloader/Preloader.jsx';

function Publicacion() {
	const { id } = useParams();
	const [publicacion, setPublicacion] = useState(null);
	const [pdf, setPdf] = useState(null);
	const [loading, setLoading] = useState(true);


// console.log(publicacion);

	useEffect(() => {
		window.scrollTo(0, 0);

		const fetchPublicacion = async () => {
			try {
				const publicacion = await getPublicacion(id);
				setLoading(true);

				const {
					response: { data },
				} = publicacion;

				if(!data){
					throw new Error('No se encontró la publicación');
				}

				const datos = data[0].fieldData;
				const { titulo, descripcion, PDF, fecha } = datos;
				
				const pdf = await getPdf(PDF);
				
				setPublicacion((prev) => ({...prev, titulo, descripcion, pdf, fecha}));
				setLoading(false);
			} catch (error) {
				console.error(error);
			}
		};
		fetchPublicacion();
	}, [id]);

	return (
		<div className="publicacion" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: loading ? '50vh' : 'auto'}}>
			{loading ? (
				<Preloader />
			) : publicacion ? (
				<RenderPdf pdfUrl={publicacion.pdf} description={publicacion.descripcion} title={publicacion.titulo} fecha={publicacion.fecha} wf={true} />
			) : (
				<p>No se encontró la publicación</p>
			)}
		</div>
	);
}

export default Publicacion;
