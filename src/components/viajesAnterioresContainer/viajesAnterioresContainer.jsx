import { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import './viajesAnteriores.css'

export const ViajesAnterioresContainer = ({
  numberphotos,
  portada,
  imagenes,
  nombre
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleTouchMoveNonPassive = (e) => {
      e.preventDefault()
      touchEndX.current = e.touches[0].clientX
    }

    container.addEventListener('touchmove', handleTouchMoveNonPassive, { passive: false })

    return () => {
      container.removeEventListener('touchmove', handleTouchMoveNonPassive)
    }
  }, [])

  const openModal = () => {
    setCurrentIndex(0)
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
    setCurrentIndex(0)
  }

  const goNext = () => {
    setCurrentIndex((prev) =>
      Math.min(prev + 1, imagenes.length - 1)
    )
  }

  const goPrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e) => {
    // Este handler ya no se usa, manejamos touchmove con event listener nativo
  }

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current
    if (distance > 50) goNext()
    if (distance < -50) goPrev()
  }

  return (
    <>
      {/* card preview */}
      <div className="viaje-container" onClick={openModal}>
        <div className="viaje-portada">
          <img
            src={portada}
            alt="portada"
            className="viaje-portada-img"
          />
        </div>
        <div className="viaje-footer">
          <h2 className="viaje-nombre">{nombre}</h2>
          <div className="viaje-icon-image">
            <p>+ {numberphotos}</p>
          </div>
        </div>
      </div>

      {/* overlay */}
      {isOpen && (
        <div className="overlay-elegante" onClick={closeModal}>
          <button
            className="overlay-close"
            onClick={(e) => { e.stopPropagation(); closeModal(); }}
          >
            <X size={22} strokeWidth={1.25} />
          </button>
          
          <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
            <div 
              className="overlay-scroll-container"
              ref={containerRef}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div 
                className="overlay-scroll"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                  transition: 'transform 0.3s ease'
                }}
              >
                {imagenes.map((img, i) => (
                  <div key={i} className="overlay-item">
                    <img
                      src={img}
                      alt={`img-${i}`}
                      className="overlay-img-elegante"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            <button
              className="overlay-arrow overlay-arrow-prev"
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              disabled={currentIndex === 0}
            >
              <ChevronLeft size={28} strokeWidth={1.25} />
            </button>
            <button
              className="overlay-arrow overlay-arrow-next"
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              disabled={currentIndex === imagenes.length - 1}
            >
              <ChevronRight size={28} strokeWidth={1.25} />
            </button>
            
            <div className="overlay-indicators">
              {imagenes.map((_, i) => (
                <button
                  key={i}
                  className={`overlay-indicator ${i === currentIndex ? 'active' : ''}`}
                  onClick={(e) => { e.stopPropagation(); setCurrentIndex(i); }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
