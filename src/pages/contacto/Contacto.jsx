
import './contacto.css'
import WhatsAppLink from '../../components/whatsapp-link/WhatsappLink';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '../../components/buttons/Button';
import { Footer } from '../../components/footer/Footer';


const Contacto = () => {
    return (
        <>
       
        <section className="contacto">
            <div className="simbolo">
                <img src="/img/capa.png" alt="capa" className="capa" />
            </div>

            <div className="contacto-desktop-wrapper">
                <div className="contacto-left-container">
                    <div className="contacto-container">
                        <h1 className="contacto-titulo">¿Hablamos? </h1>
                        <p className="contacto-subtitulo">Si quieres saber más sobre joyas, viajes, clases o retiros, contáctanos y te contamos todo.</p>
                        <WhatsAppLink 
                                                    className='btn'
>ESCRÍBENOS POR WHATSAPP</WhatsAppLink>
                    </div>
                </div>

                <div className="contacto-right-container">
                    <div className="contacto-instagram-container">
                        <div className="icono-insta">
                            <img src="/img/instagram.png" alt="insta" className="instagram-img" />
                            <div className="insta-cuenta"><h4 className="cuenta">@espacio.akaal</h4>
                                <p className="cuenta-subtitulo">Centro de terapias alternativas</p></div>
                        </div>

                        <Button
                            className='btn'
                            onClick={() => window.open('https://www.instagram.com/espacio.akaal/', '_blank')}
                        >Ir a perfil de Instagram</Button>

                    </div>

                    <div className="contacto-ubicacion">
                        <a 
                            href="https://maps.google.com/?q=C/ENRIC+NAVARRO,+28+BAJO.+BENIMACLET+-+VALENCIA" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="contacto-texto"
                        >
                            <div className="p">
                                <p className="ubicacion-titulo">c/ENRIC NAVARRO, 28 BAJO.</p>
                                <p className="ubicacion-titulo">BENIMACLET - VALENCIA</p>
                            </div>

                            <div className="arrow">
                                <ArrowUpRight strokeWidth={1} />                    </div>
                        </a>

                        <div className="contacto-imagen">
                            <img src="https://res.cloudinary.com/dhwd1b4be/image/upload/v1769501183/akaal-1_ylxdws.png" alt="akaal" className="akaal-img" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="simbolo">
                <img src="/img/capa.png" alt="capa" className="capa" />
            </div>
        </section>

        <Footer />

 </>
    );
}

export default Contacto;