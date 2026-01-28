import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { horarios } from "../../db/imagenes";
import { CardHorario } from "../../components/cards/Cards";
import "./espacio-akaal.css";
import { ImgContainer } from "../../components/components/Components";
import WhatsAppLink from "../../components/whatsapp-link/WhatsappLink";
import { espacioAkaalImgs } from "../../db/imagenes";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Footer } from "../../components/footer/Footer";

const diasSemana = ["LUN.", "MAR.", "MIER.", "JUE.", "VIE."];

const diaCompleto = {
  "LUN.": "Lunes",
  "MAR.": "Martes",
  "MIER.": "Miércoles",
  "JUE.": "Jueves",
  "VIE.": "Viernes",
};

const EspacioAkaal = () => {
  // Filtrar solo la clase de Yoga
  const claseYoga = horarios.find((h) => h.nombre === "YOGA");

  const [diaSeleccionado, setDiaSeleccionado] = useState(
    claseYoga?.dias[0]?.dia || "Lunes"
  );
  const [sliderOpen, setSliderOpen] = useState(false);
  const [sliderInitialIndex, setSliderInitialIndex] = useState(0);
  const [imagenActual, setImagenActual] = useState(0);

  // Preparar imágenes para el slider
  const sliderImages = espacioAkaalImgs.map((img) => ({
    img: img
  }));

  const handleOpenSlider = (index) => {
    setSliderInitialIndex(index);
    setSliderOpen(true);
  };

  const handleCloseSlider = () => {
    setSliderOpen(false);
  };

  // Funciones para el slider de imágenes
  const imagenSiguiente = () => {
    setImagenActual((prev) => (prev + 1) % sliderImages.length);
  };

  const imagenAnterior = () => {
    setImagenActual((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  };

  const irAImagen = (index) => {
    setImagenActual(index);
  };

  const dia = claseYoga?.dias.find((d) => d.dia === diaSeleccionado);

  const galeriaItems = espacioAkaalImgs.map((img, index) => ({
    id: `akaal-${index}`,
    img,
    height: 300 + Math.floor(Math.random() * 100),
    url: img,
  }));

  return (
    <>
      <ImgContainer>
        <div className="imagen-provisional">
          <img src="https://res.cloudinary.com/dhwd1b4be/image/upload/v1769501307/img4_akwstx.png" alt="portada" className="img-prov" />
          <h1 className="texto-provisional">
            ESPACIO <br /> AKAAL
          </h1>
        </div>
      </ImgContainer>

      <section className="akaal-horarios">
        <div className="akaal-titulo-subtitulo">
          <h1 className="akaal-titulo">NUESTROS HORARIOS</h1>
          <p className="akaal-subtitulo">
            En Espacio AKAAL ofrecemos clases de yoga profundamente conscientes, enfocadas en una correcta alineación postural. A través del uso de cuerdas en la pared, sillas, bloques y cinturones, llevamos atención e inteligencia a zonas del cuerpo menos conscientes, ayudando a despertarlas de forma progresiva y respetuosa. Es un yoga terapéutico, ideal para mejorar la postura corporal, ganar estabilidad y equilibrio, y generar un bienestar profundo tanto en el cuerpo como en la mente. Si quieres reservar tu primera clase de forma gratuita y sin compromiso, te espero.          </p>
        </div>

       <div className="calendario-container">

        {/* DÍAS DE LA SEMANA */}
        <div className="calendario">
          {diasSemana.map((diaAbreviado) => {
            const diaReal = diaCompleto[diaAbreviado];

            return (
              <motion.button
                key={diaAbreviado}
                onClick={() => setDiaSeleccionado(diaReal)}
                className={`dia ${diaReal === diaSeleccionado ? "seleccionado" : ""
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                layout
              >
                {diaAbreviado}
              </motion.button>
            );
          })}
        </div>

        {/* LISTADO DE CLASES */}
        <div className="lista-clases">
          <AnimatePresence mode="wait">
            {dia?.clases?.length > 0 ? (
              <motion.div
                key={`con-clases-${diaSeleccionado}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="clases-container"
              >
                {dia.clases.map((claseItem, index) => (
                  <motion.div
                    key={`${diaSeleccionado}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.1,
                      ease: "easeOut",
                    }}
                  >
                    <CardHorario
                      nombre="YOGA"
                      hora={claseItem.hora}
                      instructor={claseItem.instructor}
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key={`sin-clases-${diaSeleccionado}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <div className="sin-clases">No hay clases este día</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="akaal-button">
          <WhatsAppLink>MÁS INFORMACIÓN</WhatsAppLink>
        </div>
        </div>
      </section>



      {/* SECCIÓN GALERÍA SLIDER */}
      <section className="akaal-slider-section">
        <h1 className="slider-titulo">CONOCE <br /> ESPACIO AKAAL</h1>
        
        <div className="slider-container-galery">
          <div className="slider-imagen">
            <img 
              src={sliderImages[imagenActual].img} 
              alt={`Imagen ${imagenActual + 1}`}
              className="slider-img-galery"
            />
          </div>
          
          <button 
            className="slider-btn slider-btn-prev" 
            onClick={imagenAnterior}
            aria-label="Imagen anterior"
          >
            <ChevronLeft size={32} />
          </button>
          
          <button 
            className="slider-btn slider-btn-next" 
            onClick={imagenSiguiente}
            aria-label="Siguiente imagen"
          >
            <ChevronRight size={32} />
          </button>
        </div>
        
        <div className="slider-dots">
          {sliderImages.map((_, index) => (
            <button
              key={index}
              className={`slider-dot ${index === imagenActual ? 'slider-dot-active' : ''}`}
              onClick={() => irAImagen(index)}
              aria-label={`Ir a imagen ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Footer - solo visible en desktop */}
      <Footer />
    </>
  );
};

export default EspacioAkaal;