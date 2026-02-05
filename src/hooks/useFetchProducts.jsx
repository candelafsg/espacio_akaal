// hooks/useFetchProductos.js
import { useEffect, useState, useMemo } from "react";

const useFetchProductos = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    // Cargar datos desde el Google Sheets via SheetBest API
    fetch("https://api.sheetbest.com/sheets/7af2078e-45ca-4f95-ac01-6ab2b2026202")
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        // Validar que data sea un array
        if (!Array.isArray(data)) {
          console.error("La API no devolvió un array:", data);
          setProductos([]);
          return;
        }

        const formateados = data.map((item, index) => ({
          id: Number(item.id) || index + 1000, // Usar index + 1000 si id es 0 o inválido
          nombre: item.nombre || "",
          precio: Number(item.precio) || 0,
          descripcion: item.descripcion || "",
          imagen: item.imagenUno || "",
          portada: item.portada || item.imagenUno || "",
          imagenes: [
            item.imagenUno,
            item.imagenDos,
            item.imagenTres,
          ].filter(Boolean),
          filtro: item.filtro || "todo",
          tipo: item.tipo || "todo",
          piedra: item.piedra || "",
        }));

        setProductos(formateados);
      })
      .catch(err => {
        console.error("Error cargando productos desde Google Sheets:", err.message);
        setProductos([]);
      });
  }, []);

  return useMemo(() => productos, [productos]);
};

export default useFetchProductos;
