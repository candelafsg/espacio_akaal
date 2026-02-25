


import { Outlet, useLocation } from "react-router-dom"

import './css/index.css'

import { Header } from "./components/header/Header"
import ScrollToTop from "./components/scrollToTop/ScrollToTop";


function App() {

  const location = useLocation();
    const state = location.state;
    
    // Ocultar header en la página de detalle de producto
    const shouldShowHeader = !location.pathname.includes('/detalle-producto');

  return (
    <>

   {shouldShowHeader && <Header/>}
    
   <Outlet context={{ background: state?.background }} />    
   <ScrollToTop />
     
    </>
  )
}

export default App
