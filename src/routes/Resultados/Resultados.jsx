import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import './Resultados.css';
import pdfIconGris from '../../images/pdf_gray.svg';
import pdfIcon from '../../images/pdf.svg';
import medicoAvatar from '../../images/medico-avatar.svg';
import {
	getFileMakerToken,
	getResultados,
	getResultadosByName,
	isTokenExpired,
} from '../../utils/api';
import Preloader from '../../components/Preloader/Preloader';
import { useAppContext } from '../../contexts/MyContext';

function Resultados() {

	const [records, setRecords] = useState([]);
	const [loading, setLoading] = useState(false);
	const { fileMakerToken, setFileMakerToken, medicoUser } = useAppContext();
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

	let medicoImage = JSON.parse(localStorage.getItem('medicoUser')).foto;
	if(medicoImage === '') {
		medicoImage = medicoAvatar;
	}
	const medicoId = JSON.parse(localStorage.getItem('medicoUser')).ID;
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		setLoading(true);
		const fetchToken = async () => {
			try {
				// console.log(fileMakerToken);
				// console.log(isTokenExpired());
				if (!fileMakerToken || isTokenExpired()) {
					// console.log('No hay token');
					// console.log(isTokenExpired());
					const response = await getFileMakerToken();
					// console.log(response);
					const res = await response;
					// console.log(res.error);
					// console.log(response.messages[0].message);
					// console.log(response);

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

		// Función para obtener un nuevo token si ha expirado
		const refreshTokenIfNeeded = async () => {
			// console.log(isTokenExpired());
			if (!fileMakerToken || isTokenExpired()) {
				console.log('Entra en refreshTokenIfNeeded');
				console.log('Refresco el token');
				try {
					setLoading(true);
					const fileMakerToken = await getFileMakerToken();
					const {
						response: { token: newToken },
					} = fileMakerToken;
					setFileMakerToken(newToken);
					localStorage.setItem('tokenTimestamp', new Date().getTime());
					localStorage.setItem('fileMakerToken', newToken);
				} catch (error) {
					console.log(1);
					setError('root', {
						type: 'manual',
						message: 'Error al obtener el token',
					});
				} finally {
					console.log(2);
					setLoading(false);
				}
			}
		};

		const refreshToken = await refreshTokenIfNeeded();
		// console.log(refreshToken);

		if (fileMakerToken && data.search === '') {
			// console.log(4);
			// console.log(fileMakerToken);
			// console.log(data.search);
			try {
				// console.log('Buscando todos los registros');
				setLoading(true);
				// console.log(data)
				const resultados = await getResultados(fileMakerToken, medicoId);
				// console.log(resultados);
				const {
					response: { data },
				} = resultados;
				// console.log(data);
				data.map((record) => {
					setRecords((prev) => [...prev, record.fieldData]);
				});
			} catch (error) {
				console.log(3);
				setError('root', {
					type: 'manual',
					message: 'Error al obtener los resultados',
				});
			} finally {
				setLoading(false);
			}
		} else {
			try {
				// console.log('Busco por nombre');

				setLoading(true);
				const token = fileMakerToken;
				const name = data.search;
				const resultados = await getResultadosByName(token, name, medicoId);
				// console.log(resultados.messages[0].code);
				const {
					response: { data: responseData },
				} = resultados;
				// console.log(responseData);
				responseData.map((record) => {
					setRecords((prev) => [...prev, record.fieldData]);
				});
			} catch (error) {
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
								placeholder="Presione ENTER o escriba el nombre del paciente"
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
									// console.log(record.DEUDA);
									const {
										NUMERO_ESTUDIO_FK,
										ESTADO_ESTUDIO,
										PAGO_ESTADO,
										DEUDA,
										FECHA_ENTRADA,
										Nombre_Completo,
										ID,
										Url_Resultado,
									} = record;

									return (
										<tr key={record.ID}>
											<td className={`centrado ${DEUDA > 0 ? 'deuda' : ''}`}>
												{FECHA_ENTRADA}
											</td>
											<td className={`centrado ${DEUDA > 0 ? 'deuda' : ''}`}>
												{NUMERO_ESTUDIO_FK}
											</td>
											<td className={`centrado ${DEUDA > 0 ? 'deuda' : ''}`}>
												{Nombre_Completo}
											</td>
											<td className={`centrado ${DEUDA > 0 ? 'deuda' : ''}`}>
												{ESTADO_ESTUDIO !== 'Listo' ? 'En Proceso' : 'Listo'}
											</td>
											{/* <td className="centrado">{PAGO_ESTADO}</td> */}
											<td className="resultados__table__descargar">
												<a
													data-id={ID}
													download
													href={Url_Resultado === '' ? '#' : Url_Resultado}
													className={`resultados__table__descargar__link ${
														DEUDA > 0 ? 'deuda' : ''
													}`}
													target={Url_Resultado === '' ? '_self' : '_blank'}
													style={{
														pointerEvents:
															Url_Resultado === '' ? 'none' : 'auto',
														color: DEUDA > 0 ? '#d2caca' : 'auto',
													}}
												>
													{DEUDA > 0 ? '' : Url_Resultado ? 'Descargar' : ''}
													<img
														src={`${
															Url_Resultado === '' ? pdfIconGris : pdfIcon
														}`}
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
				{medicoUser && (
					<div
						className="medico-user"
						style={{
							backgroundImage: `url(${medicoImage})`,
							backgroundSize: 'cover',
							backgroundPosition: 'center',
							backgroundRepeat: 'no-repeat',
						}}
					></div>
				)}
			</div>
		</>
	);
}

export default Resultados;
