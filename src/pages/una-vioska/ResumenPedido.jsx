import './css/resumen.css';
import { CardPedido } from '../../components/cards/Cards';
import { useLocation } from 'react-router';
import { useState, useEffect } from 'react';
import { Button } from '../../components/buttons/Button';
import WhatsAppLink from '../../components/whatsapp-link/WhatsappLink';
import { useNavigate } from 'react-router';
import { ArrowLeft, X } from 'lucide-react';

const ResumenPedido = ({ productos: productosProps, esMenuLateral: esMenuLateralProp, onClose }) => {
  const location = useLocation();

  // Estado del pedido y del nombre
  const productosIniciales =
    location.state?.productos ||
    JSON.parse(localStorage.getItem('pedido')) ||
    [];

  const [productos, setProductos] = useState(productosIniciales);
  const [nombre, setNombre] = useState('');
  const navigate = useNavigate()

  // Detectar si es menú lateral
  const esMenuLateral = location.state?.esMenuLateral || false;

  // Estado para controlar la animación
  const [isActive, setIsActive] = useState(false);

  // Activar animación cuando se monta el componente
  useEffect(() => {
    if (esMenuLateral) {
      // Pequeño delay para asegurar que el DOM está listo
      const timer = setTimeout(() => {
        setIsActive(true);
      }, 10);
      
      return () => {
        clearTimeout(timer);
        // Animación de cierre al desmontar
        setIsActive(false);
      };
    }
  }, [esMenuLateral]);

  // Función para cerrar con animación
  const cerrarConAnimacion = () => {
    if (esMenuLateral) {
      setIsActive(false);
      // Esperar a que termine la animación antes de navegar
      setTimeout(() => {
        navigate(-1);
      }, 300); // Misma duración que la transición CSS
    } else {
      navigate(-1);
    }
  };




  // Guardar en localStorage cuando cambien los productos
  useEffect(() => {
    localStorage.setItem('pedido', JSON.stringify(productos));
  }, [productos]);




  // Eliminar un producto
  const eliminarProducto = (id) => {
    setProductos((prev) => prev.filter((producto) => producto.id !== id));
  };




  // Calcular total
  const total = productos.reduce(
    (acc, producto) => acc + parseFloat(producto.precio || 0),
    0
  );



  // Mensaje de WhatsApp con el nombre
  const mensajeWhatsApp = `¡Hola! Me llamo ${nombre} y me gustaría pedir los siguientes productos:\n\n${productos
    .map((p) => `• ${p.nombre} - ${p.precio} €`)
    .join('\n')}\n\nTotal: ${total.toFixed(2)} €`;


  // Finalizar pedido
  const finalizarPedido = () => {
    if (!nombre.trim()) {
      alert('por favor, escribe tu nombre para poder contactar');
      return;
    }

    localStorage.removeItem('pedido');
    setProductos([]);
  };



  const handleVolver = () => {
    navigate('/una-vioska#galeria')



  }

  return (
    <>
      {esMenuLateral && (
        <div className={`overlay ${isActive ? 'active' : ''}`} onClick={cerrarConAnimacion} />
      )}
      <section className={`resumen ${esMenuLateral ? 'menu-lateral' : ''} ${isActive ? 'active' : ''}`}>
        {!esMenuLateral && (
          <div className="resumen-back">
            <ArrowLeft strokeWidth={1} onClick={handleVolver}/>
          </div>
        )}
        {esMenuLateral && (
          <div className="resumen-close">
            <X size={20} onClick={cerrarConAnimacion} />
          </div>
        )}
        <h1 className='resumen-titulo'>RESUMEN <br/>DE TU PEDIDO</h1>

        {productos.length === 0 ? (
          <>
            <div className="no-seleccionados">
                <div className="no-seleccionados-container">
                  <p className="no-seleccionados-texto" style={{textAlign:'center'}}>No tienes productos en tu cesta, explora la galeria y elige con el corazón</p>
                  <Button onClick={handleVolver}> VOLVER A LA GALERÍA</Button></div>
            </div>
          </>
         
        ) : (
          <>
            <div className="lista-productos">
              {productos.map((producto) => (
                <CardPedido
                  key={producto.id}
                  producto={producto}
                  onEliminar={eliminarProducto}
                />
              ))}
            </div>

            <footer className="footer-resumen">
              <div className="resumen-total">
                <p className='total-texto'>Total</p>
                <h2 className="total"> <strong>{total.toFixed(2)} €</strong></h2>
              </div>

              <div className="resumen-finalizar">
                <input
                  type="text"
                  placeholder="Escribe tu nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                  className="input-nombre"
                />

                <WhatsAppLink
                
                  message={mensajeWhatsApp}
                  onClick={finalizarPedido}
                >
                  RESERVAR
                </WhatsAppLink>
              </div>
            </footer>
          </>
        )}
      </section>
    </>
  );
};

export default ResumenPedido;
