


import { useState } from 'react';
import { Brain, Zap, Waves, Heart, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import './gong.css'

const Gong = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    
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


    return (  
        <>
        <section className="section-img">
            <img src="/img/gong-img.png" alt="gong" className="image-gong" />
            
        </section>




        <section className="gong-texto">

            <p className="gong-texto">Las vibraciones profundas del Gong envuelven el cuerpo y suavizan la mente, creando una sensación de paz que se expande con cada sonido. Entre resonancias y silencios, la energía se armoniza, invitando a soltar tensiones y abrir espacio para la calma. Es una experiencia de renovación suave y profunda, un retorno al equilibrio natural de tu Ser</p>
            
        </section>



        <section className="gong-beneficios">

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
            
        </section>
        </>
    );
}
 
export default Gong;