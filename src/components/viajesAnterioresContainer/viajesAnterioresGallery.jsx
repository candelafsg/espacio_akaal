import './viajesAnteriores.css'
import { ViajesAnteriores } from '../../db/imagenes'
import { ViajesAnterioresContainer } from './viajesAnterioresContainer'
import { useState } from 'react'

export const ViajesAnterioresGallery = () => {
  const [indiceActual, setIndiceActual] = useState(0)

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

      {/* Versión Mobile: slider */}
      <div className="viajes-gallery">
        <ViajesAnterioresContainer
          key={indiceActual}
          nombre={ViajesAnteriores[indiceActual].nombre}
          portada={ViajesAnteriores[indiceActual].portada}
          imagenes={ViajesAnteriores[indiceActual].imagenes}
          numberphotos={ViajesAnteriores[indiceActual].imagenes.length}
        />
        
        <div className="gallery-btn">
          <button
            className="gallery-prev"
            onClick={handlePrev}
            disabled={indiceActual === 0}
          >
            <span translate="no">ANT.</span>
          </button>

          {/* Dots indicadores */}
          <div className="gallery-dots">
            {ViajesAnteriores.map((_, index) => (
              <button
                key={index}
                className={`gallery-dot ${index === indiceActual ? 'active' : ''}`}
                onClick={() => setIndiceActual(index)}
              />
            ))}
          </div>

          <button
            className="gallery-next"
            onClick={handleNext}
            disabled={indiceActual === ViajesAnteriores.length - 1}
          >
            SIG.
          </button>
        </div>
      </div>
    </div>
  )
}
