import React from "react";

function PDFViewer({ pdfUrl }) {
  return (
    <div>
      <iframe
        src={`https://drive.google.com/file/d/${pdfUrl}/preview?embedded=true`}
        width="300"
        height="400"
        style={{ border: "none",borderRadius:'10px',overflow:'hidden' }}
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default PDFViewer;