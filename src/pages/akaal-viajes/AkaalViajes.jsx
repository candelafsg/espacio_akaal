import './viajes.css';

import { useState, useEffect, useRef } from 'react';
import { CardViajes } from '../../components/cards/Cards';

import WhatsAppLink from '../../components/whatsapp-link/WhatsappLink';
import { MountainSnow, Backpack, Flower, FishSymbol, Sunset, Heart } from 'lucide-react';
import { ViajesAnterioresGallery } from '../../components/viajesAnterioresContainer/viajesAnterioresGallery';
import { Footer } from '../../components/footer/Footer';
import SplitText from '../../components/split-text/SplitText';
import PdfHandler from '../../components/pdf/Pdf';
import { HouseHeart } from 'lucide-react';
import { Map } from 'lucide-react';


const AkaalViajes = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const [viajeActivo, setViajeActivo] = useState('INDIA');
  const [diasRestantes, setDiasRestantes] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)








const steps = [
  {
    icon: <Flower strokeWidth={1} size={58} />,
    title: 'Un viaje que comienza dentro',
    description:
      'India no es solo un destino, es una experiencia transformadora que despierta los sentidos y te invita a mirar el mundo —y a ti— con otros ojos.',
  },
  {
    icon: <HouseHeart strokeWidth={1} size={58} />,
    title: 'Descubre la India más auténtica',
    description:
      'Recorreremos templos, ciudades sagradas y tradiciones vivas, conectando con la esencia cultural y espiritual de un país lleno de contrastes.', // :contentReference[oaicite:0]{index=0}
  },
  {
    icon: <Backpack strokeWidth={1} size={58} />,
    title: 'Viaja ligero, vive intenso',
    description:
      'Nos moveremos en grupo con un ritmo equilibrado, combinando trenes, tuk-tuks y otros transportes para vivir la experiencia de forma real y cercana.',
  },
  {
    icon: <Map strokeWidth={1} size={58} />,
    title: 'Sumérgete en lo esencial',
    description:
      'Desde el Taj Mahal hasta Varanasi, viviremos lugares que conectan con la historia, la espiritualidad y la vida en su forma más pura.',
  },
  {
    icon: <Sunset strokeWidth={1} size={58} />,
    title: 'Cierra en la cuna del yoga',
    description:
      'Finalizaremos en Rishikesh, rodeadas de naturaleza y espiritualidad, con prácticas diarias en ashram junto a profesores nativos.', // :contentReference[oaicite:1]{index=1}
  },
  {
    icon: <Heart strokeWidth={1} size={58} />,
    title: '¿A qué esperas?',
    description:
      'Te esperamos para que vivas con nosotrxs una experiencia única que recordarás toda la vida',
    cta: (
      <WhatsAppLink message={`¡Hola! Quiero reservar una plaza en el viaje a ${viajeActivo}`}>
        RESERVA TU PLAZA
      </WhatsAppLink>
    )
  },
];



  const totalPages = 2; // Tenemos 2 páginas de cards
  const isLastStep = currentStep === steps.length - 1;



  useEffect(() => {
    const fechaViaje = new Date('2027-02-10');   //Actualizar fecha cuando se cambie el viaje - India 10-22 Feb 2027
    const hoy = new Date();
    const diferencia = fechaViaje - hoy;
    const dias = Math.ceil(diferencia / (1000 * 60 * 60 * 24));
    setDiasRestantes(dias);
  }, []);








  return (
    <>
      {/* Sección 1: Introducción a Viajes Akaal */}
      <section className="viajes-intro-section">

        <img src="https://res.cloudinary.com/dhwd1b4be/image/upload/v1771498978/6689_2_nhrhdb.jpg" alt="Viajes Akaal" className="viajes-intro-img" loading="lazy" />

        <div className="viajes-intro-content">
          <div className="viajes-intro-text">

            <SplitText
              text="Viajes AKAAL"
              className="viajes-akaal-titulo"
              tag="h1"
              delay={140}
              duration={1.8}
              from={{ opacity: 0, y: 80 }}
              to={{ opacity: 1, y: 0 }}
            />

            <SplitText
              text="Cada viaje, una intención"
              className="viajes-subtitulo"
              tag="p"
              delay={180}
              duration={1.4}
              from={{ opacity: 0, y: 25 }}
              to={{ opacity: 1, y: 0 }}
            />


          </div>
        </div>
      </section>



      <section className="section-desk">


        <img src="https://res.cloudinary.com/dhwd1b4be/image/upload/v1771498978/6689_2_nhrhdb.jpg" alt="portada" className="section-desk-img" />


        <div className="desk-content">

          <div className="intro-contenedor">
            <h1 className="viajes-akaal-titulo-desk">Viajes AKAAL</h1>

            <div className="intro-contenedor-subtitulo">
              <h2 className="contenedor-sub">Cada viaje, una intención.</h2>
              <p className="viajes-subtitulo" >Cada destino es un espacio sagrado que invita a detenerse, respirar y escuchar. <br />
                Lejos del ruido cotidiano, cultivamos presencia, silencio y conexión profunda.<br />
                Porque a veces, el viaje más importante no es hacia un lugar… sino hacia tu interior.</p></div>
          </div>


          <div className="contenedor-imgs">

            <div className="contenedor-content">

              <img src="https://res.cloudinary.com/dhwd1b4be/image/upload/v1765392296/IMG_2928_fkd0tn.jpg" alt="" className="img-content" />
            </div>

            <div className="contenedor-content">
              <img src="https://res.cloudinary.com/dhwd1b4be/image/upload/v1767437770/20240331_092747_zfcoi3.jpg" alt="" className="img-content" />
            </div>


          </div>

        </div>

      </section>










      {/* Sección 3: ¿Quienes somos? */}
      <section className="viajes-accordion-section">

        <div className="viajes-accordion-decoracion-top">
          <img src="/img/capa.png" alt="Decoración" className="viajes-accordion-capa" loading="lazy" />
        </div>

        <h2 className="viajes-accordion-titulo">Viajes AKAAL</h2>

        <div className="viajes-accordion-texto">
          <SplitText
            text="Desde Espacio AKAAL organizamos viajes conscientes y transformadores que combinan la práctica del yoga con la experiencia profunda del viaje."
            className="viajes-accordion-parrafo"
            tag="p"
            delay={30}
            duration={1.2}
            from={{ opacity: 0, y: 60 }}
            to={{ opacity: 1, y: 0 }}
          />

          <SplitText
            text="Son propuestas pensadas para salir de lo cotidiano y, a través del movimiento, la presencia y el contacto con lugares especiales, emprender un viaje hacia el interior."
            className="viajes-accordion-parrafo"
            tag="p"
            delay={50}
            duration={1}
            from={{ opacity: 0, y: 30 }}
            to={{ opacity: 1, y: 0 }}
          />

          <SplitText
            text="Habitualmente los realizamos a destinos con una gran fuerza espiritual y natural como la India y las Azores, creando espacios de pausa, conexión y transformación personal."
            className="viajes-accordion-parrafo"
            tag="p"
            delay={130}
            duration={1.5}
            from={{ opacity: 0, y: 20 }}
            to={{ opacity: 1, y: 0 }}
          />
        </div>

        <div className="viajes-accordion-decoracion-bottom">
          <img src="/img/capa.png" alt="Decoración" className="viajes-accordion-capa" loading="lazy" />
        </div>

      </section>

      {/* Sección 2: AZORES */}
      <section className="viajes">
        <div className="viajes-background">
          <img
          style={{
            opacity:'0.9',
            filter:'brightness(0.5)',
            
          }}
          src="https://res.cloudinary.com/dhwd1b4be/image/upload/q_auto/f_auto/v1775135329/2152002841_1_sidufc.jpg" alt="azores" className="viajes-imagen-fondo" loading="lazy" />
          <div className="viajes-overlay"></div>
        </div>

        <div className="viajes-texto-container">
          <div className="viajes-intro">
            <div className="viajes-intro-nombre">
              <h1 className="viajes-nombre">INDIA</h1>
              {/* <h2 className="viajes-subnombre">SAO MIGUEL</h2> */}
              <p className="viajes-subtitulo">Un viaje para desconectar de la rutina y reconectar contigo</p>
            </div>

            <div className="viajes-contador">
              <p className="viajes-fecha">10 AL 22 FEBRERO 2027</p>
              <p className="contador-texto">Quedan {diasRestantes} días</p>
            </div>

            <div className="viajes-descripcion-texto">
              <p className="descripcion-parrafo"></p>
              {/* <p className="descripcion-parrafo">Yoga, termas naturales, paisajes volcánicos y una pequeña tribu con la que compartir la experiencia.</p> */}
              {/* <p className="plazas-disponibles">¡Quedan dos plazas!</p> */}
            </div>


            <div className="viajes-intro-buttons"
            style={{
display:'flex',
flexDirection:'column',
width:'100%',
justifyContent:'center',
alignItems:'center',
            }}>



              <WhatsAppLink message={`¡Hola! Quiero reservar una plaza en el viaje a ${viajeActivo}`}>
                RESERVA TU PLAZA
              </WhatsAppLink>
              <PdfHandler  fileUrl="/dossier/INDIA.pdf" fileName="INDIA.pdf" variant='secondary'>
                DESCARGAR DOSSIER
              </PdfHandler>
              {/* <Button variant='secondary' style={{color: 'var(--background)'}}>VER ITINERARIO</Button> */}
            </div>
          </div>
        </div>
      </section>



      {/* Sección 4: Cards */}
      <section className="viajes-cards">
        <div className="viajes-cards-decoracion-top">
          <img src="/img/capa.png" alt="Decoración" className="viajes-cards-capa" loading="lazy" />
        </div>

        <h1 className="header-viajes">
          El ritmo <br />de nuestros días
        </h1>

        {/* En desktop: mostrar todas las cards en slider horizontal con navegación */}
        <div className="cards-slider-wrapper">
          <div className="cards-slider-desktop">
            {/* Página 1: primeras 3 cards */}
            <div className={`cards-page ${currentPage === 0 ? 'page-active' : 'page-inactive'}`}>
              {steps.slice(0, 3).map((step, index) => (
                <CardViajes
                  key={index}
                  icon={step.icon}
                  title={step.title}
                  description={step.description}
                  totalSteps={steps.length}
                  currentStep={currentStep}
                  isAnimating={currentPage === 0 ? isAnimating : false}
                  onStepClick={() => { }}
                  onNextClick={() => { }}
                  cta={
                    index === 2 && steps.length <= 3 ? (
                      <WhatsAppLink message={`¡Hola! Quiero reservar una plaza en el viaje a ${viajeActivo}`}>
                        RESERVA TU PLAZA
                      </WhatsAppLink>
                    ) : null
                  }
                />
              ))}
            </div>

            {/* Página 2: últimas 3 cards */}
            <div className={`cards-page ${currentPage === 1 ? 'page-active' : 'page-inactive'}`}>
              {steps.slice(3, 6).map((step, index) => (
                <CardViajes
                  key={index + 3}
                  icon={step.icon}
                  title={step.title}
                  description={step.description}
                  totalSteps={steps.length}
                  currentStep={currentStep}
                  isAnimating={currentPage === 1 ? isAnimating : false}
                  onStepClick={() => { }}
                  onNextClick={() => { }}
                  cta={
                    index === 2 ? (
                      <WhatsAppLink message={`¡Hola! Quiero reservar una plaza en el viaje a ${viajeActivo}`}>
                        RESERVA TU PLAZA
                      </WhatsAppLink>
                    ) : null
                  }
                />
              ))}
            </div>
          </div>

          {/* Navegación del slider en desktop */}
          <div className="slider-navigation-desktop">
            {/* Flecha anterior */}
            <button
              className={`cards-arrow cards-arrow-prev ${currentPage === 0 ? 'disabled' : ''}`}
              onClick={() => {
                if (currentPage > 0) {
                  setCurrentPage(currentPage - 1);
                  setIsAnimating(true);
                  setTimeout(() => setIsAnimating(false), 300);
                }
              }}
              disabled={currentPage === 0}
              aria-label="Anterior"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            {/* Dots indicadores */}
            <div className="slider-dots">
              {Array.from({ length: totalPages }).map((_, index) => (
                <span
                  key={index}
                  className={`slider-dot ${index === currentPage ? 'active' : ''}`}
                  onClick={() => {
                    if (index !== currentPage) {
                      setCurrentPage(index);
                      setIsAnimating(true);
                      setTimeout(() => setIsAnimating(false), 300);
                    }
                  }}
                />
              ))}
            </div>

            {/* Flecha siguiente */}
            <button
              className={`cards-arrow cards-arrow-next ${currentPage === totalPages - 1 ? 'disabled' : ''}`}
              onClick={() => {
                if (currentPage < totalPages - 1) {
                  setCurrentPage(currentPage + 1);
                  setIsAnimating(true);
                  setTimeout(() => setIsAnimating(false), 300);
                }
              }}
              disabled={currentPage === totalPages - 1}
              aria-label="Siguiente"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        {/* En mobile: mostrar solo la card actual */}
        <div className="cards-container-mobile">
          <CardViajes
            icon={steps[currentStep].icon}
            title={steps[currentStep].title}
            description={steps[currentStep].description}
            totalSteps={steps.length}
            currentStep={currentStep}
            isAnimating={isAnimating}
            onStepClick={(index) => {
              if (index !== currentStep) {
                setCurrentStep(index);
                setIsAnimating(true);
                setTimeout(() => setIsAnimating(false), 150);
              }
            }}
            onNextClick={() => {
              const nextStep = (currentStep + 1) % steps.length;
              setCurrentStep(nextStep);
              setIsAnimating(true);
              setTimeout(() => setIsAnimating(false), 150);
            }}
            cta={
              isLastStep ? (
                <WhatsAppLink message={`¡Hola! Quiero reservar una plaza en el viaje a ${viajeActivo}`}>
                  RESERVA TU PLAZA
                </WhatsAppLink>
              ) : null
            }
          />
        </div>

        <div className="viajes-cards-decoracion-bottom">
          <img src="/img/capa.png" alt="Decoración" className="viajes-cards-capa" loading="lazy" />
        </div>
      </section>

      {/* Sección 5: Próximo viaje India */}
      {/* <section className="viajes-india-section">
        <div className="viajes-india-background">
          <img src="https://res.cloudinary.com/dhwd1b4be/image/upload/v1769679836/65498_l6wn3b.jpg" alt="India" className="viajes-india-img" loading="lazy" />
          <div className="viajes-india-overlay"></div>
        </div>
        <div className="viajes-india-content">
          <div className="viajes-india-text">
            <h1 className="viajes-india-titulo">INDIA</h1>
            <p className="viajes-india-subtitulo">Viaje espiritual al origen del yoga y la meditación</p>
            <p className="viajes-india-proximamente">PRÓXIMAMENTE</p>
            <div className="buttons-container-dossier"> */}
              {/* <PdfHandler fileUrl="/dossier/INDIA.pdf" fileName="INDIA.pdf" variant='primary'>
                DESCARGAR DOSSIER 
              </PdfHandler> */}
            {/* </div>
          </div>
        </div>
      </section> */}

      {/* Sección 6: Experiencias anteriores */}
      <section className="viajes-anteriores-section">
        <div className="viajes-anteriores-content">
          <div className="viajes-anteriores-decoracion-top">
            <img src="/img/capa.png" alt="Decoración" className="viajes-anteriores-capa" loading="lazy" />
          </div>

          <h1 className="viajes-anteriores-titulo">Experiencias anteriores</h1>
          <p className="viajes-anteriores-subtitulo">Recuerdos de nuestras aventuras juntxs</p>

          <div className="viajes-anteriores-gallery">
            <ViajesAnterioresGallery />
          </div>

          <div className="viajes-anteriores-decoracion-bottom">
            <img src="/img/capa.png" alt="Decoración" className="viajes-anteriores-capa" loading="lazy" />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default AkaalViajes;
