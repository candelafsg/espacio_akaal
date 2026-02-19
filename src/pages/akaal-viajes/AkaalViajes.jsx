import './viajes.css';
import { ImgContainer } from '../../components/components/Components';
import { useState, useEffect } from 'react';
import { CardViajes } from '../../components/cards/Cards';
import { Button } from '../../components/buttons/Button';
import WhatsAppLink from '../../components/whatsapp-link/WhatsappLink';
import { MountainSnow, Backpack, Flower, FishSymbol, Sunset, Heart } from 'lucide-react';
import { ViajesAnterioresGallery } from '../../components/viajesAnterioresContainer/viajesAnterioresGallery';
import { Footer } from '../../components/footer/Footer';

const AkaalViajes = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [viajeActivo, setViajeActivo] = useState('AZORES');
  const [diasRestantes, setDiasRestantes] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);








  const steps = [
    {
      icon: <MountainSnow strokeWidth={1} size={58} />,
      title: 'Conexión con la naturaleza',
      description: 'Lagos volcánicos y termas naturales en el bosque y en el mar.',
    },
    {
      icon: <Flower strokeWidth={1} size={58} />,
      title: 'Yoga',
      description: 'Respira, conecta y empieza el día en calma.',
    },
    {
      icon: <Backpack strokeWidth={1} size={58} />,
      title: 'Senderismo',
      description: 'Rutas sencillas entre cascadas.',
    },
    {
      icon: <FishSymbol strokeWidth={1} size={58} />,
      title: 'Animales emblemáticos',
      description: 'Iremos en busca de ballenas y delfines para verlos vivir en su hábitat natural.',
    },

    {
      icon: <Sunset strokeWidth={1} size={58} />,
      title: 'Momentos mágicos',
      description: 'Disfrutaremos de playas salvajes y las preciosas puestas de sol',
    },
    {
      icon: <Heart strokeWidth={1} size={58} />,
      title: '¿A qué esperas?',
      description: 'Te esperamos para que vivas con nosotrx una experiencia única',
      cta: (
        <WhatsAppLink message={`¡Hola! Quiero reservar una plaza en el viaje a ${viajeActivo}`}>
          RESERVA TU PLAZA
        </WhatsAppLink>
      )
    },
  ];


  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const totalPages = 2; // Tenemos 2 páginas de cards
  const isLastStep = currentStep === steps.length - 1;


  useEffect(() => {
    const fechaViaje = new Date('2026-04-02');   //Actualizar fecha cuando se cambie el viaje 
    const hoy = new Date();
    const diferencia = fechaViaje - hoy;
    const dias = Math.ceil(diferencia / (1000 * 60 * 60 * 24));
    setDiasRestantes(dias);
  }, []);








  return (
    <>
      {/* Sección 1: Introducción a Viajes Akaal */}
      <section className="viajes-intro-section">
        <div className="viajes-intro-background">
          <img src="https://res.cloudinary.com/dhwd1b4be/image/upload/v1769501553/IMG_2224_1_gvdsoy.png" alt="Viajes Akaal" className="viajes-intro-img" loading="lazy" />
          <div className="viajes-intro-overlay"></div>
        </div>
        <div className="viajes-intro-content">
          <div className="viajes-intro-text">
            <h1 className="viajes-akaal-titulo">Viajes AKAAL</h1>
            <p className="viajes-subtitulo" style={{ fontWeight: '600' }}>Cada viaje, una intención</p>
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
              <p className="viajes-subtitulo" >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa quisquam illo, delectus cupiditate inventore, odit, numquam culpa voluptatem illum deleniti facere? Aperiam ratione sed quam deserunt quia vel, alias eos.</p></div>
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
        <div className="viajes-accordion-container">
          <div className="viajes-accordion-decoracion-top">
            <img src="/img/capa.png" alt="Decoración" className="viajes-accordion-capa" loading="lazy" />
          </div>

          <h2 className="viajes-accordion-titulo">Viajes AKAAL</h2>

          <div className="viajes-accordion-texto">
            <p>Desde Espacio AKAAL organizamos viajes conscientes y transformadores que combinan la práctica del yoga con la experiencia profunda del viaje.</p>

            <p>Son propuestas pensadas para salir de lo cotidiano y, a través del movimiento, la presencia y el contacto con lugares especiales, emprender un viaje hacia el interior.</p>

            <p>Habitualmente los realizamos a destinos con una gran fuerza espiritual y natural como la India y las Azores, creando espacios de pausa, conexión y transformación personal.</p>
          </div>

          <div className="viajes-accordion-decoracion-bottom">
            <img src="/img/capa.png" alt="Decoración" className="viajes-accordion-capa" loading="lazy" />
          </div>
        </div>
      </section>

      {/* Sección 2: AZORES */}
      <section className="viajes">
        <div className="viajes-background">
          <img src="https://res.cloudinary.com/dhwd1b4be/image/upload/v1770018531/twin-lagoons_1_r5z31s.png" alt="azores" className="viajes-imagen-fondo" loading="lazy" />
          <div className="viajes-overlay"></div>
        </div>

        <div className="viajes-texto-container">
          <div className="viajes-intro">
            <div className="viajes-intro-nombre">
              <h1 className="viajes-nombre">AZORES</h1>
              <h2 className="viajes-subnombre">SAO MIGUEL</h2>
              {/* <p className="viajes-subtitulo">Un viaje para desconectar de la rutina y reconectar contigo</p> */}
            </div>

            <div className="viajes-contador">
              <p className="viajes-fecha">2-10 ABRIL 2026</p>
              <p className="contador-texto">Quedan {diasRestantes} días</p>
            </div>

            <div className="viajes-descripcion-texto">
              <p className="descripcion-parrafo">Un viaje a São Miguel, en las Azores, para disfrutar de la naturaleza más pura del Atlántico.</p>
              {/* <p className="descripcion-parrafo">Yoga, termas naturales, paisajes volcánicos y una pequeña tribu con la que compartir la experiencia.</p> */}
              {/* <p className="plazas-disponibles">¡Quedan dos plazas!</p> */}
            </div>


            <div className="viajes-intro-buttons">



              <WhatsAppLink message={`¡Hola! Quiero reservar una plaza en el viaje a ${viajeActivo}`}>
                RESERVA TU PLAZA
              </WhatsAppLink>
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
      <section className="viajes-india-section">
        <div className="viajes-india-background">
          <img src="https://res.cloudinary.com/dhwd1b4be/image/upload/v1769679836/65498_l6wn3b.jpg" alt="India" className="viajes-india-img" loading="lazy" />
          <div className="viajes-india-overlay"></div>
        </div>
        <div className="viajes-india-content">
          <div className="viajes-india-text">
            <h1 className="viajes-india-titulo">INDIA</h1>
            <p className="viajes-india-subtitulo">Viaje espiritual al origen del yoga y la meditación</p>
            <p className="viajes-india-proximamente">PRÓXIMAMENTE</p>
          </div>
        </div>
      </section>

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
