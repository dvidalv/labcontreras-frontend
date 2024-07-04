import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import PropTypes from 'prop-types';
import { useState } from 'react';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

function Pdf({pdfUrl}) {
	const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

	function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
	
	return (
    <div>
      <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
}

Pdf.propTypes = {
	pdfUrl: PropTypes.string.isRequired,
}


export default Pdf
