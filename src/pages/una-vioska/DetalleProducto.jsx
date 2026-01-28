import { useParams, useNavigate } from "react-router";
import { motion, AnimatePresence } from 'framer-motion'
import { useRef, useState } from "react";
import './css/detalle.css'
import useFetchProductos from '../../hooks/useFetchProducts';
import { HandHeart, } from 'lucide-react'
import { Button } from "../../components/buttons/Button";


const DetalleProducto = () => {

    const { pid } = useParams();

    const sliderRef = useRef(null);
    const [imagenActiva, setImagenActiva] = useState(0);
    const [mostrarNotificacion, setMostrarNotificacion] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    const productos = useFetchProductos();
    const producto = productos.find(p => p.id === Number(pid));
    const navigate = useNavigate();

    const handleScroll = () => {
        const scrollLeft = sliderRef.current.scrollLeft;
        const width = sliderRef.current.clientWidth;
        const newIndex = Math.round(scrollLeft / width);
        setImagenActiva(newIndex);
    };

    const scrollToImagen = (index) => {
        const width = sliderRef.current.clientWidth;
        sliderRef.current.scrollTo({
            left: width * index,
            behavior: "smooth",
        });
    };



    const seleccionarProducto = () => {
        // Obtener la lista actual desde localStorage
        const seleccionActual = JSON.parse(localStorage.getItem("seleccionados")) || [];

        // Si no está ya seleccionado, lo añadimos
        if (!seleccionActual.includes(producto.id)) {
            const nuevaSeleccion = [...seleccionActual, producto.id];
            localStorage.setItem("seleccionados", JSON.stringify(nuevaSeleccion));
        }

        // Mostrar notificación personalizada
        setMostrarNotificacion(true);
        
        // Ocultar notificación y navegar después de 2 segundos
        setTimeout(() => {
            setMostrarNotificacion(false);
            navigate(-1); // Volver a galería
        }, 2000);
    };


    const handleBack = () => {
        setIsVisible(false);
        setTimeout(() => {
            navigate(-1);
        }, 300);
    }


    if (!producto) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <>
                    {/* Notificación personalizada */}
                    {mostrarNotificacion && (
                        <motion.div
                            className="notificacion-seleccion"
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                            <HandHeart size={20} />
                            <span>¡Producto seleccionado!</span>
                        </motion.div>
                    )}

                    <motion.div 
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        <motion.div
                            className="modal-content"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                        >
                            <button className="cerrar" onClick={handleBack}>✕</button>

                            <div className="slider-container-product">
                                <div className="slider" ref={sliderRef} onScroll={handleScroll}>
                                    {producto.imagenes.map((img, index) => (
                                        <img key={index} src={img} alt={`imagen-${index}`} className="slide-img" />
                                    ))}
                                </div>

                                <div className="dots">
                                    {producto.imagenes.map((_, index) => (
                                        <span
                                            key={index}
                                            className={`dot ${index === imagenActiva ? "active" : ""}`}
                                            onClick={() => scrollToImagen(index)}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="producto-info">
                                <h2>{producto.nombre}</h2>
                                <p className="precio">{producto.precio} €</p>

                                <div className="producto-descripcion">
                                    <div className="descripcion-content">
                                        <HandHeart size={24} className="hand-icon" />
                                        <p>Estas piezas son de plata de ley, 100% artesanales, hechas con propósito. Llévate una pieza única.</p>
                                    </div>
                                </div>

                                <div className="btn-seleccion">
                                    <Button onClick={seleccionarProducto}>SELECCIONAR PRODUCTO</Button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default DetalleProducto;
