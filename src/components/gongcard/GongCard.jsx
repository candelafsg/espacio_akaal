
import './gongcard.css'
import WhatsAppLink from '../whatsapp-link/WhatsappLink';


export const GongCard = ({ nombre, icono, texto, duracion, precio }) => {
    return (
        <>
            <div className="card-gong">
                <div className="header-card-gong">
                    {icono} 
                    <h2 className="gong-card-titulo">{nombre}</h2>
                </div>

                <div className="gong-card-descripcion">  <p className="gong-card-descrp">{texto} </p>
                
                <div className="gong-card-info">
                 <p className="gong-card-texto">Duración: {duracion}</p>
                <p className="gong-card-texto">Precio: {precio}</p></div>
                </div>
              
               <div className="gong-card-footer">
                <WhatsAppLink >RESERVAR</WhatsAppLink>

               </div>
            </div>

        </>
    );
}