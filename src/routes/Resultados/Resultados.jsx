import { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import './Resultados.css';
import pdfIconGris from '../../images/pdf_gray.svg';
import {
	getFileMakerToken,
	getResultados,
	getResultadosByName,
	isTokenExpired,
} from '../../utils/api';
import Preloader from '../../components/Preloader/Preloader';

function Resultados() {
	const [records, setRecords] = useState([]);
	const [loading, setLoading] = useState(false);

	const filemakerToken = useRef(localStorage.getItem('fileMakerToken'));
	// console.log(filemakerToken);

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

	useEffect(() => {
		setLoading(true);
		const fetchToken = async () => {
			try {
				if (isTokenExpired()) {
					// console.log('Token expirado');
					const tokenData = await getFileMakerToken();
					const {
						response: { token },
					} = tokenData;
					filemakerToken.current = token;
					localStorage.setItem('tokenTimestamp', new Date().getTime());
					localStorage.setItem('fileMakerToken', token);
				}
			} catch (error) {
				console.error('Error al obtener el token:', error);
			} finally {
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
	}, []);

	const onSubmit = async (data) => {
		if (records.length > 0) {
			setRecords(() => []);
		}

		// Función para obtener un nuevo token si ha expirado
		const refreshTokenIfNeeded = async () => {
			if (!filemakerToken.current || isTokenExpired()) {
				// console.log('Refresco el token');
				try {
					setLoading(true);
					const tokenData = await getFileMakerToken();
					const {
						response: { token: newToken },
					} = tokenData;
					filemakerToken.current = newToken;
					localStorage.setItem('tokenTimestamp', new Date().getTime());
					localStorage.setItem('fileMakerToken', newToken);
				} catch (error) {
					console.error('Error al obtener el token:', error);
				} finally {
					setLoading(false);
				}
			}
		};

		const refreshToken = await refreshTokenIfNeeded();
		// console.log(refreshToken);

		if (filemakerToken && data.search === '') {
			try {
				// console.log('Buscando todos los registros');
				setLoading(true);
				// console.log(data)
				const resultados = await getResultados(filemakerToken.current);
				const {
					response: { data },
				} = resultados;
				data.map((record) => {
					setRecords((prev) => [...prev, record.fieldData]);
				});
			} catch (error) {
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
				const token = filemakerToken.current;
				const name = data.search;
				const resultados = await getResultadosByName(token, name);
				// console.log(resultados);
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
					message: 'Error al obtener los resultados',
				});
			} finally {
				setLoading(false);
			}
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
					<div className="resultados__form__container">
						<div className="resultados__form__input">
							<input type="text" placeholder="Buscar" {...register('search')} />
							{errors.search && (
								<p className="resultados__form__error">
									{errors.search.message}
								</p>
							)}
						</div>
						<button
							className="resultados__form__button"
							type="submit"
							disabled={isTokenExpired() || isSubmitting}
						>
							{isSubmitting ? 'Buscando Estudios...' : 'Buscar'}
						</button>
					</div>
					{errors.root && (
						<p className="resultados__form__error">{errors.root.message}</p>
					)}
				</form>
				{filemakerToken ? null : <p>{filemakerToken?.messages}</p>}
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
									// console.log(record);
									const {
										NUMERO_ESTUDIO_FK,
										ESTADO_ESTUDIO,
										PAGO_ESTADO,
										FECHA_ENTRADA,
										Nombre_Completo,
										ID,
										Url_Resultado,
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
													data-id={ID}
													href={Url_Resultado}
													className="resultados__table__descargar__link debe"
													target="_blank"
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
