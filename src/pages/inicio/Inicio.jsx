import { CardInicio } from "../../components/cards/Cards";
import { Button } from "../../components/buttons/Button";
import './inicio.css';
import { ImgContainer } from "../../components/components/Components";
import { MdOutlineNorthEast } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Footer } from "../../components/footer/Footer";

const Inicio = () => {
    const { scrollYProgress } = useScroll();
    const cardsRef = useRef();
    const cardsInView = useInView(cardsRef, { once: true, margin: "-100px" });
    const simboloRef = useRef();
    const simboloInView = useInView(simboloRef, { once: true, margin: "-100px" });
    
    // Estado para detectar si es desktop
    const [isDesktop, setIsDesktop] = useState(false);
    
    useEffect(() => {
        const checkDesktop = () => {
            setIsDesktop(window.innerWidth >= 1024);
        };
        
        checkDesktop();
        window.addEventListener('resize', checkDesktop);
        
        return () => window.removeEventListener('resize', checkDesktop);
    }, []);
    
    // Efectos parallax para cada sección
    const heroY = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const sectionY = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const finalY = useTransform(scrollYProgress, [0, 1], [0, 300]);
    
    
    // Escala para efecto de profundidad (ahora con opacidad)
    const heroScale = useTransform(scrollYProgress, [0, 0.3, 0.6], [1, 1, 1]);
    const sectionScale = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [1, 1, 1]);
    const finalScale = useTransform(scrollYProgress, [0.4, 0.7, 1], [1, 1, 1]);
    
    return (
        <div className="parallax-container">
            <motion.div 
                className="parallax-layer hero-layer"
                style={{
                    y: heroY,
                    scale: heroScale,
                    zIndex: 30
                }}
            >
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
                        <p className="espacioAkaal-subtitulo" style={{color:'var(--background)'}}>Un refugio para el movimiento, la pausa y la intención</p>
                    </div>
                </ImgContainer>
            </motion.div>
            
            <motion.section 
                className='section-inicio parallax-layer section-layer'
                style={{
                    y: sectionY,
                    scale: sectionScale,
                    zIndex: 20
                }}
            >
                <motion.div 
                ref={simboloRef}
                className="simbolo-container"
                initial={{ scale: 0, opacity: 0 }}
                animate={simboloInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <img src="/img/capa.png" alt="simbolo" className="simbolo" loading="lazy" />
            </motion.div>
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
                            buttonText: 'Viajes Akaal',
                            to: '/akaal-viajes',
                        },
                        {
                            text: 'Frecuencias para volver al centro',
                            buttonText: 'Baños de gong',
                            to: '/gong',
                        }
                    ].map((card, index) => (
                        <motion.div
                            key={card.to}
                            initial={{ opacity: 0, y: 30 }}
                            animate={cardsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{ delay: cardsInView ? index * 0.1 + 0.3 : 0, duration: 0.5 }}
                            className="cards-galeria"
                        >
                            <CardInicio buttonText={card.buttonText} to={card.to}>
                                {card.text}
                            </CardInicio>
                        </motion.div>
                    ))}
                </div>
                 <motion.div 
                className="simbolo-container"
                initial={{ scale: 0, opacity: 0 }}
                animate={simboloInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <img src="/img/capa.png" alt="simbolo" className="simbolo" loading="lazy" />
            </motion.div>
              <div className="section-content">
                 <img src="/img/conecta.png" alt="conecta" className="section-content-img" loading="lazy" />
                </div>

                <Button
                    icon={<MdOutlineNorthEast />}
                    iconPosition="right"
                    as={NavLink}
                    to='/about'
                    // variant="noOutlined"
                >
                    CONÓCENOS
                </Button>
            </motion.section>
            
            <motion.section 
                className="section-final parallax-layer final-layer"
                style={{
                    y: finalY,
                    scale: finalScale,
                    zIndex: 10
                }}
            >
              

                {/* Footer solo visible en desktop */}
                <div className="footer-desktop">
                    <Footer />
                </div>
            </motion.section>
        </div>
    );
};

export default Inicio;