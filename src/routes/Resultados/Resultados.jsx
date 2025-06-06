import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import './Resultados.css';
import pdfIconGris from '../../images/pdf_gray.svg';
import pdfIcon from '../../images/pdf.svg';
import {
	getFileMakerToken,
	getResultados,
	getResultadosByName,
	isTokenExpired,
} from '../../utils/api';
import Preloader from '../../components/Preloader/Preloader';
import { useAppContext } from '../../contexts/MyContext';

import WhatsApp from '../../components/WhatsApp/WhatsApp';
import { Toaster, toast } from "react-hot-toast";

function Resultados() {
	const [records, setRecords] = useState([]);
	const [loading, setLoading] = useState(false);
	const { fileMakerToken, setFileMakerToken, medicoUser } = useAppContext();
	// console.log(medicoUser);

	// console.log(records);
	const schema = z.object({
		search: z.string().optional(), //
	});

	const {
		register,
		handleSubmit: handleSubmitForm,
		setError,
		formState: { errors, isSubmitting },
	} = useForm({
		defaultValues: { search: '' },
		resolver: zodResolver(schema),
	});

	const medicoId = JSON.parse(localStorage.getItem('medicoUser')).ID;
	// console.log(medicoId);
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		setLoading(true);
		const fetchToken = async () => {
			try {

				if (!fileMakerToken || isTokenExpired()) {

					const response = await getFileMakerToken();

					const res = await response;

					if (response.error === 'Service Unavailable') {
						throw new Error(
							'El servicio no esta disponible, por favor intente mas tarde'
						);
					}
					localStorage.setItem('tokenTimestamp', new Date().getTime());
					localStorage.setItem('fileMakerToken', res.response.token);
					setFileMakerToken(res.response.token);
				}
			} catch (error) {
				setError('root', {
					type: 'manual',
					message: error.message || 'Error al obtener el token',
				});
				toast.error('Error al obtener el token', {
					duration: 3000,
				});
			} finally {
				// console.log('Entra en finally');
				const tokenTimestamp = localStorage.getItem('tokenTimestamp');
				if (tokenTimestamp) {
					const now = new Date().getTime();
					const timeElapsed = now - tokenTimestamp;
					const timeRemaining = 900000 - timeElapsed; // 15 minutes in milliseconds
					const minutesRemaining = Math.floor(timeRemaining / 60000);
					// console.log(`Tiempo restante: ${minutesRemaining} minutos`);
				}
				setLoading(false);
			}
		};

		fetchToken();
	}, [fileMakerToken, setError, setFileMakerToken]);
	// console.log(fileMakerToken);

	const onSubmit = async (data) => {
		if (records.length > 0) {
			setRecords(() => []);
		}

		if (fileMakerToken && data.search === '') {

			try {
				// console.log('Buscando todos los registros');
				setLoading(true);
				// console.log(data)
				const resultados = await getResultados(fileMakerToken, medicoId, medicoUser.centroExterno);
				// console.log(resultados);
				const {
					response: { data },
				} = resultados;
				// console.log(data);
				data.map((record) => {
					const { fieldData } = record;
					setRecords((prev) => [...prev, fieldData]);
					localStorage.setItem('resultados', JSON.stringify(data));
				});
			} catch (error) {
				toast.error('Error al obtener los resultados, por favor salga y vuelva a entrar al sistema', {
					duration: 3000,
				});

				setError('root', {
					type: 'manual',
					message: 'Error al obtener los resultados, por favor salga y vuelva a entrar al sistema',
				});
			} finally {
				
				setLoading(false);

			}
		} else {
			try {
				// console.log('Busco por nombre');

				setLoading(true);
				const token = fileMakerToken;
				const name = data.search; // Nombre del paciente
				const resultados = await getResultadosByName(token, name, medicoId, medicoUser.centroExterno);
				// console.log(resultados.messages[0].code);
				const {
					response: { data: responseData },
				} = resultados;
				// console.log(responseData);
				responseData.map((record) => {
					const { fieldData } = record;
					setRecords((prev) => [...prev, fieldData]);
					localStorage.setItem('resultados', JSON.stringify(responseData));
				});
			} catch (error) {
				toast.error('No se encontraron resultados', {
					duration: 3000,
				});
				setError('root', {
					type: 'manual',
					message: 'No se encontraron resultados',
				});
			} finally {
				setLoading(false);
			}
		}
	};

	// console.log(localStorage.getItem('medicoUser'));

	return (
		<>
			<Toaster />
			{loading && <Preloader />}
			<div className="resultados">
				<h1 className="resultados__title">Resultados</h1>
				<form
					className="resultados__form"
					onSubmit={handleSubmitForm(onSubmit)}
				>
					<div className="resultados__form__container">
						<div className="resultados__form__input">
							<input
								type="text"
								placeholder="Presione ENTER o escriba el nombre del paciente aqui"
								{...register('search')}
							/>
							{errors.search && (
								<p className="resultados__form__error">
									{errors.search.message}
								</p>
							)}
							{errors.root && (
								<p className="resultados__form__error">{errors.root.message}</p>
							)}
						</div>
						<button
							className="resultados__form__button"
							type="submit"
							disabled={!fileMakerToken || isSubmitting}
						>
							{isSubmitting ? 'Buscando Estudios...' : 'Buscar'}
						</button>
					</div>
				</form>
				{fileMakerToken ? null : <p>{fileMakerToken?.messages}</p>}
				{records.length > 0 ? (
					<div className="resultados__table__container">
						<table className="resultados__table">
							<thead className="resultados__table__thead">
								<tr>
									<th className="centrado w-small">FECHA</th>
									<th className="centrado w-medium">NO. ESTUDIO</th>
									<th className="centrado w-large">NOMBRE DEL PACIENTE</th>
									<th className="centrado w-small">ESTADO</th>
									{/* <th className="centrado w-small">PAGADO</th> */}
									<th className="resultados__table__descargar_th centrado">
										DESCARGAR
									</th>
								</tr>
							</thead>
							<tbody>
								{records.map((record) => {
									// console.log(record);
									const {
										NUMERO_ESTUDIO_FK,
										ESTADO_ESTUDIO,
										PAGO_ESTADO,
										DEUDA,
										FECHA_ENTRADA,
										Nombre_Completo,
										ID,
										Url_Resultado,
										webReady
									} = record;
									// console.log(webReady);
							

									return (
										<tr key={record.ID}>
											<td className={`centrado ${DEUDA > 0 ? 'deuda' : ''}`}>
												{FECHA_ENTRADA}
											</td>
											<td className={`estudio centrado ${DEUDA > 0 ? 'deuda' : ''}`}>
												{NUMERO_ESTUDIO_FK}
											</td>
											<td className={`centrado ${DEUDA > 0 ? 'deuda' : ''}`}>
												{Nombre_Completo}
											</td>
											<td className={`centrado ${DEUDA > 0 ? 'deuda' : ''}`}>
												{/* {ESTADO_ESTUDIO !== 'Listo' ? 'En Proceso' : 'Listo'} */}
												{ESTADO_ESTUDIO}
											</td>
											{/* <td className="centrado">{PAGO_ESTADO}</td> */}
											<td className="resultados__table__descargar">
												<a
													data-id={ID}
													download
													href={Url_Resultado === '' ? '#' : DEUDA > 0 ? '' : webReady ? Url_Resultado : '#'}
													className={`resultados__table__descargar__link ${
														DEUDA > 0 ? 'deuda' : ''
													}`}
													target={Url_Resultado === '' ? '_self' : '_blank'}
													style={{
														pointerEvents:
															Url_Resultado === '' ? 'none' : DEUDA > 0 || !webReady ? 'none' : 'auto',
														color: DEUDA > 0 || !webReady ? '#d2caca' : 'auto',
													}}
												>
													{/* {DEUDA > 0 ? '' : Url_Resultado ? 'Descargar' : ''} */}
													<img
														src={DEUDA > 0 || !webReady ? pdfIconGris : Url_Resultado === '' ? pdfIconGris : pdfIcon}
														alt="PDF Icon"
													/>
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
						{/* <h2 style={{fontSize: '16px', textAlign: 'center', fontWeight: 'lighter'}}>
							{records.length === 0
								? `${loading ? 'Buscando...' : 'Presione Buscar'}`
								: 'No hay resultados'}
						</h2> */}
					
					</div>
				)}
			
			<WhatsApp />
			</div>
		</>
	);
}

export default Resultados;
