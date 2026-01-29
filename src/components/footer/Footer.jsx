
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
                <li><NavLink to="/sobre-mi">Sobre mí</NavLink></li>
                 <li><NavLink to="/contacto">Contacto</NavLink></li>
                
               
            </ul>
        </div>

        <ul className="footer-ul">
             <li><NavLink to="/espacio-akaal">Espacio AKAAL</NavLink></li>
              <li><NavLink to="/akaal-viajes">Viajes AKAAL</NavLink></li>
            <li><NavLink to="/servicios">una vioska.</NavLink></li>
           
            <li><NavLink to="/gong">Baños de gong</NavLink></li>
            <li><NavLink to="/retiros">Retiros</NavLink></li>
           
        </ul>

        <div className="footer-contacto">
            <ul className="footer-contacto-ul">
                <li>Instagram</li>
                <li>Facebook</li>
                <li>Twitter</li>
            </ul>
        </div>
    </footer>
  )
}



