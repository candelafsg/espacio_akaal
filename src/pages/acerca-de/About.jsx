import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, MapPin, Heart, Compass, Flower } from 'lucide-react'
import './about.css'
import { Footer } from "../../components/footer/Footer"

const About = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(0) // 0 = no direction, 1 = forward, -1 = backward

  // Intersection Observer para animaciones de secciones
  useEffect(() => {
    const observerOptions = {
      threshold: [0, 0.1, 0.5, 1],
      rootMargin: '0px 0px -100px 0px'
    }

    const handleScroll = () => {
      const scrolled = window.scrollY;
      const sections = document.querySelectorAll('.scroll-section');
      
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Calcular qué tan centrada está la sección en la vista
        const sectionCenter = rect.top + rect.height / 2;
        const viewportCenter = windowHeight / 2;
        const distance = Math.abs(sectionCenter - viewportCenter);
        const maxDistance = windowHeight / 2 + rect.height / 2;
        
        // Progreso basado en qué tan lejos está del centro
        const progress = Math.max(0, Math.min(1, distance / maxDistance));
        
        // La sección actual está al 100% cuando está centrada
        if (distance < windowHeight / 3) {
          // Sección activa: opacidad completa
          section.style.opacity = 1;
          section.style.transform = 'translateY(0) scale(1)';
        } else {
          // Sección inactiva: menos opacidad según la distancia
          section.style.opacity = Math.max(0.3, 1 - progress * 0.7);
          section.style.transform = `translateY(${progress * 15}px) scale(${1 - progress * 0.03})`;
        }
      });
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          
          // Animar elementos hijos uno a uno
          const children = entry.target.querySelectorAll('.animate-child');
          children.forEach((child, index) => {
            setTimeout(() => {
              child.classList.add('animate-in');
            }, index * 200);
          });
        }
      });
    }, observerOptions);

    // Observar secciones
    const sections = document.querySelectorAll('.animate-section');
    sections.forEach(section => observer.observe(section));

    // Añadir listener de scroll
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Ejecutar una vez al inicio

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const timeline = [
    {
      year: "2013",
      title: "El Comienzo",
      content:
        "Soy María, creadora de Espacio AKAAL. Mi camino comenzó estudiando Educación Social, una etapa que culminó en las Islas Azores durante mi Erasmus, y donde posteriormente me quedé para trabajar por primera vez como Educadora.",
      image: "/img/azores-maria.jpg",
      icon: <MapPin size={24} />
    },
    {
      year: "2014-2016",
      title: "Viaje por Sudamérica",
      content:
        "Para costear mis rutas descubrí el macramé. Me recorrí Sudamérica por tierra durante un año y medio, perfeccionando el arte de tejer nudos y engarzar piedras, mientras entendía que la vida podía vivirse de otra manera.",
      image:
        "/img/sudamerica.jpg",
      icon: <Compass size={24} />
    },
    {
      year: "2016-2017",
      title: "El Yoga como Refugio",
      content:
        "El yoga llegó a mí como un refugio y una guía en un momento interior muy delicado. Me acompañó durante todo mi viaje latinoamericano, recordándome la importancia de la calma y la presencia.",
      image:
        "/img/maria-yoga.png",
      icon: <Flower size={24} />
    },
    {
      year: "2017",
      title: "India: Transformación",
      content:
        "Viajé a la India para formarme como profesora de yoga y aprender orfebrería en plata, usando técnicas rústicas y auténticas, casi sin herramientas pero con una enorme pasión por crear con las manos.",
      image:
        "/img/maria-yoga-2.png",
      icon: <Heart size={24} />
    },
    {
      year: "Hoy",
      title: "Espacio AKAAL",
      content:
        "Tras muchos viajes y crecimiento interior, hoy todo ese camino toma forma en Espacio AKAAL: un proyecto que une viaje, yoga, artesanía y crecimiento personal.",
      image:
        "https://res.cloudinary.com/dhwd1b4be/image/upload/v1769624540/Desktop_-_1_qur0pp.png",
      icon: <Heart size={24} />
    }
  ]

  const nextSlide = () => {
    setDirection(1)
    setCurrentSlide((prev) => (prev + 1) % timeline.length)
  }

  const prevSlide = () => {
    setDirection(-1)
    setCurrentSlide((prev) => (prev - 1 + timeline.length) % timeline.length)
  }

  return (
    <div className="about-container">
      {/* HERO */}
      <section className="hero-section animate-section scroll-section">
        <div className="hero-image">
          <picture>
            <source media="(max-width: 767px)" srcSet="https://res.cloudinary.com/dhwd1b4be/image/upload/v1770130606/Frame_15_tpqt8v.png" />
            <img src="https://res.cloudinary.com/dhwd1b4be/image/upload/v1770283060/Frame_16_khzflz.png" alt="Espacio AKAAL" className='image-hero'/>
          </picture>
          <div className="hero-overlay">
            <div className="hero-content animate-child">

           <h1 className="titulo-hero">Un viaje interior</h1>
           <p className="subtitulo-hero animate-child">Este camino empezó conmigo, y hoy lo comparto contigo</p>
              {/* <span className="hero-date">Desde 2013</span> */}
            
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="timeline-section animate-section scroll-section">
        <div className="timeline-header animate-child">
          <h2>Mi Camino</h2>
          <p>Una historia de transformación a través del viaje, el yoga y la artesanía</p>
        </div>

        <div className="timeline-container animate-child">
          <div className="timeline-slider">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentSlide}
                className="timeline-slide"
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                transition={{ duration: 0.5 }}
              >
                <div className="slide-image-container">
                <img
                  src={timeline[currentSlide].image}
                  alt={timeline[currentSlide].title}
                  className="slide-image"
                /></div>
                <div className="slide-content">
                  <div className="slide-text">
                    <div className="slide-header">
                      <div className="slide-icon">
                        {timeline[currentSlide].icon}
                      </div>
                      <div>
                        <span className="slide-year">{timeline[currentSlide].year}</span>
                        <p className="slide-title">{timeline[currentSlide].title}</p>
                      </div>
                    </div>
                    <p className="slide-description">
                      {timeline[currentSlide].content}
                    </p>
                  </div>
                </div>
              </motion.div>

            </AnimatePresence>

            <button className="nav-button prev" onClick={prevSlide}>
              <ChevronLeft size={32} />
            </button>
            <button className="nav-button next" onClick={nextSlide}>
              <ChevronRight size={32} />
            </button>
          </div>

          <div className="timeline-dots">
            {timeline.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => {
                  setDirection(index > currentSlide ? 1 : -1)
                  setCurrentSlide(index)
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FINAL */}
      <section className="final-section animate-section scroll-section">
        <div className="final-content">
          <div className="final-decoracion-top">
            <img src="/img/capa.png" alt="Decoración" className="final-capa" />
          </div>
          
          <h1 className="animate-child" style={{marginBottom:'2rem'}}>Ven al lugar de encuentro para el cuerpo, manos y alma </h1>
          
          <p className="animate-child">
            Si quieres saber un poquito más de mí, y empaparte de mi recorrido, te espero en AKAAL. 
          </p>
          <p className="animate-child">
            Ven a experimentar tu propio viaje interior.
          </p>
          <div className="final-image animate-child">
            <img src="/img/conecta.png" alt="Conecta" className="conecta-img-final" />
          </div>
           <div className="final-decoracion-bottom">
            <img src="/img/capa.png" alt="Decoración" className="final-capa" />
          </div>
        </div>
      </section>

      {/* Footer - solo visible en desktop */}
      <Footer />
    </div>
  )
}

export default About
// Force update for Vercel cache
