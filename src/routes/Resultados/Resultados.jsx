import { useRef, useEffect, useState } from 'react';
import './Resultados.css';
import pdfIcon from '../../images/pdf.svg';
import pdfIconGris from '../../images/pdf_gray.svg';
import { getFileMakerToken, getResultados } from '../../utils/api';
import Preloader from '../../components/Preloader/Preloader';

function Resultados() {
	const [token, setToken] = useState(null);
	const [records, setRecords] = useState([]);
	const [loading, setLoading] = useState(false);


	// console.log(records);

	// console.log(token)
	useEffect(() => {
		setLoading(true);
		const fetchToken = async () => {
			try {
				const tokenData = await getFileMakerToken();

				const {
					messages,
					response: { token },
				} = tokenData;
				setToken(token);
				// console.log(token);
			} catch (error) {
				console.error('Error al obtener el token:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchToken();
	}, []);

	const searchRef = useRef();
	const formRef = useRef();
	const handleSubmit = (e) => {
		// if(records.length > 0){
		// 	setRecords([]);
		// }
		e.preventDefault();

		if (token && searchRef.current.value === '') {
			const records = async () => {
				try {
					setLoading(true);
					const resultados = await getResultados(token);
					const {
						response: { data },
					} = resultados;
					console.log(data);
					data.map((record) => {
						setRecords((prev) => [...prev, record.fieldData]);
					});
				} catch (error) {
					console.error('Error al obtener los resultados:', error);
				} finally {
					setLoading(false);
				}
			};
			records();
		} else if (token && searchRef.current.value !== '') {
			console.log('Buscando resultados por nombre');
		}

		formRef.current.reset();
	};

	return (
		<>
			{loading && <Preloader />}
			<div className="resultados">
				<h1 className="resultados__title">Resultados</h1>
				<form
					className="resultados__form"
					onSubmit={handleSubmit}
					ref={formRef}
				>
					<input type="text" placeholder="Buscar" ref={searchRef} />
					<button
						className="resultados__form__button"
						type="submit"
						disabled={!token}
					>
						Buscar
					</button>
				</form>
				{records.length > 0 ? (
					<div className="resultados__table__container">
						<table className="resultados__table">
							<thead>
								<tr>
									<th className="centrado w-small">FECHA</th>
									<th className="centrado w-medium">NO. ESTUDIO</th>
									<th className="centrado w-large">NOMBRE DEL PACIENTE</th>
									<th className="centrado w-small">ESTADO</th>
									<th className="centrado w-small">PAGADO</th>
									<th className="resultados__table__descargar_th centrado">
										DESCARGAR
									</th>
								</tr>
							</thead>
							<tbody>
								{records.map((record) => {
									const {
										NUMERO_ESTUDIO_FK,
										ESTADO_ESTUDIO,
										PAGO_ESTADO,
										FECHA_ENTRADA,
										Nombre_Completo,
									} = record;
									return (
										<tr key={record.ID}>
											<td className="centrado">{FECHA_ENTRADA}</td>
											<td className="centrado">{NUMERO_ESTUDIO_FK}</td>
											<td className="centrado">{Nombre_Completo}</td>
											<td className="centrado">{ESTADO_ESTUDIO}</td>
											<td className="centrado">{PAGO_ESTADO}</td>
											<td className="resultados__table__descargar">
												<a
													href="#"
													className="resultados__table__descargar__link debe"
												>
													Descargar
													<img src={pdfIconGris} alt="PDF Icon" />
												</a>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				) : (
					<div className="resultados__table__no_records">
						<h2 className="resultados__table__no_records__title">
							No hay resultados
						</h2>
						<p className="resultados__table__no_records__subtitle">
							Solo presiona buscar para ver los resultados o escribe un nombre y
							preciona buscar
						</p>
					</div>
				)}
			</div>
		</>
	);
}

export default Resultados;
