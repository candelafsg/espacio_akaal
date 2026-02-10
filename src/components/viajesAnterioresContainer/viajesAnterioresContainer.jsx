import { useState, useRef } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { OverlayModal } from './OverlayModal'
import './viajesAnteriores.css'

export const ViajesAnterioresContainer = ({
  numberphotos,
  portada,
  imagenes,
  nombre,
  onOverlayChange // Nueva prop
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const touchStartX = useRef(null)
  const touchCurrentX = useRef(null)

  const openModal = () => {
    setCurrentIndex(0)
    setIsOpen(true)
    if (onOverlayChange) onOverlayChange(true) // Notificar al gallery
  }

  const closeModal = () => {
    setIsOpen(false)
    setCurrentIndex(0)
    if (onOverlayChange) onOverlayChange(false) // Notificar al gallery
  }

  const goNext = () => {
    setCurrentIndex((prev) =>
      Math.min(prev + 1, imagenes.length - 1)
    )
  }

  const goPrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }

  /* ---------- DRAG ---------- */
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
    touchCurrentX.current = null
  }

  const handleTouchMove = (e) => {
    touchCurrentX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (
      touchStartX.current === null ||
      touchCurrentX.current === null
    )
      return

    const distance =
      touchStartX.current - touchCurrentX.current

    if (distance > 50) goNext()
    if (distance < -50) goPrev()

    touchStartX.current = null
    touchCurrentX.current = null
  }

  return (
    <>
      {/* CARD */}
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

      {/* OVERLAY */}
      <OverlayModal isOpen={isOpen} onClose={closeModal}>
        {/* cerrar */}
        <button
          className="overlay-close"
          onClick={closeModal}
        >
          <X size={22} strokeWidth={1.25} />
        </button>

        {/* slider */}
        <div
          className="overlay-scroll-container"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
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

        {/* flechas */}
        <button
          className="overlay-arrow overlay-arrow-prev"
          onClick={goPrev}
          disabled={currentIndex === 0}
        >
          <ChevronLeft size={28} strokeWidth={1.25} />
        </button>

        <button
          className="overlay-arrow overlay-arrow-next"
          onClick={goNext}
          disabled={currentIndex === imagenes.length - 1}
        >
          <ChevronRight size={28} strokeWidth={1.25} />
        </button>

        {/* indicadores */}
        <div className="overlay-indicators">
          {imagenes.map((_, i) => (
            <button
              key={i}
              className={`overlay-indicator ${
                i === currentIndex ? 'active' : ''
              }`}
              onClick={() => setCurrentIndex(i)}
            />
          ))}
        </div>
      </OverlayModal>
    </>
  )
}
