import { CardInicio } from "../../components/cards/Cards";
import { Button } from "../../components/buttons/Button";
import './inicio.css';
import { ImgContainer } from "../../components/components/Components";
import { MdOutlineNorthEast } from "react-icons/md";
import { NavLink } from "react-router";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { Footer } from "../../components/footer/Footer";

const Inicio = () => {
    const { scrollYProgress } = useScroll();
    const cardsRef = useRef();
    const cardsInView = useInView(cardsRef, { once: true, margin: "-100px" });
    const simboloRef = useRef();
    const simboloInView = useInView(simboloRef, { once: true, margin: "-100px" });
    
    // Efectos parallax para cada sección
    const heroY = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const sectionY = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const finalY = useTransform(scrollYProgress, [0, 1], [0, 300]);
    
    // Opacidad para superposición
    const heroOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 0.8, 0.3]);
    const sectionOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.8], [0, 1, 0.8]);
    const finalOpacity = useTransform(scrollYProgress, [0.4, 0.6, 1], [0, 1, 1]);
    
    // Escala para efecto de profundidad (solo cuando desaparece)
    const heroScale = useTransform(scrollYProgress, [0, 0.3, 0.6], [1, 1, 0.8]);
    const sectionScale = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [1, 1, 0.9]);
    const finalScale = useTransform(scrollYProgress, [0.4, 0.7, 1], [1, 1, 0.85]);
    
    return (
        <div className="parallax-container">
            <motion.div 
                className="parallax-layer hero-layer"
                style={{
                    y: heroY,
                    opacity: heroOpacity,
                    scale: heroScale,
                    zIndex: 30
                }}
            >
                <ImgContainer>
                    <img src="https://res.cloudinary.com/dhwd1b4be/image/upload/v1769501343/img8_kfiyrr.png" alt="inicio" className="inicio-imagen" />
                    <div className="titulo-container-inicio">
                        <h1 className="espacioAkaal">Espacio AKAAL</h1>
                    </div>
                </ImgContainer>
            </motion.div>
            
            <motion.section 
                className='section-inicio parallax-layer section-layer'
                style={{
                    y: sectionY,
                    opacity: sectionOpacity,
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
                <img src="/img/capa.png" alt="simbolo" className="simbolo" />
            </motion.div>
                <div className="titulo-container">
                    <h1 className="titulo-linea-izquierda">MANERAS DE</h1>
                    <h1 className="titulo-linea-derecha"> PENSAR EN TI</h1>
                </div>

                <div ref={cardsRef} className="cards-galeria">
                    {[
                        {
                            text: 'Sesiones que conectan y equilibran el cuerpo y la mente',
                            buttonText: 'ESPACIO AKAAL',
                            to: '/espacio-akaal',
                        },
                        {
                            text: 'Piezas hechas a mano, con propósito',
                            buttonText: 'UNA VIOSKA',
                            to: '/una-vioska',
                        },
                        {
                            text: 'Experiencias pensadas para desconectar y renovarte',
                            buttonText: 'AKAAL VIAJES',
                            to: '/akaal-viajes',
                        },
                        {
                            text: 'Reconecta contigo lejos del ruido',
                            buttonText: 'AKAAL RETIROS',
                            to: '/akaal-retiros',
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
                <img src="/img/capa.png" alt="simbolo" className="simbolo" />
            </motion.div>
            </motion.section>
            
            <motion.section 
                className="section-final parallax-layer final-layer"
                style={{
                    y: finalY,
                    opacity: finalOpacity,
                    scale: finalScale,
                    zIndex: 10
                }}
            >
                <div className="section-content">
                 <img src="/img/conecta.png" alt="conecta" className="section-contrnt-img" />
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

                {/* Footer solo visible en desktop */}
                <div className="footer-desktop">
                    <Footer />
                </div>
            </motion.section>
        </div>
    );
};

export default Inicio;