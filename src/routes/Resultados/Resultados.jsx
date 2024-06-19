import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import './Resultados.css';
import pdfIconGris from '../../images/pdf_gray.svg';
import { getFileMakerToken, getResultados } from '../../utils/api';
import Preloader from '../../components/Preloader/Preloader';

function Resultados() {
	const [token, setToken] = useState(null);
	const [records, setRecords] = useState([]);
	const [loading, setLoading] = useState(false);

	const schema = z.object({
		search: z.string().optional(), //
	});

	const { register, handleSubmit: handleSubmitForm } = useForm({
		defaultValues: { search: '' },
		resolver: zodResolver(schema),
	});

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
				// console.log(messages);
			} catch (error) {
				console.error('Error al obtener el token:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchToken();
	}, []);

	const onSubmit = async (data) => {
		console.log(data);
		if (records.length > 0) {
			setRecords([]);
		}

		if (token && data.search === '') {
			const records = async () => {
				try {
					setLoading(true);
					const resultados = await getResultados(token);
					const {
						response: { data },
					} = resultados;
					// console.log(data);
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
		} else {
			console.log('Buscando resultados por nombre');
		}
	};

	return (
		<>
			{loading && <Preloader />}
			<div className="resultados">
				<h1 className="resultados__title">Resultados</h1>
				<form
					className="resultados__form"
					onSubmit={handleSubmitForm(onSubmit)}
				>
					<input type="text" placeholder="Buscar" {...register('search')} />
					<button
						className="resultados__form__button"
						type="submit"
						disabled={!token}
					>
						Buscar
					</button>
				</form>
				{token ? null : <p>{token?.messages}</p>}
				{records.length > 0 ? (
					<div className="resultados__table__container">
						<table className="resultados__table">
							<thead className="resultados__table__thead">
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
							{records.length === 0
								? `${loading ? 'Buscando...' : 'Presione Buscar'}`
								: 'No hay resultados'}
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
