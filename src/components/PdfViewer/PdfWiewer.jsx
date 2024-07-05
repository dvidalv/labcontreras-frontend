import React, { useEffect, useRef } from 'react';
import * as PDFJS from 'pdfjs-dist';
import 'pdfjs-dist/web/pdf_viewer.css';

PDFJS.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS.version}/pdf.worker.js`;

const PdfViewer = ({ pdfUrl }) => {
	// console.log(pdfUrl)
	const canvasRef = useRef(null);

	useEffect(() => {
		const loadPdf = async () => {
			const loadingTask = PDFJS.getDocument({ url: pdfUrl });
			const pdf = await loadingTask.promise;
			const page = await pdf.getPage(1);
			console.log(page)
			const scale = 1.5;
			const viewport = page.getViewport({ scale });

			const canvas = canvasRef.current;
			const context = canvas.getContext('2d');
			canvas.height = viewport.height;
			canvas.width = viewport.width;

			const renderContext = {
				canvasContext: context,
				viewport,
			};
			page.render(renderContext);
		};

		loadPdf();
	}, [pdfUrl]);

	return <canvas ref={canvasRef}></canvas>;
};

export default PdfViewer;