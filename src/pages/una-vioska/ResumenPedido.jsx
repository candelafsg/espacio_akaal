import './css/resumen.css';
import { CardPedido } from '../../components/cards/Cards';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from '../../components/buttons/Button';
import WhatsAppLink from '../../components/whatsapp-link/WhatsappLink';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, X } from 'lucide-react';

const ResumenPedido = ({ productos: productosProps, esMenuLateral, menuAbierto, onCerrar }) => {
  const location = useLocation();
  const navigate = useNavigate();


  

  // Si viene de navegación normal (mobile), usa location.state
  // Si viene como menú lateral (desktop), usa las props
  const productosIniciales = esMenuLateral
    ? (productosProps || [])
    : (location.state?.productos || JSON.parse(localStorage.getItem('pedido')) || []);

  const [productos, setProductos] = useState(productosIniciales);
  const [nombre, setNombre] = useState('');

  // Sincronizar productos cuando cambian las props (desktop)
  useEffect(() => {
    if (esMenuLateral && productosProps) {
      setProductos(productosProps);
    }
  }, [productosProps, esMenuLateral]);

  // Guardar en localStorage cuando cambien los productos
  useEffect(() => {
    if (!esMenuLateral) {
      localStorage.setItem('pedido', JSON.stringify(productos));
    }
  }, [productos, esMenuLateral]);

  const eliminarProducto = (id) => {
    setProductos((prev) => prev.filter((producto) => producto.id !== id));
  };

  const total = productos.reduce(
    (acc, producto) => acc + parseFloat(producto.precio || 0),
    0
  );

  const mensajeWhatsApp = `¡Hola! Me llamo ${nombre} y me gustaría pedir los siguientes productos:\n\n${productos
    .map((p) => `• ${p.nombre} - ${p.precio} €`)
    .join('\n')}\n\nTotal: ${total.toFixed(2)} €`;

  const finalizarPedido = () => {
    if (!nombre.trim()) {
      alert('por favor, escribe tu nombre para poder contactar');
      return;
    }
    localStorage.removeItem('pedido');
    setProductos([]);
  };

  const handleVolver = () => {
    navigate('/una-vioska#galeria');
  };

  const handleCerrar = () => {
    if (onCerrar) onCerrar();
    else navigate(-1);
  };

  // Si es menú lateral y está cerrado, no renderizar nada
  if (esMenuLateral && !menuAbierto) return null;

  return (
    <section className={`resumen ${esMenuLateral ? 'menu-lateral active' : ''}`}>
      {!esMenuLateral && (
        <div className="resumen-back">
          <ArrowLeft strokeWidth={1} onClick={handleVolver} />
        </div>
      )}
      {/* {esMenuLateral && (
        <div className="resumen-close">
          <X size={20} onClick={handleVolver} />
        </div>
      )} */}

      <h1 className='resumen-titulo'>RESUMEN <br />DE TU PEDIDO</h1>

      {productos.length === 0 ? (
        <div className="no-seleccionados">
          <div className="no-seleccionados-container">
            <p className="no-seleccionados-texto" style={{ textAlign: 'center' }}>
              No tienes productos en tu cesta, explora la galería y elige con el corazón
            </p>
            <Button onClick={esMenuLateral ? handleCerrar : handleVolver}>
              {esMenuLateral ? 'CERRAR' : 'VOLVER A LA GALERÍA'}
            </Button>
          </div>
        </div>
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
              <h2 className="total"><strong>{total.toFixed(2)} €</strong></h2>
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
  );
};

export default ResumenPedido;