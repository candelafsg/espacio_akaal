import './retiros.css'

const AkaalRetiros = () => {
    return (
        <>
            <section className="retiros-portada">
                <img src="https://res.cloudinary.com/dhwd1b4be/image/upload/v1770913737/Frame_50_2_raea1m.png" alt="portada" className="retiros-portada-img" />

                <div className="retiros-info">
                    <h1 className="retiros-titulo">Retiro Solsticio</h1>
                    <div className="retiros-info-icon">
                        <div className="info">19 - 21 Junio</div>
                        <div className="info">Calma, Gilet</div>
                    </div>
                </div>
            </section>

            <section className="retiro-incluye">
                <div className="capa">
                    <img src="/img/capa.png" alt="simbolo" className="svg" />
                </div>

                <div className="retiro-resumen">
                    <p className="retiro-texto">Una experiencia transformadora diseñada para reconectar con tu esencia durante el solsticio.</p>
                    <p className="retiro-texto">Tres días de pausa consciente entre las montañas de la Sierra Calderona.</p>
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

                
            </section>
        </>
    );
}

export default AkaalRetiros;