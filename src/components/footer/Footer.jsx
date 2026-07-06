
import './footer.css'
import { NavLink } from 'react-router-dom'

export const Footer = () => {
  return (
    <footer className='footer'>

        <div className="footer__brand">
            <p>Espacio AKAAL</p>
        </div>

        <nav aria-label="Navegación principal">
            <ul className="footer__list">
                <li><NavLink to="/">Inicio</NavLink></li>
                <li><NavLink to="/about">Sobre mí</NavLink></li>
                <li><NavLink to="/contacto">Contacto</NavLink></li>
                <li><NavLink to="/privacidad">Política de privacidad</NavLink></li>
            </ul>
        </nav>

        <nav aria-label="Secciones de Espacio AKAAL">
            <ul className="footer__list">
                <li><NavLink to="/espacio-akaal">Espacio AKAAL</NavLink></li>
                <li><NavLink to="/akaal-viajes">Viajes AKAAL</NavLink></li>
                <li><NavLink to="/una-vioska">una vioska.</NavLink></li>
                <li><NavLink to="/gong">Baños de gong</NavLink></li>
                <li><NavLink to="/akaal-retiros">Retiros</NavLink></li>
            </ul>
        </nav>

        <div className="footer__contact">
            <ul className="footer__contact-list">
                <li className='footer__contact-item footer__contact-item--instagram'>
                    <a href="https://www.instagram.com/espacio.akaal/" target="_blank" rel="noopener noreferrer">
                        Instagram
                    </a>
                </li>
                <li className='footer__contact-item footer__contact-item--location'>
                    <a
                        href="https://maps.google.com/?q=C/ENRIC+NAVARRO,+28+BAJO.+BENIMACLET+-+VALENCIA"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        C/ENRIC NAVARRO, 28 BAJO. BENIMACLET - VALENCIA
                    </a>
                </li>
                <li className='footer__contact-item'>
                    <a href="tel:+34614218764">
                        +34 614 218 764
                    </a>
                </li>
            </ul>
        </div>
    </footer>
  )
}



