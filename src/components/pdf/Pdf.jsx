import React from "react";
import { Button } from "../buttons/Button";



const PdfHandler = ({ fileUrl, fileName = "documento.pdf", variant = "primary", children }) => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isMobile) {
      // 📱 Descargar PDF sin desplazamiento
      const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
      
      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = fileName;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Restaurar posición del scroll
      window.scrollTo(0, scrollPosition);
      return false;
    } else {
      // 💻 Abrir en nueva pestaña
      window.open(fileUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <Button onClick={handleClick} variant={variant} style={{ cursor: "pointer" }} className="pdf-handler-btn">
      {children || "Abrir PDF"}
    </Button>
  );
};

export default PdfHandler;