


import { useState, useEffect } from 'react';
import { Brain, Zap, Waves, Heart, Sparkles, ChevronLeft, ChevronRight, Users } from 'lucide-react';
import './gong.css'
import WhatsAppLink from '../../components/whatsapp-link/WhatsappLink';
import SesionGong from '../../components/sesiones-gong/SesionGong';

const Gong = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [sesionIndex, setSesionIndex] = useState(0);
    const [isSesionAnimating, setIsSesionAnimating] = useState(false);
    const [textAnimationStep, setTextAnimationStep] = useState(0);

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

    const beneficios = [
        {
            icon: <Heart className="beneficio-icon-svg" strokeWidth={1}/>,
            texto: "Reduce el estrés y la ansiedad"
        },
        {
            icon: <Waves className="beneficio-icon-svg" strokeWidth={1}/>,
            texto: "Mejora la calidad del sueño"
        },
        {
            icon: <Sparkles className="beneficio-icon-svg" strokeWidth={1}/>,
            texto: "Libera tensiones físicas"
        },
        {
            icon: <Brain className="beneficio-icon-svg" strokeWidth={1}/>,
            texto: "Aumenta la claridad mental"
        },
        {
            icon: <Zap className="beneficio-icon-svg" strokeWidth={1}/>,
            texto: "Energiza el cuerpo y la mente"
        }
    ];

    // Sistema para móvil: 5 páginas individuales
    const mobilePages = beneficios;
    const mobileTotalPages = mobilePages.length;
    
    // Sistema para desktop: 2 páginas con múltiples cards
    const desktopPages = [
        beneficios.slice(0, 3), // Primeros 3 beneficios
        beneficios.slice(3, 5)  // Últimos 2 beneficios
    ];
    const desktopTotalPages = desktopPages.length;

    const sesiones = [
        {
            icon: <Heart strokeWidth={1} size={40} />,
            tipo: "SESIÓN INDIVIDUAL",
            descripcion: "Un espacio íntimo y personalizado para tu transformación profunda. Sesión adaptada a ti.",
            duracion: "60 minutos",
            inversion: "60€",
            modalidad: "Presencial"
        },
        {
            icon: <Sparkles strokeWidth={1} size={40} />,
            tipo: "SESIÓN EN PAREJA",
            descripcion: "Comparte una experiencia de conexión profunda con tu pareja. Armonizan sus energías y fortalecen su vínculo.",
            duracion: "90 minutos",
            inversion: "80€",
            modalidad: "Presencial"
        },
        {
            icon: <Users strokeWidth={1} size={40} />,
            tipo: "SESIÓN EN GRUPO",
            descripcion: "Experiencia colectiva de sanación y transformación. Comparte vibraciones con otros seres en un espacio seguro y energético.",
            duracion: "120 minutos",
            inversion: "25€ por persona (mínimo 5 pers)",
            modalidad: "Cada dos meses"
        }
    ];


    const nextSlide = () => {
        setIsAnimating(true);
        setTimeout(() => {
            setCurrentPage((prevPage) => {
                // Para mobile: 5 páginas (0-4)
                // Para desktop: 2 páginas (0-1)
                const maxPage = window.innerWidth >= 1024 ? 1 : 4;
                return (prevPage + 1) % (maxPage + 1);
            });
            setIsAnimating(false);
        }, 150);
    };

    const prevSlide = () => {
        setIsAnimating(true);
        setTimeout(() => {
            setCurrentPage((prevPage) => {
                const maxPage = window.innerWidth >= 1024 ? 1 : 4;
                return (prevPage - 1 + (maxPage + 1)) % (maxPage + 1);
            });
            setIsAnimating(false);
        }, 150);
    };

    const goToSlide = (pageIndex) => {
        const maxPage = window.innerWidth >= 1024 ? 1 : 4;
        if (pageIndex !== currentPage && pageIndex <= maxPage) {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentPage(pageIndex);
                setIsAnimating(false);
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
        <section className="section-img">
            <img src="/img/gong-img.png" alt="gong" className="image-gong" />
            
        </section>




        <section className="gong-section">

           <div className="gong-content-wrapper">
               <div className="gong-text-content">
                   <h1 className='gong-titulo'>DESCUBRE <br /> EL MUNDO DE LAS VIBRACIONES</h1>   
                   <p className="gong-texto">Las vibraciones profundas del Gong envuelven el cuerpo y suavizan la mente, creando una sensación de paz que se expande con cada sonido. Entre resonancias y silencios, la energía se armoniza, invitando a soltar tensiones y abrir espacio para la calma. Es una experiencia de renovación suave y profunda, un retorno al equilibrio natural de tu Ser</p>
               </div>
               <div className="gong-image-content">
                   <img src="/img/gong-img.png" alt="gong" className="gong-imagen" />
               </div>
           </div>
            
        </section>



        <section className="gong-beneficios">
            <div className="simbolo-container">
                <img src="/img/capa.png" alt="simbolo" className="simbolo" />
            </div>
            
            <h1 className='gong-titulo'>BENEFICIOS</h1>

            <div className="slider-container">


                <div className="slider-content">
                    {/* Versión móvil - slider individual */}
                    <div className="mobile-only">
                        {mobilePages[currentPage] && (
                            <div className={`beneficio-item ${isAnimating ? 'animating' : ''}`}>
                                <div className="beneficio-icon">{mobilePages[currentPage].icon}</div>
                                <div className="beneficio-texto">{mobilePages[currentPage].texto}</div>
                            </div>
                        )}
                    </div>
                    
                    {/* Versión desktop - grid de beneficios */}
                    <div className="desktop-only">
                        {desktopPages[currentPage] && (
                            <div 
                                className={`beneficios-grid ${isAnimating ? 'animating' : ''}`}
                                data-page={currentPage}
                            >
                                {desktopPages[currentPage].map((beneficio, index) => (
                                    <div key={index} className="beneficio-item">
                                        <div className="beneficio-icon">{beneficio.icon}</div>
                                        <div className="beneficio-texto">{beneficio.texto}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                
                <div className="slider-controls">
                    <button className="slider-btn prev-btn" onClick={prevSlide} translate="no">
                      
                        <span translate="no">ANT.</span>
                    </button>

                <div className="slider-dots">
                    {mobilePages.map((_, index) => (
                        <button
                            key={index}
                            className={`dot ${index === currentPage ? 'active' : ''}`}
                            onClick={() => goToSlide(index)}
                        />
                    ))}
                </div>
                    <button className="slider-btn next-btn" onClick={nextSlide} translate="no">
                        SIG.
                       
                    </button>
                </div>
                
               


            </div>

            <div className="simbolo-container">
                <img src="/img/capa.png" alt="simbolo" className="simbolo" />
            </div>

            {/* Versión desktop - controles externos */}
            <div className="desktop-only">
             <div className="slider-controls-desk">
                    <button className="slider-btn prev-btn" onClick={prevSlide} translate="no">
                      
                        <span translate="no">ANT.</span>
                    </button>

                <div className="slider-dots">
                    {desktopPages.map((_, index) => (
                        <button
                            key={index}
                            className={`dot ${index === currentPage ? 'active' : ''}`}
                            onClick={() => goToSlide(index)}
                        />
                    ))}
                </div>
                    <button className="slider-btn next-btn" onClick={nextSlide} translate="no">
                        SIG.
                       
                    </button>
                </div>
            </div>


        </section>


        <section className="gong-sesiones">
            <h1 className='gong-titulo'>VEN A VIBRAR <br /> TÚ SOLX  O CON QUIEN QUIERAS </h1>
            
            {/* Versión móvil - slider individual */}
            <div className="mobile-only">
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
            <div className="desktop-only">
                <div className="sesiones-slider-container">
                    <div className="sesiones-slider">
                        {sesiones.map((sesion, index) => (
                            <div key={index} className="sesion-slide">
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
        </section>
        </>
    );
}
 
export default Gong;