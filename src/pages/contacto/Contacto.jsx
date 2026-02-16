
import './contacto.css'
import WhatsAppLink from '../../components/whatsapp-link/WhatsappLink';
import { ArrowUpRight } from 'lucide-react';



import { Button } from '../../components/buttons/Button';


const Contacto = () => {
    return (
        <>
       
        <section className="contacto">
            <div className="simbolo">
                <img src="/img/capa.png" alt="capa" className="capa" />
            </div>

            <div className="contacto-container">
                <h1 className="contacto-titulo">¿Hablamos? </h1>
                <p className="contacto-subtitulo">Si buscas información sobre nuestros próximos viajes, joyas, eventos, etc. , contáctanos directamente.</p>
                <WhatsAppLink style={{ width: "90%" }}>ESCRÍBENOS POR WHATSAPP</WhatsAppLink>
            </div>


            <div className="contacto-instagram-container">
                <div className="icono-insta">
                    <img src="/img/instagram.png" alt="insta" className="instagram-img" />
                    <div className="insta-cuenta"><h4 className="cuenta">@espacio.akaal</h4>
                        <p className="cuenta-subtitulo">Centro de terapias alternativas</p></div>
                </div>

                <Button
                    style={{ width: "90%" }}
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

            <div className="simbolo">
                <img src="/img/capa.png" alt="capa" className="capa" />
            </div>

        </section>

 </>
    );
}

export default Contacto;