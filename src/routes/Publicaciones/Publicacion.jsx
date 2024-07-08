import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Publicacion.css';

function Publicacion() {
	const { id } = useParams();

	return (
		<div className='publicacion'>
			<h1>Publicacion</h1>
		</div>
	)
}

export default Publicacion
