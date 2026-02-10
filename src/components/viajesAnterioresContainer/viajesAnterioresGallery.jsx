import './viajesAnteriores.css'
import { ViajesAnteriores } from '../../db/imagenes'
import { ViajesAnterioresContainer } from './viajesAnterioresContainer'
import { useState, useRef, useEffect } from 'react'

export const ViajesAnterioresGallery = () => {
  const [indiceActual, setIndiceActual] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [overlayOpen, setOverlayOpen] = useState(false) // Nuevo estado
  const galleryRef = useRef(null)

  const handleNext = () => {
    if (indiceActual < ViajesAnteriores.length - 1) {
      setIndiceActual(indiceActual + 1)
    }
  }

  const handlePrev = () => {
    if (indiceActual > 0) {
      setIndiceActual(indiceActual - 1)
    }
  }

  // Funciones para manejo táctil
  const handleTouchStart = (e) => {
    if (overlayOpen) return // No hacer touch si overlay está abierto
    setTouchEnd(0)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    if (overlayOpen) return // No hacer touch si overlay está abierto
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (overlayOpen) return // No hacer touch si overlay está abierto
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe && indiceActual < ViajesAnteriores.length - 1) {
      handleNext()
    }
    if (isRightSwipe && indiceActual > 0) {
      handlePrev()
    }
  }

  // Navegación con teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' && indiceActual > 0) {
        handlePrev()
      }
      if (e.key === 'ArrowRight' && indiceActual < ViajesAnteriores.length - 1) {
        handleNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [indiceActual])

  return (
    <div className="gallery">
      {/* Versión Desktop: todas las cards en flex */}
      <div className="viajes-gallery-desktop">
        {ViajesAnteriores.map((viaje, index) => (
          <ViajesAnterioresContainer
            key={index}
            nombre={viaje.nombre}
            portada={viaje.portada}
            imagenes={viaje.imagenes}
            numberphotos={viaje.imagenes.length}
          />
        ))}
      </div>

      {/* Versión Mobile: slider con flechas y touch */}
      <div 
        className="viajes-gallery"
        ref={galleryRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <ViajesAnterioresContainer
          key={indiceActual}
          nombre={ViajesAnteriores[indiceActual].nombre}
          portada={ViajesAnteriores[indiceActual].portada}
          imagenes={ViajesAnteriores[indiceActual].imagenes}
          numberphotos={ViajesAnteriores[indiceActual].imagenes.length}
          onOverlayChange={setOverlayOpen} // Nueva prop
        />
        
        {/* Flechas laterales */}
        <button
          className={`gallery-arrow gallery-arrow-prev ${indiceActual === 0 ? 'disabled' : ''}`}
          onClick={handlePrev}
          disabled={indiceActual === 0}
          aria-label="Anterior"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <button
          className={`gallery-arrow gallery-arrow-next ${indiceActual === ViajesAnteriores.length - 1 ? 'disabled' : ''}`}
          onClick={handleNext}
          disabled={indiceActual === ViajesAnteriores.length - 1}
          aria-label="Siguiente"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        {/* Dots indicadores */}
        <div className="gallery-dots">
          {ViajesAnteriores.map((_, index) => (
            <button
              key={index}
              className={`gallery-dot ${index === indiceActual ? 'active' : ''}`}
              onClick={() => setIndiceActual(index)}
              aria-label={`Ir a viaje ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
