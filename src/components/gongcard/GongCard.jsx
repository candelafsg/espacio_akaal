
import './gongcard.css'
import WhatsAppLink from '../whatsapp-link/WhatsappLink';


export const GongCard = ({ nombre, icono, texto, duracion, precio }) => {
    return (
        <>
            <div className="card-gong">
                <div className="header-card-gong">
                    <span className="icon">{icono}</span>
                    <h2 className="gong-card-titulo">{nombre}</h2>
                </div>

                <div className="gong-card-descripcion">  <p className="gong-card-descrp">{texto} </p>

                    <div className="gong-card-info">
                        <div className="info-container"><p className="gong-card-texto">Duración </p>
                            <p className="info-resultado">{duracion}</p></div>
                        <div className="info-container"><p className="gong-card-texto">Precio </p>
                            <p className="info-resultado">{precio}</p></div>
                    </div>
                    <WhatsAppLink message={`Hola! Estoy interesadx en reservar ${nombre}. Muchas gracias !`}>RESERVAR</WhatsAppLink>

                </div>
            </div>

        </>
    );
}