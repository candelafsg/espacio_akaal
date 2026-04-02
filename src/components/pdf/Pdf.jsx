import React from "react";
import { Button } from "../buttons/Button";

const PdfHandler = ({ fileUrl, fileName = "documento.pdf", children, variant='primary' }) => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const handleClick = (e) => {
    e.preventDefault();

    if (isMobile) {
      // 📱 Descargar PDF
      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // 💻 Abrir en nueva pestaña
      window.open(fileUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <Button onClick={handleClick} variant={variant} style={{ cursor: "pointer" }}>
      {children || "Abrir PDF"}
    </Button>
  );
};

export default PdfHandler;