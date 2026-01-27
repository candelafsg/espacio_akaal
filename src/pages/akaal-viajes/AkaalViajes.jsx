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
  const totalSections = 2; // Tenemos 2 secciones en el slider

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



        {/* Sección 1: AZORES - Unificada */}
        <div className={`seccion-slide ${currentSection === 0 ? 'seccion-active' : 'seccion-inactive'}`}>
          <section className="viajes">
            <div className="viajes-texto-container">
              <div className="viajes-intro">
                <div className="viajes-intro-nombre">
                  <h1 className="viajes-nombre">AZORES - SAO MIGUEL</h1>
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
                  <Button style={{ color: 'var(--primary)', textAlign: 'start' }} variant='noOutlined'>VER ITINERARIO</Button>

                  <WhatsAppLink message={`¡Hola! Quiero reservar una plaza en el viaje a ${viajeActivo}`}>
                    RESERVA TU PLAZA
                  </WhatsAppLink>
                </div>
              </div>
            </div>

            <div className="viajes-imagen-container">
              <ImgContainer>
                <img src="/img/azores.jpg" alt="azores" className="viajes-imagen" />
              </ImgContainer>
            </div>
          </section>
        </div>

        {/* Sección 3: Cards */}
        <div className={`seccion-slide ${currentSection === 1 ? 'seccion-active' : 'seccion-inactive'}`}>
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
                ANT.
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
              ANT.
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

      <section className="viajes-anteriores">

        <div className="anteriores-container">
          <h1 className="anteriores-titulo">PRÓXIMO VIAJE</h1>
          <div className="proximo-viaje-container">
            <img src="/img/india.jpg" alt="India" className="proximo-viaje-img" />
            <div className="proximo-viaje-overlay">
              <div className="proximo-viaje-badge">INDIA</div>
            </div>
          </div>
        </div>
       
        <div className="anteriores-container">
           <h1 className="anteriores-titulo">VIAJES ANTERIORES</h1>
          <ViajesAnterioresGallery />
        </div>
      
      </section>

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
