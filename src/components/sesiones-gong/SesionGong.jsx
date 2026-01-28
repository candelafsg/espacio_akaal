import React from 'react';
import WhatsAppLink from '../whatsapp-link/WhatsappLink';

const SesionGong = ({ sesion, isAnimated = false, animationStep = 0 }) => {
    return (
        <div className="sesion-card">
            <div className={`sesion-header ${isAnimated && animationStep >= 1 ? 'animate-in' : ''}`}>
                <div className={`sesion-icon ${isAnimated && animationStep >= 1 ? 'animate-in' : ''}`}>
                    {sesion.icon}
                </div>
                <h2 className={`sesion-tipo ${isAnimated && animationStep >= 1 ? 'animate-in' : ''}`}>
                    {sesion.tipo}
                </h2>
            </div>
            
            <div className="sesion-content">
                <p className={`sesion-descripcion ${isAnimated && animationStep >= 2 ? 'animate-in' : ''}`}>
                    {sesion.descripcion}
                </p>
                
                <div className={`sesion-detalles ${isAnimated && animationStep >= 3 ? 'animate-in' : ''}`}>
                    <div className="detalle-item">
                        <span className="detalle-label">Duración:</span>
                        <span className="detalle-valor">{sesion.duracion}</span>
                    </div>
                    <div className="detalle-item">
                        <span className="detalle-label">Precio:</span>
                        <span className="detalle-valor">{sesion.inversion}</span>
                    </div>
                </div>
                
                <WhatsAppLink 
                    message={`¡Hola! Me gustaría que me dieras información para reservar una ${sesion.tipo.toLowerCase()} de Baño de Gong. ¡Muchas gracias!`}
                    className={`sesion-btn ${isAnimated && animationStep >= 3 ? 'animate-in' : ''}`}
                >
                    RESERVAR SESIÓN
                </WhatsAppLink>
            </div>
        </div>
    );
};

export default SesionGong;