import { useState, useRef } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { OverlayModal } from './OverlayModal'
import './viajesAnteriores.css'

export const ViajesAnterioresContainer = ({
  numberphotos,
  portada,
  imagenes,
  videos,
  nombre,
  onOverlayChange // Nueva prop
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const videoRefs = useRef([]) // Refs para controlar los videos

  // Crear array combinado: video1 - imagenes - video2
  const mediaItems = []
  if (videos && videos.length > 0) {
    mediaItems.push({ type: 'video', url: videos[0] }) // Video 1
  }
  // Agregar todas las imágenes
  imagenes.forEach(img => {
    mediaItems.push({ type: 'image', url: img })
  })
  if (videos && videos.length > 1) {
    mediaItems.push({ type: 'video', url: videos[1] }) // Video 2
  }

  const touchStartX = useRef(null)
  const touchCurrentX = useRef(null)

  const openModal = () => {
    setCurrentIndex(0)
    setIsOpen(true)
    if (onOverlayChange) onOverlayChange(true) // Notificar al gallery
  }

  const closeModal = () => {
    pauseAllVideos() // Pausar videos al cerrar
    setIsOpen(false)
    setCurrentIndex(0)
    if (onOverlayChange) onOverlayChange(false) // Notificar al gallery
  }

  // Función para pausar todos los videos
  const pauseAllVideos = () => {
    videoRefs.current.forEach(videoRef => {
      if (videoRef && videoRef.pause) {
        videoRef.pause()
      }
    })
  }

  const goNext = () => {
    pauseAllVideos() // Pausar videos antes de cambiar
    setCurrentIndex((prev) =>
      Math.min(prev + 1, mediaItems.length - 1)
    )
  }

  const goPrev = () => {
    pauseAllVideos() // Pausar videos antes de cambiar
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
            {mediaItems.map((item, i) => (
              <div key={i} className="overlay-item">
                {item.type === 'video' ? (
                  <video
                    ref={el => {
                      if (el && !videoRefs.current.includes(el)) {
                        videoRefs.current.push(el)
                      }
                    }}
                    src={item.url}
                    loop
                    playsInline
                    muted={false}
                    controls
                    className="overlay-video-elegante"
                  />
                ) : (
                  <img
                    src={item.url}
                    alt={`img-${i}`}
                    className="overlay-img-elegante"
                  />
                )}
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
          disabled={currentIndex === mediaItems.length - 1}
        >
          <ChevronRight size={28} strokeWidth={1.25} />
        </button>

        {/* indicadores */}
        <div className="overlay-indicators">
          {mediaItems.map((_, i) => (
            <button
              key={i}
              className={`overlay-indicator ${
                i === currentIndex ? 'active' : ''
              }`}
              onClick={() => {
                pauseAllVideos() // Pausar videos antes de cambiar
                setCurrentIndex(i)
              }}
            />
          ))}
        </div>
      </OverlayModal>
    </>
  )
}
