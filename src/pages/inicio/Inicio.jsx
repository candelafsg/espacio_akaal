import { CardInicio } from "../../components/cards/Cards";
import { Button } from "../../components/buttons/Button";
import './inicio.css';
import { ImgContainer } from "../../components/components/Components";
import { MdOutlineNorthEast } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { Footer } from "../../components/footer/Footer";

const Inicio = () => {
    const cardsRef = useRef();
    const simboloRef = useRef();
    const firstSectionRef = useRef();
    const secondSectionRef = useRef();

    const [isDesktop, setIsDesktop] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const checkDesktop = () => {
            setIsDesktop(window.innerWidth >= 1024);
        };

        checkDesktop();
        window.addEventListener('resize', checkDesktop);

        return () => window.removeEventListener('resize', checkDesktop);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const maxScroll = document.documentElement.scrollHeight - windowHeight;
            const progress = Math.min(scrollY / maxScroll, 1);
            
            setScrollProgress(progress);

            // Opacity effect for first section
            if (firstSectionRef.current) {
                const firstSectionOpacity = Math.max(0, 1 - (scrollY / (windowHeight * 0.5)));
                firstSectionRef.current.style.opacity = firstSectionOpacity;
            }

            // Opacity and transform effect for second section
            if (secondSectionRef.current && scrollY > windowHeight * 0.3) {
                const secondSectionProgress = Math.min((scrollY - windowHeight * 0.3) / (windowHeight * 0.4), 1);
                const secondSectionOpacity = Math.min(1, secondSectionProgress);
                const translateY = Math.max(0, (1 - secondSectionProgress) * 50);
                
                secondSectionRef.current.style.opacity = secondSectionOpacity;
                secondSectionRef.current.style.transform = `translateY(${translateY}px)`;
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial call

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
               <section className="inicio-contenedor" ref={firstSectionRef}>
                <img 
                    src={
                        isDesktop 
                            ? "https://res.cloudinary.com/dhwd1b4be/image/upload/v1769624540/Desktop_-_1_qur0pp.png"
                            : "https://res.cloudinary.com/dhwd1b4be/image/upload/v1769501290/img2_yo27mp.png"
                    } 
                    alt="inicio" 
                    className="inicio-imagen" 
                />
                <div className="titulo-container-inicio">
                    <h1 className="espacioAkaal">Espacio AKAAL</h1>
                    <p className="espacioAkaal-subtitulo" style={{color:'var(--background)', fontWeight:'600'}}>
                        Un refugio para el movimiento, la pausa y la intención
                    </p>
                </div>
           </section>

            <section className="inicio-maneras" ref={secondSectionRef}>

            <div className="simbolo-container" ref={simboloRef}>
                <img src="/img/capa.png" alt="simbolo" className="simbolo" loading="lazy" />
            </div>

            <div className="titulo-container">
                <h1 className="titulo-linea-izquierda">MANERAS DE</h1>
                <h1 className="titulo-linea-derecha"> PENSAR EN TI</h1>
            </div>

            <div ref={cardsRef} className="cards-galeria">
                {[ 
                    {
                        text: 'Sesiones que conectan y equilibran el cuerpo y la mente',
                        buttonText: 'Espacio AKAAL',
                        to: '/espacio-akaal',
                    },
                    {
                        text: 'Piezas hechas a mano, con propósito',
                        buttonText: 'una vioska.',
                        to: '/una-vioska',
                    },
                    {
                        text: 'Experiencias pensadas para desconectar y renovarte',
                        buttonText: 'Viajes AKAAL',
                        to: '/akaal-viajes',
                    },
                    {
                        text: 'Frecuencias para volver al centro',
                        buttonText: 'Baños de gong',
                        to: '/gong',
                    }
                ].map((card) => (
                    <CardInicio key={card.to} buttonText={card.buttonText} to={card.to}>
                        {card.text}
                    </CardInicio>
                ))}
            </div>

            <div className="simbolo-container">
                <img src="/img/capa.png" alt="simbolo" className="simbolo" loading="lazy" />
            </div>

            <div className="section-content">
                <img src="/img/conecta.png" alt="conecta" className="section-content-img" loading="lazy" />
                <Button
                    icon={<MdOutlineNorthEast />}
                    iconPosition="right"
                    as={NavLink}
                    to='/about'
                >
                    CONÓCEME
                </Button>
            </div>

            </section>

            <div className="footer-desktop">
                <Footer />
            </div>
        </>
    );
};

export default Inicio;
