


import './styles.css'

const recursos = ['Técnicas de liberación miofascial', 'Hamacados', 'Movilizaciones articulares', 'Maniobras insppiradas en el masaje Lomi, Lomi']


export const Masaje = ({ isOpen, onToggle }) => {

    return (
        <>
          <div className="acordeon">

<div className="acordeon-desktop-header">
  <p className="acordeon-titulo-desktop"><strong>Masaje <br /> Californiano</strong></p>
  <p className="acordeon-descripcion-desktop">Movimientos envolventes y un contacto consciente que invitan a soltar, respirar y reconectar contigo.</p>
</div>

<div className="acordeon-header" onClick={onToggle}>
  <p className="acordeon-nombre"><strong>Masaje Californiano</strong></p>
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

<p>Un masaje profundamente relajante y envolvente, favoreciendo la liberación de tensiones físicas y emocionales.</p>
<p>Através de movimientos fluidos y continuos, estiramientos suaves y un contacto respetuoso se promueve un estado de descanso profundo, conexión y bienestar integral.</p>
<p>La sesión puede combinar distintos recursos como:</p>

<ul className='necesidades-ul'>
              {recursos.map((r) => (
                <li key={r} className='necesidades-li'> <span className="icono-li"><img src="/img/star.png" alt="recursos-masaje-californiano" className="imagen-li" /></span>{r}</li>
              ))}
            </ul>


      <div className="acordeon-precio">
        <p className="tiempo">75 min.</p>
        <p className="precio">60€</p>
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