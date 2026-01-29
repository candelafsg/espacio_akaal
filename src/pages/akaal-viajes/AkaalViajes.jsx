import './viajes.css';
import { ImgContainer } from '../../components/components/Components';
import { useState, useEffect, useRef } from 'react';
import { CardViajes } from '../../components/cards/Cards';
import { Button } from '../../components/buttons/Button';
import WhatsAppLink from '../../components/whatsapp-link/WhatsappLink';
import { MountainSnow, Backpack, Flower, FishSymbol, Sunset, Heart } from 'lucide-react';
import { ViajesAnterioresGallery } from '../../components/viajesAnterioresContainer/viajesAnterioresGallery';
import { Footer } from '../../components/footer/Footer';

const AkaalViajes = () => {


  const [currentStep, setCurrentStep] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [showAccordion, setShowAccordion] = useState(false);
 
  const [viajeActivo, setViajeActivo] = useState('AZORES');
  const [diasRestantes, setDiasRestantes] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSectionAnimating, setIsSectionAnimating] = useState(false);
  const scrollRef = useRef(null);




  



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

  const totalPages = 2; // Tenemos 2 páginas de cards
  const totalSections = 5; // Tenemos 5 secciones en el slider: intro, azores, cards, india, viajes anteriores

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  const handlePageDotClick = (pageIndex) => {
    if (pageIndex !== currentPage) {
      setCurrentPage(pageIndex);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  const isLastStep = currentStep === steps.length - 1;
  const isLastSection = currentSection === totalSections - 1;

  // Navegación entre secciones
  const handleNextSection = () => {
    const nextSection = (currentSection + 1) % totalSections;
    setCurrentSection(nextSection);
    setIsSectionAnimating(true);
    setTimeout(() => setIsSectionAnimating(false), 300);
  };

  const handlePrevSection = () => {
    const prevSection = currentSection === 0 ? totalSections - 1 : currentSection - 1;
    setCurrentSection(prevSection);
    setIsSectionAnimating(true);
    setTimeout(() => setIsSectionAnimating(false), 300);
  };

  const handleSectionDotClick = (sectionIndex) => {
    if (sectionIndex !== currentSection) {
      setCurrentSection(sectionIndex);
      setIsSectionAnimating(true);
      setTimeout(() => setIsSectionAnimating(false), 300);
    }
  };

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };



  // USEFFECT PARA LA FECHA, QUEDAN X DÍAS. 
  useEffect(() => {
    const fechaViaje = new Date('2026-04-02');   //Actualizar fecha cuando se cambie el viaje 
    const hoy = new Date();
    const diferencia = fechaViaje - hoy;
    const dias = Math.ceil(diferencia / (1000 * 60 * 60 * 24));
    setDiasRestantes(dias);
  }, []);





  const handleNext = () => {
    const nextStep = (currentStep + 1) % steps.length;
    setCurrentStep(nextStep);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 150);

    // Scroll suave a la siguiente card en desktop
    if (scrollRef.current && window.innerWidth >= 768) {
      const cardWidth = scrollRef.current.querySelector('.card-viajes')?.offsetWidth || 0;
      scrollRef.current.scrollTo({
        left: cardWidth * nextStep,
        behavior: 'smooth'
      });
    }
  };



  const handleStepClick = (index) => {
    if (index !== currentStep) {
      setCurrentStep(index);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 150);

      // Scroll suave a la card seleccionada en desktop
      if (scrollRef.current && window.innerWidth >= 768) {
        const cardWidth = scrollRef.current.querySelector('.card-viajes')?.offsetWidth || 0;
        scrollRef.current.scrollTo({
          left: cardWidth * index,
          behavior: 'smooth'
        });
      }
    }
  };

  

  // Navegación por scroll solo en desktop
  useEffect(() => {
    const container = scrollRef.current;

    const handleScroll = () => {
      if (container && window.innerWidth >= 768) {
        const cardWidth = container.querySelector('.card-viajes')?.offsetWidth || 0;
        const newStep = Math.round(container.scrollLeft / cardWidth);
        if (newStep !== currentStep && newStep >= 0 && newStep < steps.length) {
          setCurrentStep(newStep);
        }
      }
    };

    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [currentStep, steps.length]);


  const abrirGaleria = (viaje) => {
    if (viaje && viaje.imagenes) {
      setImagenesSeleccionadas(viaje.imagenes);
      setShowGaleria(true);
    } else {
      console.error('Error: Viajes no tiene el formato esperado');
    }
  };

  return (
    <>
      <div className="secciones-slider-container">



        {/* Sección 0: Introducción a Viajes Akaal */}
        <div className={`seccion-slide ${currentSection === 0 ? 'seccion-active' : 'seccion-inactive'}`}>
          <section className="viajes-intro-section">
            <div className="viajes-intro-background">
              <img src="https://res.cloudinary.com/dhwd1b4be/image/upload/v1769501553/IMG_2224_1_gvdsoy.png" alt="Viajes Akaal" className="viajes-intro-img" />
              <div className="viajes-intro-overlay"></div>
            </div>
            <div className="viajes-intro-content">
              <div className="viajes-intro-text">
                <h1 className="viajes-akaal-titulo">Viajes AKAAL</h1>
                <div className="viajes-akaal-boton">
                  <button className="viajes-akaal-btn" onClick={() => setShowAccordion(!showAccordion)}>
                    <span className="btn-texto">{showAccordion ? 'Ocultar información' : 'Pulsa para saber más'}</span>
                    <span className={`btn-flecha ${showAccordion ? 'active' : ''}`}>↓</span>
                  </button>
                </div>
                <div className={`viajes-akaal-descripcion ${showAccordion ? 'visible' : 'oculto'}`}>
                  <div className="viajes-accordion">
                    <div className="accordion-item">
                      <button className="accordion-header" onClick={() => toggleAccordion(0)}>
                        <span>Viajes conscientes</span>
                        <span className={`accordion-icon ${activeAccordion === 0 ? 'active' : ''}`}>+</span>
                      </button>
                      <div className={`accordion-content ${activeAccordion === 0 ? 'active' : ''}`}>
                        <p>Desde Espacio AKAAL organizamos viajes conscientes y transformadores que combinan la práctica del yoga con la experiencia profunda del viaje.</p>
                      </div>
                    </div>
                    
                    <div className="accordion-item">
                      <button className="accordion-header" onClick={() => toggleAccordion(1)}>
                        <span>Nuestra experiencia</span>
                        <span className={`accordion-icon ${activeAccordion === 1 ? 'active' : ''}`}>+</span>
                      </button>
                      <div className={`accordion-content ${activeAccordion === 1 ? 'active' : ''}`}>
                        <p>Son propuestas pensadas para salir de lo cotidiano y, a través del movimiento, la presencia y el contacto con lugares especiales, emprender un viaje hacia el interior.</p>
                      </div>
                    </div>
                    
                    <div className="accordion-item">
                      <button className="accordion-header" onClick={() => toggleAccordion(2)}>
                        <span>Dónde viajamos</span>
                        <span className={`accordion-icon ${activeAccordion === 2 ? 'active' : ''}`}>+</span>
                      </button>
                      <div className={`accordion-content ${activeAccordion === 2 ? 'active' : ''}`}>
                        <p>Habitualmente los realizamos a destinos con una gran fuerza espiritual y natural como la India y las Azores, creando espacios de pausa, conexión y transformación personal.</p>
                      </div>
                    </div>
                    
                    <div className="accordion-item">
                      <button className="accordion-header" onClick={() => toggleAccordion(3)}>
                        <span>Quieres saber más</span>
                        <span className={`accordion-icon ${activeAccordion === 3 ? 'active' : ''}`}>+</span>
                      </button>
                      <div className={`accordion-content ${activeAccordion === 3 ? 'active' : ''}`}>
                        <p>Si quieres saber más de nuestros próximos viajes ponte en contacto conmigo.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Sección 1: AZORES - Unificada */}
        <div className={`seccion-slide ${currentSection === 1 ? 'seccion-active' : 'seccion-inactive'}`}>
          <section className="viajes">
            <div className="viajes-texto-container">
              <div className="viajes-intro">
                <div className="viajes-intro-nombre">
                  <h1 className="viajes-nombre">AZORES</h1>
                  <h2 className="viajes-subnombre">SAO MIGUEL</h2>
                  <p className="viajes-subtitulo">Un viaje para desconectar de la rutina y reconectar contigo</p>
                </div>

                <div className="viajes-descripcion-texto">
                  <p className="descripcion-parrafo">Un viaje a São Miguel, en las Azores, para disfrutar de la naturaleza más pura del Atlántico.</p>
                  <p className="descripcion-parrafo">Yoga, termas naturales, paisajes volcánicos y una pequeña tribu con la que compartir la experiencia.</p>
                </div>

                <div className="viajes-contador">
                  <p className="viajes-fecha">2-10 ABRIL 2026</p>
                  <p className="contador-texto">Quedan {diasRestantes} días</p>
                </div>

                <div className="viajes-intro-buttons">
                  <Button style={{ color: 'var(--background)', textAlign: 'start' }} variant='noOutlined'>VER ITINERARIO</Button>

                  <WhatsAppLink message={`¡Hola! Quiero reservar una plaza en el viaje a ${viajeActivo}`}>
                    RESERVA TU PLAZA
                  </WhatsAppLink>
                </div>
              </div>
            </div>

            <div className="viajes-imagen-container">
              <ImgContainer>
                <img src="https://res.cloudinary.com/dhwd1b4be/image/upload/v1769674722/47505_1_q03ssf.jpg" alt="azores" className="viajes-imagen" />
              </ImgContainer>
            </div>
          </section>
        </div>

        {/* Sección 3: Próximo viaje India */}
        <div className={`seccion-slide ${currentSection === 3 ? 'seccion-active' : 'seccion-inactive'}`}>
          <section className="viajes-india-section">
            <div className="viajes-india-background">
              <img src="https://res.cloudinary.com/dhwd1b4be/image/upload/v1769679836/65498_l6wn3b.jpg" alt="India" className="viajes-india-img" />
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
        </div>

        {/* Sección 4: Experiencias anteriores */}
        <div className={`seccion-slide ${currentSection === 4 ? 'seccion-active' : 'seccion-inactive'}`}>
          <section className="viajes-anteriores-section">
            <div className="viajes-anteriores-content">
              <div className="viajes-anteriores-decoracion-top">
                <img src="/img/capa.png" alt="Decoración" className="viajes-anteriores-capa" />
              </div>
              
              <h1 className="viajes-anteriores-titulo">Experiencias anteriores</h1>
              <p className="viajes-anteriores-subtitulo">Recuerdos de nuestras aventuras juntos</p>
              
              <div className="viajes-anteriores-gallery">
                <ViajesAnterioresGallery />
              </div>
              
              <div className="viajes-anteriores-decoracion-bottom">
                <img src="/img/capa.png" alt="Decoración" className="viajes-anteriores-capa" />
              </div>
            </div>
          </section>
        </div>

        {/* Sección 2: Cards */}
        <div className={`seccion-slide ${currentSection === 2 ? 'seccion-active' : 'seccion-inactive'}`}>
          <section className="viajes-cards">

        <h1 className="header-viajes">
          <span className="header-viajes-mobile">QUÉ VAS <br /> A VIVIR <br /> EN ESTE VIAJE</span>
          <span className="header-viajes-desktop">QUÉ VAS A <br /> VIVIR EN ESTE VIAJE</span>
        </h1>

        <div className="cards-scroll-container" ref={scrollRef}>
          {/* En desktop: mostrar todas las cards en slider horizontal con navegación */}
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
                  onStepClick={() => {}}
                  onNextClick={() => {}}
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
                  onStepClick={() => {}}
                  onNextClick={() => {}}
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

            {/* Navegación del slider en desktop */}
            <div className="slider-navigation-desktop">
              {/* Botón anterior */}
              <Button 
                variant="noOutlined" 
                onClick={handlePrevPage}
                disabled={currentPage === 0}
                className={`nav-button ${currentPage === 0 ? 'nav-disabled' : ''}`}
              >
                <span translate="no">ANT.</span>
              </Button>

              {/* Dots indicadores */}
              <div className="slider-dots">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <span
                    key={index}
                    className={`slider-dot ${index === currentPage ? 'active' : ''}`}
                    onClick={() => handlePageDotClick(index)}
                  />
                ))}
              </div>

              {/* Botón siguiente */}
              <Button 
                variant="noOutlined" 
                onClick={handleNextPage}
                disabled={currentPage === totalPages - 1}
                className={`nav-button ${currentPage === totalPages - 1 ? 'nav-disabled' : ''}`}
              >
                SIG.
              </Button>
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
              onStepClick={handleStepClick}
              onNextClick={handleNext}
              cta={
                isLastStep ? (
                  <WhatsAppLink message={`¡Hola! Quiero reservar una plaza en el viaje a ${viajeActivo}`}>
                    RESERVA TU PLAZA
                  </WhatsAppLink>
                ) : null
              }
            />
          </div>
        </div>
      </section>
        </div>





        {/* Navegación del slider de secciones - solo visible en el slider */}
        {currentSection < totalSections && (
          <div className="secciones-slider-navigation">
            {/* Botón anterior */}
            <Button 
              variant="noOutlined" 
              onClick={handlePrevSection}
              className="seccion-nav-button"
            >
              <span translate="no">ANT.</span>
            </Button>

            {/* Dots indicadores de secciones */}
            <div className="secciones-slider-dots">
              {Array.from({ length: totalSections }).map((_, index) => (
                <span
                  key={index}
                  className={`seccion-slider-dot ${index === currentSection ? 'active' : ''}`}
                  onClick={() => handleSectionDotClick(index)}
                />
              ))}
            </div>

            {/* Botón siguiente */}
            <Button 
              variant="noOutlined" 
              onClick={handleNextSection}
              className="seccion-nav-button"
            >
              SIG.
            </Button>
          </div>
        )}
      </div>

  <Footer />

      {/* boton flotante */}
      {/* {currentStep > 0 && (
        <div className="boton-flotante">
          <WhatsAppLink message={`¡Hola! Quiero reservar una plaza en el viaje a ${viajeActivo}`}>
            RESERVA TU PLAZA
          </WhatsAppLink>
        </div>
      )} */}



    </>
  );
};

export default AkaalViajes;
