


import { useState, useEffect } from 'react';
import { Brain, Zap, Waves, Heart, Sparkles, ChevronLeft, ChevronRight, Users } from 'lucide-react';
import './gong.css'

const Gong = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
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

    const sesiones = [
        {
            icon: <Heart strokeWidth={1} size={40} />,
            tipo: "SESIÓN INDIVIDUAL",
            descripcion: "Un espacio íntimo y personalizado para tu transformación profunda. Sesión adaptada  a ti.",
            duracion: "60 minutos",
            inversion: "45€",
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
            inversion: "35€ por persona",
            modalidad: "Cada dos meses"
        }
    ];


    const nextSlide = () => {
        setIsAnimating(true);
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % beneficios.length);
            setIsAnimating(false);
        }, 150);
    };


    const prevSlide = () => {
        setIsAnimating(true);
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex - 1 + beneficios.length) % beneficios.length);
            setIsAnimating(false);
        }, 150);
    };


    const goToSlide = (index) => {
        if (index !== currentIndex) {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentIndex(index);
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

           
           <h1 className='gong-titulo'>DESCUBRE <br /> EL MUNDO DE LAS VIBRACIONES</h1>   

            <p className="gong-texto">Las vibraciones profundas del Gong envuelven el cuerpo y suavizan la mente, creando una sensación de paz que se expande con cada sonido. Entre resonancias y silencios, la energía se armoniza, invitando a soltar tensiones y abrir espacio para la calma. Es una experiencia de renovación suave y profunda, un retorno al equilibrio natural de tu Ser</p>

            <img src="/img/gong-img.png" alt="gong" className="gong-imagen" />
            
        </section>



        <section className="gong-beneficios">

            <h1 className='gong-titulo'>BENEFICIOS</h1>

            <div className="slider-container">


                <div className="slider-content">
                    <div className={`beneficio-item ${isAnimating ? 'animating' : ''}`}>
                        <div className="beneficio-icon">{beneficios[currentIndex].icon}</div>
                        <div className="beneficio-texto">{beneficios[currentIndex].texto}</div>
                    </div>
                </div>
                
                <div className="slider-controls">
                    <button className="slider-btn prev-btn" onClick={prevSlide}>
                      
                        ANT.
                    </button>

                <div className="slider-dots">
                    {beneficios.map((_, index) => (
                        <button
                            key={index}
                            className={`dot ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => goToSlide(index)}
                        />
                    ))}
                </div>
                    <button className="slider-btn next-btn" onClick={nextSlide}>
                        SIG.
                       
                    </button>
                </div>
                
               


            </div>
        </section>


        <section className="gong-sesiones">
            <h1 className='gong-titulo'>VEN A VIBRAR <br /> TÚ SOLX  O CON QUIEN QUIERAS </h1>
            
            <div className="sesiones-slider-container">
                <div className="sesiones-slider">
                    <div className="sesion-slide">
                        <div className="sesion-card">
                            <div className={`sesion-header ${textAnimationStep >= 1 ? 'animate-in' : ''}`}>
                                <div className={`sesion-icon ${textAnimationStep >= 1 ? 'animate-in' : ''}`}>
                                    {sesiones[sesionIndex].icon}
                                </div>
                                <h2 className={`sesion-tipo ${textAnimationStep >= 1 ? 'animate-in' : ''}`}>{sesiones[sesionIndex].tipo}</h2>
                            </div>
                            
                            <div className="sesion-content">
                                <p className={`sesion-descripcion ${textAnimationStep >= 2 ? 'animate-in' : ''}`}>
                                    {sesiones[sesionIndex].descripcion}
                                </p>
                                
                                <div className={`sesion-detalles ${textAnimationStep >= 3 ? 'animate-in' : ''}`}>
                                    <div className="detalle-item">
                                        <span className="detalle-label">Duración:</span>
                                        <span className="detalle-valor">{sesiones[sesionIndex].duracion}</span>
                                    </div>
                                    <div className="detalle-item">
                                        <span className="detalle-label">Inversión:</span>
                                        <span className="detalle-valor">{sesiones[sesionIndex].inversion}</span>
                                    </div>
                                    <div className="detalle-item">
                                        <span className="detalle-label">Modalidad:</span>
                                        <span className="detalle-valor">{sesiones[sesionIndex].modalidad}</span>
                                    </div>
                                </div>
                                
                                <button className={`sesion-btn ${textAnimationStep >= 3 ? 'animate-in' : ''}`}>
                                    RESERVAR SESIÓN
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="sesiones-controls">
                    <button className="sesion-slider-btn prev-btn" onClick={prevSesion}>
                        
                        ANT.
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

                    <button className="sesion-slider-btn next-btn" onClick={nextSesion}>
                        SIG.
                       
                    </button>
                </div>
            </div>
            
           
        </section>
        </>
    );
}
 
export default Gong;