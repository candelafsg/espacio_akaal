import './retiros.css'
import WhatsAppLink from '../../components/whatsapp-link/WhatsappLink';
import { Button } from '../../components/buttons/Button';
import { useState, useEffect } from 'react';
const AkaalRetiros = () => {


    const [overlay, setOverlay] = useState(false)

    const handleOpen = () => {
    setOverlay(true)

    }

    const handleClose = () => {
        setOverlay(false)
    }

   


    useEffect(() => {
    if (overlay) {
        document.body.style.overflow = "hidden"
    } else {
        document.body.style.overflow = "auto"
    }
}, [overlay])



    return (
        <>
            <section className="retiros-portada">
                <img src="https://res.cloudinary.com/dhwd1b4be/image/upload/v1770913737/Frame_50_2_raea1m.png" alt="portada" className="retiros-portada-img" />

                <div className="retiros-info">
                    <h1 className="retiros-titulo">Retiro Solsticio</h1>
                    <div className="retiros-info-icon">
                        <div className="info">19 - 21 Junio</div>
                        <div className="info">Calima, Gilet</div>
                    </div>
                </div>
            </section>

            <section className="retiro-incluye">
                <div className="capa">
                    <img src="/img/capa.png" alt="simbolo" className="svg" />
                </div>

                <div className="retiro-resumen">
                    <h1 className="retiro-texto">Una experiencia transformadora</h1>
                    <p className="retiro-texto">Tres días para reconectar contigoentre las montañas de la Sierra Calderona durante el solsticio.</p>
                </div>

                <div className="retiro-eleme">
                    <div className="line-incluido">
                        <div className="line"></div>
                        <p className="retiro-text">INCLUIDO</p>
                    </div>

                    <ul className="retiro-ul">
                        <li className="retiro-li">
                            <img src="/img/home.png" alt="home" className="img-incluye" />
                            <p className="retiro-p">Alojamiento</p>
                        </li>
                        <li className="retiro-li">
                            <img src="/img/yoga.png" alt="yoga" className="img-incluye" />
                            <p className="retiro-p">Yoga y Meditación</p>
                        </li>
                        <li className="retiro-li">
                            <img src="/img/gong.png" alt="gong" className="img-incluye" />
                            <p className="retiro-p">Terapia de sonido</p>
                        </li>
                        <li className="retiro-li">
                            <img src="/img/nature.png" alt="nature" className="img-incluye" />
                            <p className="retiro-p">Inmersión en la naturaleza</p>
                        </li>
                    </ul>
                </div>





                <div className="inmersion-info-precio">
                    <div className="inmersion-info">
                        <p className="inmersion-texto">INMERSIÓN COMPLETA</p>
                        <h3 className="inmersion-precio">Desde 320€</h3>
                    </div>

                    <div className="inmersion-info">
                        <p className="inmersion-texto">PLAZAS LIMITADAS</p>
                         <p className="inmersion-texto" style={{fontWeight:'700', textAlign:'end'}}>ANA y MARÍA</p>

                    </div>
                </div>
                <div className="capa">
                    <img src="/img/capa.png" alt="simbolo" className="svg" />
                </div>


<div className="buttons-container">
<Button variant='secondary' onClick={handleOpen}>VER PROGRAMA COMPLETO</Button>
                <WhatsAppLink>RESERVAR MI PLAZA</   WhatsAppLink>
                </div>



                {
                    overlay && (
                        
                        <div className="overlay-dossier">
                            <div className="cerrar-container">
                            <div className="boton-cerrar" onClick={handleClose}>CERRAR</div></div>
                          <iframe src="/dossier/retiro.pdf" className="dossier"></iframe>
                        </div>
                    )
                }
                
            </section>
        </>
    );
}

export default AkaalRetiros;