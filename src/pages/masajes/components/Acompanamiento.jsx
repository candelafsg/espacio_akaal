

import './styles.css'

const necesidades = ['Estrés y ansiedad', 'Cansancio e insomnio', 'Lesiones', 'Lumbalgias', ' Tratamiento de cicatrices', 'Contracturas', 'Alteraciones del ciclo menstrual']

const herramientas = ['·ACUPUNTURA·', '·ACUPUNTURA TUNG·', '·ELECTROACUPUNTURA·', '·AURICULOTERAPIA·']

const herramientasDos = ['·VENTOSAS·', '·MOXIBUSTIÓN·', '·MASAJE TUINA·']

export const Acompanamiento = ({ isOpen, onToggle }) => {

  return (
    <>
      <div className="acordeon">

        <div className="acordeon-desktop-header">
          <p className="acordeon-titulo-desktop">
            <strong>Acompañamiento terapéutico</strong>
            <span className="acordeon-subtitulo-desktop">Con base en medicina tradicional china</span>
          </p>
          <p className="acordeon-descripcion-desktop">Un espacio pensado para ti, donde el cuerpo y las emociones caminan de la mano hacia el bienestar.</p>
        </div>

        <div className="acordeon-header" onClick={onToggle}>
          <p className="acordeon-nombre"><strong>Acompañamiento terapéutico </strong><br /> (Con base en la medicina tradicional china)</p>
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
            <p>Un espacio de acompañamiento individual orientado a recuperar el <strong> equilibrio del cuerpo </strong> y favorecer el <strong>bienestar físico y emocional.</strong></p>
            <ul className='necesidades-ul'>
              {necesidades.map((n) => (
                <li key={n} className='necesidades-li'> <span className="icono-li"><img src="/img/star.png" alt="necesidades-terapias-holisticas" className="imagen-li" /></span>{n}</li>
              ))}
            </ul>

            <p>Cada encuentro es único, y <strong>se adapta a las necesidades de cada persona</strong> a través de distintas herramientas</p>

            <div className="herramientas">
              <div className="herramientasUno">
                {herramientas.map((h) => (
                  <span key={h} className="herramienta-item">{h}</span>
                ))}
              </div>

              <div className="herramientasDos">
                {herramientasDos.map((h) => (
                  <span key={h} className="herramienta-item">{h}</span>
                ))}
              </div>

             
            </div>
            <div className="acordeon-precio">
                <p className="tiempo">60 min.</p>
                <p className="precio">45€</p>
              </div>
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
    </>
  );
}