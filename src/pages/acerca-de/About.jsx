import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, MapPin, Heart, Compass, Flower } from 'lucide-react'
import './about.css'
import { Footer } from "../../components/footer/Footer"
const About = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(0) // 0 = no direction, 1 = forward, -1 = backward

 
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
          <img src="https://res.cloudinary.com/dhwd1b4be/image/upload/v1770300788/ChatGPT_Image_3_feb_2026_16_33_41_1_t6irit.png" alt="Espacio AKAAL" className='image-hero' loading="lazy"/>
          <div className="hero-overlay">
            <div className="hero-content animate-child">

           <h1 className="titulo-hero">Un viaje interior</h1>
           <p className="subtitulo-hero animate-child" style={{fontWeight:'600'}}>Este camino empezó conmigo, y hoy lo comparto contigo</p>
            
            
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="timeline-section animate-section scroll-section">
        <div className="timeline-header animate-child">
          <h2>El viaje que me transformó</h2>
          <p>Una travesía interior entre viaje, yoga y creación.</p>
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
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <div className="slide-image-container">
                  <img
                    src={timeline[currentSlide].image}
                    alt={timeline[currentSlide].title}
                    className="slide-image"
                  />
                </div>
                <div className="slide-content">
                  <div className="slide-text">
                    <motion.div 
                      className="slide-header"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <div className="slide-icon">
                        {timeline[currentSlide].icon}
                      </div>
                      <div>
                        <span className="slide-year">{timeline[currentSlide].year}</span>
                        <p className="slide-title">{timeline[currentSlide].title}</p>
                      </div>
                    </motion.div>
                    <motion.p 
                      className="slide-description"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      {timeline[currentSlide].content}
                    </motion.p>
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
            <img src="/img/capa.png" alt="Decoración" className="final-capa" loading="lazy" />
          </div>
          
          <h1 className="animate-child final-h1" style={{marginBottom:'2rem'}}>Ven al lugar de encuentro para el cuerpo, mente y alma </h1>
          
          <p className="animate-child">
            Si quieres saber un poquito más de mí, y empaparte de mi recorrido, te espero en AKAAL. 
          </p>
          <p className="animate-child">
            Ven a experimentar tu propio viaje interior.
          </p>
          <div className="final-image animate-child">
            <img src="/img/conecta.png" alt="Conecta" className="conecta-img-final" loading="lazy" />
          </div>
           <div className="final-decoracion-bottom">
            <img src="/img/capa.png" alt="Decoración" className="final-capa" loading="lazy" />
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
