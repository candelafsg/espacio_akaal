import { useState, useRef, useEffect } from 'react';
import {
    Brain,
    Zap,
    Waves,
    Heart,
    Sparkles,
    ChevronLeft,
    ChevronRight,
    Users,
    Flower,
    HeartHandshake
    
} from 'lucide-react';

import './gong.css';
import { Footer } from '../../components/footer/Footer';
import { GongCard } from '../../components/gongcard/GongCard';
import SplitText from '../../components/split-text/SplitText';

const Gong = () => {
    const [beneficioIndex, setBeneficioIndex] = useState(0);
    const [sesionIndex, setSesionIndex] = useState(0);
    const [scrollProgress, setScrollProgress] = useState(0);

    const introduccionRef = useRef();
    const descripcionRef = useRef();
    const sesionesRef = useRef();


    const touchStartX = useRef(null);
    const touchEndX = useRef(null);

    const beneficios = [
        {
            icon: <Heart strokeWidth={1} />,
            texto: 'Reduce el estrés y la ansiedad'
        },
        {
            icon: <Waves strokeWidth={1} />,
            texto: 'Mejora la calidad del sueño'
        },
        {
            icon: <Sparkles strokeWidth={1} />,
            texto: 'Libera tensiones físicas'
        },
        {
            icon: <Brain strokeWidth={1} />,
            texto: 'Aumenta la claridad mental'
        },
        {
            icon: <Zap strokeWidth={1} />,
            texto: 'Energiza el cuerpo y la mente'
        }
    ];


    const sesiones = [
        {
            nombre: 'Sesión individual',
            icono: <Heart strokeWidth={1} color='var(--background)'/>,
            texto: 'Un espacio íntimo y personalizado para tu transformación profunda. Sesión adaptada a ti',
            duracion: '120 min.',
            precio: '60€'
        },
        {
            nombre: 'Sesión en pareja',
            icono: <HeartHandshake strokeWidth={1} color='var(--background)'/>,
            texto: 'Comparte una experiencia de conexión profunda con otra persona, de una manera más privada.',
            duracion: '120 min.',
            precio: '80€'
        },
           {
            nombre: 'Sesión en grupo',
            icono: <Flower strokeWidth={1} color='var(--background)'/>,
            texto: 'Experiencia colectiva. Comparte vibraciones con otras personas en un espacio seguro y energético.',
            duracion: '120 min.',
            precio: '25€/per (min. 5 pers)'
        }
    ]

    const nextBeneficio = () => {
        setBeneficioIndex((prev) => (prev + 1) % beneficios.length);
    };

    const prevBeneficio = () => {
        setBeneficioIndex(
            (prev) => (prev - 1 + beneficios.length) % beneficios.length
        );
    };

    const goToBeneficio = (index) => {
        setBeneficioIndex(index);
    };

    /* --- Swipe handlers --- */
    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
        touchEndX.current = null;
    };

    const handleTouchMove = (e) => {
        touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (touchStartX.current === null || touchEndX.current === null) return;

        const distance = touchStartX.current - touchEndX.current;

        if (distance > 50) nextBeneficio();
        if (distance < -50) prevBeneficio();

        touchStartX.current = null;
        touchEndX.current = null;
    };


    const nextSesion = () => {
        setSesionIndex((prev) => (prev + 1) % sesiones.length);
    };

    const prevSesion = () => {
        setSesionIndex((prev) => (prev - 1 + sesiones.length) % sesiones.length);
    };

    const goToSesion = (index) => {
        setSesionIndex(index);
    };


    const handleSesionTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
        touchEndX.current = null;
    };

    const handleSesionTouchMove = (e) => {
        touchEndX.current = e.touches[0].clientX;
    };

    const handleSesionTouchEnd = () => {
        if (touchStartX.current === null || touchEndX.current === null)
            return;

        const distance = touchStartX.current - touchEndX.current;

        if (distance > 50) nextSesion();
        if (distance < -50) prevSesion();

        touchStartX.current = null;
        touchEndX.current = null;
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const maxScroll = document.documentElement.scrollHeight - windowHeight;
            const progress = Math.min(scrollY / maxScroll, 1);
            
            setScrollProgress(progress);

            // Opacity effect for first section (introduccion)
            if (introduccionRef.current) {
                const firstSectionOpacity = Math.max(0, 1 - (scrollY / (windowHeight * 0.5)));
                introduccionRef.current.style.opacity = firstSectionOpacity;
            }

            // Opacity and transform effect for second section (descripcion)
            if (descripcionRef.current && scrollY > windowHeight * 0.3) {
                const secondSectionProgress = Math.min((scrollY - windowHeight * 0.3) / (windowHeight * 0.4), 1);
                const secondSectionOpacity = Math.min(1, secondSectionProgress);
                const translateY = Math.max(0, (1 - secondSectionProgress) * 50);
                
                descripcionRef.current.style.opacity = secondSectionOpacity;
                descripcionRef.current.style.transform = `translateY(${translateY}px)`;
            }

            // Opacity and transform effect for third section (sesiones)
            if (sesionesRef.current && scrollY > windowHeight * 0.7) {
                const thirdSectionProgress = Math.min((scrollY - windowHeight * 0.7) / (windowHeight * 0.4), 1);
                const thirdSectionOpacity = Math.min(1, thirdSectionProgress);
                const translateY = Math.max(0, (1 - thirdSectionProgress) * 50);
                
                sesionesRef.current.style.opacity = thirdSectionOpacity;
                sesionesRef.current.style.transform = `translateY(${translateY}px)`;
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial call

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    return (
        <>
            {/* HERO */}
            <section className="gong-introduccion">
                <picture className="gong-wrapper"  ref={introduccionRef}>
                    <source
                        srcSet="https://res.cloudinary.com/dhwd1b4be/image/upload/v1770300997/ChatGPT_Image_5_feb_2026_13_53_25_1_pgsejm.png"
                        media="(min-width: 768px)"
                        type="image/webp"
                    />
                    <img
                        src="https://res.cloudinary.com/dhwd1b4be/image/upload/v1770301002/ChatGPT_Image_5_feb_2026_13_53_52_1_ukuttb.png"
                        alt="portada"
                        className="gong-imagen"
                    />
                </picture>

                <div className="gong-texto">
                    <h1 className="gong-titulo">Baños de Gong</h1>
                    <p className="gong-subtitulo" style={{fontWeight:'600'}}>
                        Un viaje de frecuencias y vibraciones
                    </p>
                </div>
            </section>

            {/* DESCRIPCIÓN */}
            <section className="gong-descripcion" ref={descripcionRef}>
                <div className="svg-container">
                    <img src="/img/capa.png" alt="simbolo" className="svg-img" />
                </div>

                <h2 className="gong-titulo-desc">Habitar en el sonido</h2>

                <SplitText
                  text="Las vibraciones profundas del Gong envuelven el cuerpo y suavizan la mente, creando una sensación de paz que se expande con cada sonido."
                  className="gong-txt"
                  tag="p"
                  delay={30}
                  duration={1.2}
                  from={{ opacity: 0, y: 30 }}
                  to={{ opacity: 1, y: 0 }}
                />
                <SplitText
                  text="Entre resonancias y silencios, la energía se armoniza, invitando a soltar tensiones y abrir espacio para la calma."
                  className="gong-txt"
                  tag="p"
                  delay={30}
                  duration={1.2}
                  from={{ opacity: 0, y: 30 }}
                  to={{ opacity: 1, y: 0 }}
                />
                <SplitText
                  text="Es una experiencia de renovación suave y profunda, un retorno al equilibrio natural de tu Ser."
                  className="gong-txt"
                  tag="p"
                  delay={30}
                  duration={1.2}
                  from={{ opacity: 0, y: 30 }}
                  to={{ opacity: 1, y: 0 }}
                />
                <div className="beneficios-container">
                    {/* DESKTOP: Grid de beneficios */}
                    <div className="beneficios-grid">
                        {beneficios.map((beneficio, index) => (
                            <div className="gong-beneficio" key={index}>
                                <div className="beneficio-icon">{beneficio.icon}</div>
                                <p className="beneficio-texto">{beneficio.texto}</p>
                            </div>
                        ))}
                    </div>

                    {/* MÓVIL: Slider de beneficios */}
                    <div className="beneficios-header">
                        <button
                            className="beneficios-arrow"
                            onClick={prevBeneficio}
                            aria-label="Anterior"
                        >
                            <ChevronLeft />
                        </button>

                        <div
                            className="beneficios-viewport"
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                        >
                            <div
                                className="beneficios-track"
                                style={{
                                    transform: `translate3d(-${beneficioIndex * 100}%,0,0)`
                                }}
                            >
                                {beneficios.map((beneficio, index) => (
                                    <div className="beneficios-slide" key={index}>
                                        <div className="gong-beneficio">
                                            <div className="beneficio-icon">{beneficio.icon}</div>
                                            <p className="beneficio-texto">{beneficio.texto}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button
                            className="beneficios-arrow"
                            onClick={nextBeneficio}
                            aria-label="Siguiente"
                        >
                            <ChevronRight />
                        </button>
                    </div>

                    <div className="beneficios-dots">
                        {beneficios.map((_, index) => (
                            <button
                                key={index}
                                className={`dot ${index === beneficioIndex ? 'active' : ''
                                    }`}
                                onClick={() => goToBeneficio(index)}
                            />
                        ))}
                    </div>
                </div>
                <div className="svg-container">
                    <img src="/img/capa.png" alt="" className="svg-img" />
                </div>
            </section>

            {/* BENEFICIOS SLIDER */}
           <section className="gong-sesiones" ref={sesionesRef}>
            <div className="svg-container" style={{marginBottom:'2rem'}}>
                <img src="/img/capa.png" alt="simbolo" className="svg-img" />
            </div>
            <h2 className="gong-titulo-sesiones">Sesiones de conexión</h2>

  {/* DESKTOP: Grid de sesiones */}
  <div className="sesiones-grid">
    {sesiones.map((sesion, index) => (
      <GongCard
        key={index}
        nombre={sesion.nombre}
        icono={sesion.icono}
        texto={sesion.texto}
        duracion={sesion.duracion}
        precio={sesion.precio}
      />
    ))}
  </div>

  {/* MÓVIL: Slider de sesiones */}
  <div
    className="sesiones-viewport"
    onTouchStart={handleSesionTouchStart}
    onTouchMove={handleSesionTouchMove}
    onTouchEnd={handleSesionTouchEnd}
  >
    <div
      className="sesiones-track"
      style={{
        transform: `translate3d(-${sesionIndex * 100}%, 0, 0)`
      }}
    >
      {sesiones.map((sesion, index) => (
        <div className="sesiones-slide" key={index}>
          <GongCard
            nombre={sesion.nombre}
            icono={sesion.icono}
            texto={sesion.texto}
            duracion={sesion.duracion}
            precio={sesion.precio}
          />
        </div>
      ))}
    </div>
  </div>

  {/* CONTROLES MÓVIL */}
  <div className="sesiones-controls">
    <button
      className="sesiones-arrow"
      onClick={prevSesion}
      aria-label="Anterior"
    >
      <ChevronLeft />
    </button>

    <div className="sesiones-dots">
      {sesiones.map((_, index) => (
        <button
          key={index}
          className={`dot ${index === sesionIndex ? 'active' : ''}`}
          onClick={() => goToSesion(index)}
        />
      ))}
    </div>

    <button
      className="sesiones-arrow"
      onClick={nextSesion}
      aria-label="Siguiente"
    >
      <ChevronRight />
    </button>
  </div>
  <div className="svg-container" style={{marginTop:'2rem'}}>
    <img src="/img/capa.png" alt="simbolo" className="svg-img" />
  </div>
</section>

            <Footer />
        </>
    );
};

export default Gong;
