

import './styles.css'


const recursos = ['']

export const Seguimiento = ({ isOpen, onToggle }) => {

    return (





        <>
            <div className="acordeon">

                <div className="acordeon-desktop-header">
                    <p className="acordeon-titulo-desktop">
                    <strong> Seguimiento terapéutico</strong>
                        <span className="acordeon-subtitulo-desktop">Con base en medicina tradicional china</span>
                    </p>
                    <p className="acordeon-descripcion-desktop">El siguiente paso tras tu primera sesión, para seguir avanzando con calma y constancia.</p>
                </div>

                <div className="acordeon-header" onClick={onToggle}>
                    <p className="acordeon-nombre"><strong>Seguimiento terapéutico </strong><br /> (Con base en la medicina tradicional china)</p>
                    <span className="acordeon-icono">
                        <img
                            src={isOpen ? "/img/up.png" : "/img/down.png"}
                            alt="icono"
                            className="acordeon-icono-img"
                        />
                    </span>
                </div>

                <div className={`acordeon-wrapper ${isOpen ? 'acordeon-wrapper-open' : ''}`}>
                    <div className="acordeon-contenido">

                        <p>Sesiones pensadas para dar continuidad a tu proceso terapéutico, acompañando de forma cercana y personalizada la evolución de cada persona.</p>
                        <p>Recomendadas cuando ya se ha realizado una valoración inicial y se busca reajustar o reforzar el tratamiento, consolidando los cambios logrados y manteniendo el bienestar en el tiempo.</p>

                    </div>
                </div>

                <button type="button" className="leer-mas-toggle" onClick={onToggle}>
                    {isOpen ? 'LEER MENOS' : 'LEER MÁS'}
                    <img
                        src={isOpen ? "/img/up.png" : "/img/down.png"}
                        alt=""
                        className="leer-mas-icono"
                    />
                </button>

                {/* <div className={`imagen-wrapper ${isOpen ? 'imagen-wrapper-cerrada' : ''}`}>
                    <div className="acordeon-imagen-placeholder"></div>
                </div> */}

            </div>


        </>);
}