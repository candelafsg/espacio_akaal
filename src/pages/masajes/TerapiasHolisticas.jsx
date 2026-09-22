
import './terapias-holisticas.css'
import { useState } from 'react'
import {Masaje} from './components/Masaje'
import {Seguimiento} from './components/Seguimiento'
import { Acompanamiento } from './components/Acompanamiento'
import WhatsappLink from '../../components/whatsapp-link/WhatsappLink'
import { Footer } from '../../components/footer/Footer'

const TerapiasHolisticas = () => {

    const [openItems, setOpenItems] = useState(new Set())

    const toggleItem = (item) => {
        const esDesktop = window.matchMedia('(min-width: 821px)').matches

        setOpenItems((prev) => {
            const next = new Set(prev)
            if (next.has(item)) {
                next.delete(item)
            } else {
                if (!esDesktop) {
                    next.clear()
                }
                next.add(item)
            }
            return next
        })
    }

    return (

        <>
       
        <main className='main'>
        <h2>Terapias holísticas</h2>
        <p className="terapia-descripcion"><strong>La terapia holística</strong> es un enfoque de bienestar que trata a la persona como un todo integrado,<strong> conectando el cuerpo, la mente y las emociones </strong>en lugar de enfocarse únicamente en el síntoma aislado.</p>
        

        <ul className="terapia-galeria">

            <li className="terapia-item"><Masaje isOpen={openItems.has('masaje')} onToggle={() => toggleItem('masaje')} /></li>
            <li className="terapia-item"><Acompanamiento isOpen={openItems.has('acompanamiento')} onToggle={() => toggleItem('acompanamiento')} /></li>
            <li className="terapia-item"><Seguimiento isOpen={openItems.has('seguimiento')} onToggle={() => toggleItem('seguimiento')} /></li>

        </ul>


        <div className="cta">

            <div className="cta-contacto">
                <p className="">Si te interesa profundizar, contáctame</p>
                <div className="cta-btn">
                <WhatsappLink message='¡Hola! Me gustaría tener más información sobre las terapias holísticas'>MÁS INFORMACIÓN</WhatsappLink></div>
            </div>
            <img src="/img/conecta.png" alt="cta" className="conecta" />
        </div>
        </main>
        <Footer/>

        </>
       
     
    );
}
 
export default TerapiasHolisticas;