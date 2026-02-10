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

    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const checkDesktop = () => {
            setIsDesktop(window.innerWidth >= 1024);
        };

        checkDesktop();
        window.addEventListener('resize', checkDesktop);

        return () => window.removeEventListener('resize', checkDesktop);
    }, []);

    return (
        <>
            <ImgContainer>
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
                    <p className="espacioAkaal-subtitulo" style={{color:'var(--background)'}}>
                        Un refugio para el movimiento, la pausa y la intención
                    </p>
                </div>
            </ImgContainer>


            <section className="inicio-maneras">

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
