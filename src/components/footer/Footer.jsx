
import './footer.css'
import { NavLink } from 'react-router-dom'

export const Footer = () => {
  return (
    <footer className='footer'>

        <div className="logo">
            <p>Espacio</p>
            <h3>AKAAL</h3>
        </div>


        <div className="footer-nav">
            <ul className="footer-ul">
                <li><NavLink to="/">Inicio</NavLink></li>
                <li><NavLink to="/about">Sobre mí</NavLink></li>
                <li><NavLink to="/contacto">Contacto</NavLink></li>
                <li><NavLink to="/privacidad">Política de privacidad</NavLink></li>
            </ul>
        </div>

        <ul className="footer-ul">
             <li><NavLink to="/espacio-akaal">Espacio AKAAL</NavLink></li>
              <li><NavLink to="/akaal-viajes">Viajes AKAAL</NavLink></li>
            <li><NavLink to="/una-vioska">una vioska.</NavLink></li>
            <li><NavLink to="/gong">Baños de gong</NavLink></li>
            <li><NavLink to="/akaal-retiros">Retiros</NavLink></li>
        </ul>

        <div className="footer-contacto">
            <ul className="footer-contacto-ul">
                <li className='contact insta'>
                    <a href="https://www.instagram.com/espacio.akaal/" target="_blank" rel="noopener noreferrer">
                        Instagram
                    </a>
                </li>
                <li className='contact location'>
                    <a 
                        href="https://maps.google.com/?q=C/ENRIC+NAVARRO,+28+BAJO.+BENIMACLET+-+VALENCIA" 
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        C/ENRIC NAVARRO, 28 BAJO. BENIMACLET - VALENCIA
                    </a>
                </li>
                <li className='contact'>
                    <a href="tel:+34614218764">
                        +34 614 218 764
                    </a>
                </li>
            </ul>
        </div>
    </footer>
  )
}



