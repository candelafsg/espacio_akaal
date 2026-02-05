

import './contacto.css'

import { Phone, MapPin } from 'lucide-react';
import { IoLogoInstagram } from "react-icons/io5";
import { useEffect } from 'react';


const Contacto = () => {

    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Animar elementos hijos uno a uno
                    const children = entry.target.querySelectorAll('.animate-child');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('animate-in');
                        }, index * 200);
                    });
                }
            });
        }, observerOptions);

        // Observar secciones
        const sections = document.querySelectorAll('.animate-section');
        sections.forEach(section => observer.observe(section));

        return () => observer.disconnect();
    }, []);

    return (

        <>
            <section className="contacto-section animate-section">
                <div className="contacto-background">
                    <img src="https://res.cloudinary.com/dhwd1b4be/image/upload/v1769501261/akaal-1_jobcs5.png" alt="espacio" className="contacto-bg-img" loading="lazy" />
                </div>
                <div className="contacto-content animate-child">
                    <div className="titulo-conecta-container">
                        <h1 className="contacto-titulo">Visita <br/> Espacio AKAAL</h1>
                        <div className="contacto-imagen-texto">
                            <img src="/img/conecta.png" alt="conecta" className="contacto-texto-img" loading="lazy" />
                            <img src="/img/capa.png" alt="" className="capa-about" loading="lazy" />
                        </div>
                    </div>
                    
                    <div className="contacto">
                        <a href="tel:+34614218764" className="contacto-item animate-child">
                            <Phone strokeWidth={1} size={18}/>
                            <p className="contacto-p">+34 614 218 764</p>
                        </a>

                        <a 
                            href="https://maps.google.com/?q=C/ENRIC+NAVARRO,+28+BAJO.+BENIMACLET+-+VALENCIA" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="contacto-item animate-child"
                        >
                            <MapPin strokeWidth={1} size={18}/>
                            <p className="contacto-p">C/ENRIC NAVARRO, 28 BAJO. BENIMACLET - VALENCIA</p>
                        </a>
                        
                        <a 
                            href="https://www.instagram.com/espacio.akaal/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="contacto-item animate-child"
                        >
                            <IoLogoInstagram size={18} />
                            <p className="contacto-p">@ESPACIO.AKAAL</p>
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Contacto;