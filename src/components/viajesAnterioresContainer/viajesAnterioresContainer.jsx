import './viajesAnteriores.css'
import { Image, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export const ViajesAnterioresContainer = ({ numberphotos, portada, imagenes, nombre }) => {

  const [overlayOpen, setOverlayOpen] = useState(false);
  const [indiceActual, setIndiceActual] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const scrollContainerRef = useRef(null);
  const scrollTimeoutRef = useRef(null);
  const touchStartXRef = useRef(0);
  const touchStartYRef = useRef(0);
  const isSwipingRef = useRef(false);

  // Detectar si es desktop
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const abrirOverlay = () => {
    setIndiceActual(0);
    setOverlayOpen(true);
  };

  const cerrarOverlay = () => {
    setOverlayOpen(false);
    setIndiceActual(0);
  };

  const irIzquierda = () => {
    setIndiceActual((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const irDerecha = () => {
    setIndiceActual((prevIndex) => Math.min(imagenes.length - 1, prevIndex + 1));
  };

  const handleTouchStart = (e) => {
    if (isDesktop) return;
    const t = e.touches?.[0];
    if (!t) return;
    touchStartXRef.current = t.clientX;
    touchStartYRef.current = t.clientY;
    isSwipingRef.current = false;
  };

  const handleTouchMove = (e) => {
    if (isDesktop) return;
    const t = e.touches?.[0];
    if (!t) return;
    const dx = t.clientX - touchStartXRef.current;
    const dy = t.clientY - touchStartYRef.current;

    if (!isSwipingRef.current) {
      if (Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy)) {
        isSwipingRef.current = true;
      }
    }

    if (isSwipingRef.current) {
      e.preventDefault();
    }
  };

  const handleTouchEnd = (e) => {
    if (isDesktop) return;
    if (!isSwipingRef.current) return;

    const t = e.changedTouches?.[0];
    if (!t) return;
    const dx = t.clientX - touchStartXRef.current;

    const threshold = 50;
    if (dx <= -threshold) {
      irDerecha();
    } else if (dx >= threshold) {
      irIzquierda();
    }
  };

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') cerrarOverlay();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cerrarOverlay]);

  return (
    <>
      <div className="viaje-container" onClick={abrirOverlay} style={{ cursor: 'pointer' }}>

   

          <div className="viaje-portada">
            <img src={portada} alt='portada' className="viaje-portada-img" />
          </div>

         
     

        <div className="viaje-footer">
          <h2 className="viaje-nombre">{nombre}</h2>
          <div className="viaje-icon-image">
            <Image strokeWidth={1} />
            <p className="viaje-icon-text"> + {numberphotos}</p>
          </div>
        </div>
      </div>

      {/* Overlay elegante */}
      {overlayOpen && (
        <div className="overlay-elegante" onClick={cerrarOverlay}>
          {/* Botón de cerrar */}
          <button
            className="overlay-close"
            aria-label="Cerrar"
            onClick={(e) => { e.stopPropagation(); cerrarOverlay(); }}
          >
            <X size={22} strokeWidth={1.25} />
          </button>
          
          {/* Contenedor principal */}
          <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
            <div 
              className="overlay-scroll-container" 
              ref={scrollContainerRef}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div 
                className="overlay-scroll"
                style={{
                  transform: `translateX(-${indiceActual * 100}%)`,
                  transition: 'transform 0.3s ease'
                }}
              >
                {imagenes.map((img, index) => (
                  <div key={index} className="overlay-item">
                    <img src={img} alt={`img-${index}`} className="overlay-img-elegante" />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Versión Desktop: botones de flecha */}
            <button
              className="overlay-arrow overlay-arrow-prev"
              aria-label="Anterior"
              onClick={(e) => { e.stopPropagation(); irIzquierda(); }}
              disabled={indiceActual === 0}
            >
              <ChevronLeft size={28} strokeWidth={1.25} />
            </button>
            <button
              className="overlay-arrow overlay-arrow-next"
              aria-label="Siguiente"
              onClick={(e) => { e.stopPropagation(); irDerecha(); }}
              disabled={indiceActual === imagenes.length - 1}
            >
              <ChevronRight size={28} strokeWidth={1.25} />
            </button>
            
            {/* Indicadores */}
            <div className="overlay-indicators">
              {imagenes.map((_, index) => (
                <button
                  key={index}
                  className={`overlay-indicator ${index === indiceActual ? 'active' : ''}`}
                  onClick={(e) => { e.stopPropagation(); setIndiceActual(index); }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
