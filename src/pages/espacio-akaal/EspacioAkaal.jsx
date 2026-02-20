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
import Slider from "../../components/slider/Slider";
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



  const handleOpenSlider = (index) => {
    setSliderInitialIndex(index);
    setSliderOpen(true);
  };

  const handleCloseSlider = () => {
    setSliderOpen(false);
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

      <section className="akaal-inicio">
        <img src="https://res.cloudinary.com/dhwd1b4be/image/upload/v1769501307/img4_akwstx.png" alt="portada" className="img-prov" />

        <div className="container-titulo">
          <h1 className="texto-provisional">
            Espacio AKAAL
          </h1>
          <p className="subtitulo-yoga">Un refugio para el cuerpo, mente y alma.</p>
        </div>
      </section>


      <section className="akaal-inicio-desktop">
        
        <img src="https://res.cloudinary.com/dhwd1b4be/image/upload/v1771489981/ChatGPT_Image_17_feb_2026_08_38_05_1_1_drkay2.png" alt="portada" className="intro-imagen-desk" />

        <div className="akaal-desk-intro">


          <div className="intro-1">
            <h1 className="titulo-intro">
              Espacio AKAAL
            </h1>


            <div className="subtitulo-intro-container">
              <h2 className="subtitulo-h2-intro">Un refugio para el cuerpo, mente y alma. </h2>
            <p className="subtitulo-intro"><br/> Donde cada postura ordena y armoniza, con intención. <br/> Un bienestar que se siente por dentro y por fuera, donde la estabilidad se construye paso a paso y la mente se aquieta en el proceso.</p>
            </div>

          </div>




          <div className="intro-2">
            <div className="intro-2-content">
              <img src="https://res.cloudinary.com/dhwd1b4be/image/upload/v1771493354/ChatGPT_Image_3_feb_2026_15_51_18_1_1_hh3qci.png" alt="" className="intro-2-img" />
            </div>
             <div className="intro-2-content">
               <img src="https://res.cloudinary.com/dhwd1b4be/image/upload/v1771493361/ChatGPT_Image_2_feb_2026_08_14_49_1_2_a6tbrc.png" alt="" className="intro-2-img" />
             </div>

          </div>
        </div>



      </section>


      {/* SECCIÓN 1: YOGA */}
      <section className="akaal-yoga-section">
        <div className="yoga-decoracion-top">
          <img src="/img/capa.png" alt="Decoración" className="yoga-capa" />
        </div>

        <h1 className="yoga-titulo">La práctica que compartimos</h1>



        <p className="yoga-texto">
          En Espacio AKAAL ofrecemos clases de yoga profundamente conscientes, enfocadas en una correcta alineación postural. </p>
        <p className="yoga-texto"> A través del uso de cuerdas en la pared, sillas, bloques y cinturones, llevamos atención e inteligencia a zonas del cuerpo menos conscientes, ayudando a despertarlas de forma progresiva y respetuosa.</p>
        <p className="yoga-texto"> Es un yoga terapéutico, ya que hace que mejores de forma directa tu postura corporal.</p>


        <p className="yoga-texto"> Ideal para reducir dolores corporales, ganar estabilidad,  equilibrio, fuerza, flexibilidad y generar un bienestar profundo, tanto en el cuerpo como en la mente.</p>
        <p className="yoga-texto"> Si quieres reservar tu primera clase de forma gratuita y sin compromiso, te espero.</p>

        <div className="yoga-decoracion-bottom">
          <img src="/img/capa.png" alt="Decoración" className="yoga-capa" />
        </div>
      </section>

      {/* SECCIÓN 2: HORARIOS */}
      <section className="akaal-horarios">
        <div className="akaal-horarios-info">
          <div className="akaal-titulo-subtitulo">
            <h3 className="akaal-titulo">Elige <br />tu momento</h3>
          </div>

          <p className="akaal-horarios-texto-desktop">
            En Espacio AKAAL ofrecemos clases de yoga profundamente conscientes, enfocadas en una correcta alineación postural. </p>
          <p className="akaal-horarios-texto-desktop"> A través del uso de cuerdas en la pared, sillas, bloques y cinturones, llevamos atención e inteligencia a zonas del cuerpo menos conscientes, ayudando a despertarlas de forma progresiva y respetuosa.</p>
          <p className="akaal-horarios-texto-desktop"> Es un yoga terapéutico, ya que hace que mejores de forma directa tu postura corporal.</p>


          <p className="akaal-horarios-texto-desktop"> Ideal para  reducir dolores corporales, ganar estabilidad y equilibrio, y generar un bienestar profundo tanto en el cuerpo como en la mente.</p>
          <p className="akaal-horarios-texto-desktop"> Si quieres reservar tu primera clase de forma gratuita y sin compromiso, te espero.</p>

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
                        consultar={claseItem.consultar}
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
            <WhatsAppLink message="¡Hola! Me gustaría que me dieras información sobre las clases de yoga. Muchas gracias">
              MÁS INFORMACIÓN
            </WhatsAppLink>
          </div>
        </div>
      </section>



      {/* SECCIÓN GALERÍA SLIDER */}
      <section className="akaal-slider-section">
        <div className="slider-decoracion-top">
          <img src="/img/capa.png" alt="Decoración" className="slider-capa" />
        </div>

        <div className="akaal-intro">
          <h1 className="slider-titulo">Un refugio <br /> para el cuerpo</h1>
          <p className="slider-subtitulo">Un espacio donde bajar el ritmo, escuchar el cuerpo y volver a ti. </p>
        </div>

        <Slider images={espacioAkaalImgs} />

        <div className="slider-decoracion-bottom">
          <img src="/img/capa.png" alt="Decoración" className="slider-capa" />
        </div>
      </section>

      {/* Footer - solo visible en desktop */}
      <Footer />
    </>
  );
};

export default EspacioAkaal;