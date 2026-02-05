


import { useState, useEffect } from 'react';
import { Brain, Zap, Waves, Heart, Sparkles, ChevronLeft, ChevronRight, Users } from 'lucide-react';
import './gong.css'
import WhatsAppLink from '../../components/whatsapp-link/WhatsappLink';
import SesionGong from '../../components/sesiones-gong/SesionGong';
import { CardBeneficios } from '../../components/cards/Cards';
import { Footer } from '../../components/footer/Footer';

const Gong = () => {
   
    const [sesionIndex, setSesionIndex] = useState(0);
    const [textAnimationStep, setTextAnimationStep] = useState(0);
    const [beneficioIndex, setBeneficioIndex] = useState(0);
    const [isBeneficioAnimating, setIsBeneficioAnimating] = useState(false);
    const [isSesionAnimating, setIsSesionAnimating] = useState(false);
    // Initialize animation on component mount
    useEffect(() => {
        setTimeout(() => {
            setTextAnimationStep(1);
            setTimeout(() => {
                setTextAnimationStep(2);
                setTimeout(() => {
                    setTextAnimationStep(3);
                }, 200);
            }, 200);
        }, 500);
    }, []);

    // Intersection Observer para animaciones de secciones
    useEffect(() => {
        const observerOptions = {
            threshold: [0, 0.1, 0.5, 1],
            rootMargin: '0px 0px -100px 0px'
        };

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

    const beneficios = [
        {
            icon: <Heart className="beneficio-icon-svg" strokeWidth={1} />,
            texto: "Reduce el estrés y la ansiedad"
        },
        {
            icon: <Waves className="beneficio-icon-svg" strokeWidth={1} />,
            texto: "Mejora la calidad del sueño"
        },
        {
            icon: <Sparkles className="beneficio-icon-svg" strokeWidth={1} />,
            texto: "Libera tensiones físicas"
        },
        {
            icon: <Brain className="beneficio-icon-svg" strokeWidth={1} />,
            texto: "Aumenta la claridad mental"
        },
        {
            icon: <Zap className="beneficio-icon-svg" strokeWidth={1} />,
            texto: "Energiza el cuerpo y la mente"
        }
    ];



  
    const sesiones = [
        {
            icon: <Heart strokeWidth={1} size={40} />,
            tipo: "SESIÓN INDIVIDUAL",
            descripcion: "Un espacio íntimo y personalizado para tu transformación profunda. Sesión adaptada a ti.",
            duracion: "120 minutos",
            inversion: "60€",
            modalidad: "Presencial"
        },
        {
            icon: <Sparkles strokeWidth={1} size={40} />,
            tipo: "SESIÓN EN PAREJA",
            descripcion: "Comparte una experiencia de conexión profunda con otra persona, de una manera más privada.",
            duracion: "120 minutos",
            inversion: "80€",
            modalidad: "Presencial"
        },
        {
            icon: <Users strokeWidth={1} size={40} />,
            tipo: "SESIÓN EN GRUPO",
            descripcion: "Experiencia colectiva. Comparte vibraciones con otras personas en un espacio seguro y energético.",
            duracion: "120 minutos",
            inversion: "25€ por persona (mínimo 5 pers)",
            modalidad: "Cada dos meses"
        }
    ];





    // Funciones para slider de beneficios (mobile)
    const nextBeneficio = () => {
        setIsBeneficioAnimating(true);
        setTimeout(() => {
            setBeneficioIndex((prevIndex) => (prevIndex + 1) % beneficios.length);
            setIsBeneficioAnimating(false);
        }, 150);
    };



    const goToBeneficio = (index) => {
        if (index !== beneficioIndex) {
            setIsBeneficioAnimating(true);
            setTimeout(() => {
                setBeneficioIndex(index);
                setIsBeneficioAnimating(false);
            }, 150);
        }
    };

    // Funciones para el slider de sesiones
    const nextSesion = () => {
        setIsSesionAnimating(true);
        setTextAnimationStep(0);
        setTimeout(() => {
            setSesionIndex((prevIndex) => (prevIndex + 1) % sesiones.length);
            setTimeout(() => {
                setTextAnimationStep(1);
                setTimeout(() => {
                    setTextAnimationStep(2);
                    setTimeout(() => {
                        setTextAnimationStep(3);
                        setIsSesionAnimating(false);
                    }, 200);
                }, 200);
            }, 200);
        }, 150);
    };

    const prevSesion = () => {
        setIsSesionAnimating(true);
        setTextAnimationStep(0);
        setTimeout(() => {
            setSesionIndex((prevIndex) => (prevIndex - 1 + sesiones.length) % sesiones.length);
            setTimeout(() => {
                setTextAnimationStep(1);
                setTimeout(() => {
                    setTextAnimationStep(2);
                    setTimeout(() => {
                        setTextAnimationStep(3);
                        setIsSesionAnimating(false);
                    }, 200);
                }, 200);
            }, 200);
        }, 150);
    };

    const goToSesion = (index) => {
        if (index !== sesionIndex) {
            setIsSesionAnimating(true);
            setTextAnimationStep(0);
            setTimeout(() => {
                setSesionIndex(index);
                setTimeout(() => {
                    setTextAnimationStep(1);
                    setTimeout(() => {
                        setTextAnimationStep(2);
                        setTimeout(() => {
                            setTextAnimationStep(3);
                            setIsSesionAnimating(false);
                        }, 200);
                    }, 200);
                }, 200);
            }, 150);
        }
    };


    return (
        <>
            <section className="section-img scroll-section">
                <div className="desktop-only">
                    <div className="gong-hero-container">
                        <img src="https://res.cloudinary.com/dhwd1b4be/image/upload/v1770300997/ChatGPT_Image_5_feb_2026_13_53_25_1_pgsejm.png" alt="gong" className="desktop-gong-img" loading="lazy" />
                    </div>
                </div>
                <div className="mobile-only">
                    <img src="https://res.cloudinary.com/dhwd1b4be/image/upload/v1770301002/ChatGPT_Image_5_feb_2026_13_53_52_1_ukuttb.png" alt="gong" className="image-gong" loading="lazy" />
                </div>
                <div className="gong-hero-overlay">
                    <h1 className="gong-hero-title">Baños <br /> de gong</h1>
                    <h6 className="gong-subtitulo">Un viaje de frecuencias y vibraciones</h6>

                </div>
            </section>







            <section className="gong-beneficios animate-section scroll-section">

                <div className="gong-texto-container animate-child">

                    <div className="desktop-only simbolo-container-title">
                        <img src="/img/capa.png" alt="simbolo" className="simbolo-title" loading="lazy" />
                    </div>

                    <h1 className='gong-titulo'>Habitar <br />en el sonido.</h1>

                    <div className="gong-txt">

                        <div className="gong-txt">
                            <p className="gong-texto">Las vibraciones profundas del Gong envuelven el cuerpo y suavizan la mente, creando una sensación de paz que se expande con cada sonido.  </p>

                            <p className="gong-texto">Entre resonancias y silencios, la energía se armoniza, invitando a soltar tensiones y abrir espacio para la calma.</p>
                            <p className="gong-texto">Es una experiencia de renovación suave y profunda, un retorno al equilibrio natural de tu Ser.</p>
                        </div>
                    </div>
                </div>

                {/* Versión desktop - grid de beneficios */}
                <div className="beneficios-container animate-child">
                    <div className="beneficios-grid-completo">
                        {beneficios.map((beneficio, index) => (
                            <div key={index} className="beneficio-item animate-child">
                                <div className="beneficio-icon">{beneficio.icon}</div>
                                <div className="beneficio-texto">{beneficio.texto}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Versión mobile - slider de beneficios */}
                <div className="beneficios-mobile-container">
                    <CardBeneficios
                        icon={beneficios[beneficioIndex].icon}
                        title="Beneficio"
                        description={beneficios[beneficioIndex].texto}
                        totalSteps={beneficios.length}
                        currentStep={beneficioIndex}
                        isAnimating={isBeneficioAnimating}
                        onStepClick={goToBeneficio}
                        onNextClick={nextBeneficio}
                    />
                </div>

                <div className="simbolo-container">
                    <img src="/img/capa.png" alt="simbolo" className="simbolo" loading="lazy" />
                </div>

            </section>


            <section className="gong-sesiones animate-section scroll-section">
                <h1 className='gong-titulo animate-child'>Sesiones <br /> de conexión </h1>

                {/* Versión móvil - slider individual */}
                <div className="mobile-only animate-child">
                    <div className="sesiones-slider-container">
                        <div className="sesiones-slider">
                            <div className="sesion-slide">
                                <SesionGong
                                    sesion={sesiones[sesionIndex]}
                                    isAnimated={true}
                                    animationStep={textAnimationStep}
                                />
                            </div>
                        </div>

                        <div className="sesiones-controls">
                            <button className="sesion-slider-btn prev-btn" onClick={prevSesion} translate="no">
                                <span translate="no">ANT.</span>
                            </button>

                            <div className="sesiones-dots">
                                {sesiones.map((_, index) => (
                                    <button
                                        key={index}
                                        className={`sesion-dot ${index === sesionIndex ? 'active' : ''}`}
                                        onClick={() => goToSesion(index)}
                                    />
                                ))}
                            </div>

                            <button className="sesion-slider-btn next-btn" onClick={nextSesion} translate="no">
                                SIG.
                            </button>
                        </div>
                    </div>
                </div>

                {/* Versión desktop - 3 cards juntas en flex */}
                <div className="desktop-only animate-child">
                    <div className="sesiones-slider-container">
                        <div className="sesiones-slider">
                            {sesiones.map((sesion, index) => (
                                <div key={index} className="sesion-slide animate-child">
                                    <SesionGong
                                        sesion={sesion}
                                        isAnimated={true}
                                        animationStep={3}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="simbolo-container">
                    <img src="/img/capa.png" alt="simbolo" className="simbolo" loading="lazy" />
                </div>
            </section>

            {/* Footer solo visible en desktop */}
            <div className="desktop-only">
                <Footer />
            </div>
        </>
    );
}

export default Gong;