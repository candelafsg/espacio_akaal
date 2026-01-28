import './header.css'
import { useState, useEffect, useRef } from 'react';
import { IoLogoInstagram } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router";
import { X } from "lucide-react";

export const Header = () => {

    const [menu, setMenu] = useState(false);
    const [openDeskMenu, setOpenDeskMenu] = useState(false);
    const [openMobileServices, setOpenMobileServices] = useState(false);
    const deskMenuRef = useRef(null);
    const mobileMenuRef = useRef(null);

    const handleOpenMenu = () => {
        setMenu(!menu);
    };

    const handleOpenDesk = () => {
        setOpenDeskMenu(!openDeskMenu);
    };

    const handleOpenMobileServices = () => {
        setOpenMobileServices(!openMobileServices);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (openDeskMenu && deskMenuRef.current && !deskMenuRef.current.contains(e.target)) {
                setOpenDeskMenu(false);
            }
            if (menu && mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
                setMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [openDeskMenu, menu]);

    return (
        <>
            <header className="header-mobile">

                {/* NAV MOBILE */}
                <nav className="header-mobile-nav">
                    <NavLink to="/">
                        <img src="/img/logo.png" alt="logo" className="header-logo" />
                    </NavLink>
                    <span className="header-menu" onClick={handleOpenMenu}>MENÚ</span>
                </nav>


                {/* --- MENÚ MOBILE --- */}
                <AnimatePresence>
                    {menu && (
                        <>
                            <motion.div
                                className="blur-overlay"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                onClick={handleOpenMenu}
                            />

                            <motion.div
                                className="menu"
                                initial={{ x: '100%', opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: '100%', opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                ref={mobileMenuRef}
                            >
                                <div className="menu-cerrar" onClick={() => setMenu(false)}>CERRAR</div>

                                <ul className="menu-ul">

                                    <motion.li 
                                        className="menu-li" 
                                        onClick={() => setMenu(false)}
                                        whileHover={{ x: 5 }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <NavLink to="/">INICIO</NavLink>
                                    </motion.li>

                                    <motion.li 
                                        className="menu-li" 
                                        onClick={handleOpenMobileServices}
                                        whileHover={{ x: 5 }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        SERVICIOS +
                                    </motion.li>

                                    <AnimatePresence>
                                        {openMobileServices && (
                                            <motion.div
                                                className="mobile-services-submenu"
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                            >
                                                <motion.li 
                                                    className="menu-li submenu-item" 
                                                    onClick={() => { setMenu(false); setOpenMobileServices(false); }}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: 0.3, delay: 0.05 }}
                                                    whileHover={{ x: 5 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <NavLink to="/espacio-akaal">ESPACIO AKAAL</NavLink>
                                                </motion.li>

                                                <motion.li 
                                                    className="menu-li submenu-item" 
                                                    onClick={() => { setMenu(false); setOpenMobileServices(false); }}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: 0.3, delay: 0.1 }}
                                                    whileHover={{ x: 5 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <NavLink to="/una-vioska">UNA VIOSKA</NavLink>
                                                </motion.li>

                                                <motion.li 
                                                    className="menu-li submenu-item" 
                                                    onClick={() => { setMenu(false); setOpenMobileServices(false); }}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: 0.3, delay: 0.15 }}
                                                    whileHover={{ x: 5 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <NavLink to="/akaal-viajes">AKAAL VIAJES</NavLink>
                                                </motion.li>

                                                <motion.li 
                                                    className="menu-li submenu-item" 
                                                    onClick={() => { setMenu(false); setOpenMobileServices(false); }}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: 0.3, delay: 0.2 }}
                                                    whileHover={{ x: 5 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <NavLink to="/akaal-retiros">AKAAL RETIROS</NavLink>
                                                </motion.li>

                                                <motion.li 
                                                    className="menu-li submenu-item" 
                                                    onClick={() => { setMenu(false); setOpenMobileServices(false); }}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: 0.3, delay: 0.2 }}
                                                    whileHover={{ x: 5 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    {/* <NavLink to="/gong">BAÑOS DE GONG</NavLink> */}
                                                </motion.li>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <motion.li 
                                        className="menu-li" 
                                        onClick={() => setMenu(false)}
                                        whileHover={{ x: 5 }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <NavLink to="/about">ACERCA DE</NavLink>
                                    </motion.li>

                                    <motion.li 
                                        className="menu-li" 
                                        onClick={() => setMenu(false)}
                                        whileHover={{ x: 5 }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <NavLink to="/contacto">CONTACTO</NavLink>
                                    </motion.li>


                                </ul>

                                <div className="menu-rrss">
                                    <NavLink to="/privacidad" className="menu-privacy"  onClick={() => setMenu(false)}>
                                        POLÍTICA <br /> DE PRIVACIDAD
                                    </NavLink>

                                    <a className='icon' href="https://www.instagram.com/espacio.akaal/" target="_blank" style={{color:'var(--background)'}}  onClick={() => setMenu(false)}>
                                        <IoLogoInstagram />
                                    </a>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>




                {/* --- NAV DESKTOP --- */}
                <nav className="header-nav-desk">

                    <NavLink to="/" className="logo">INICIO</NavLink>

                    <button className="menu-desktop-toggle" onClick={handleOpenDesk}>
                        MENÚ
                    </button>

                    {/* MENÚ DESKTOP COMPLETO */}
                    <AnimatePresence>
                        {openDeskMenu && (
                            <>
                                <motion.div
                                    className="desktop-menu-overlay"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    onClick={handleOpenDesk}
                                />
                                
                                <motion.div
                                    className="desktop-menu-full"
                                    initial={{ clipPath: 'inset(0 0 100% 0)' }}
                                    animate={{ clipPath: 'inset(0 0 0 0)' }}
                                    exit={{ clipPath: 'inset(0 0 100% 0)' }}
                                    transition={{ duration: 0.6, ease: "easeInOut" }}
                                    ref={deskMenuRef}
                                >
                                    <button className="desktop-menu-close" onClick={handleOpenDesk}>
                                        <X size={24} />
                                        CERRAR
                                    </button>

                                    <div className="desktop-menu-content">
                                        <ul className="desktop-menu-nav">
                                            <motion.li 
                                                onClick={() => setOpenDeskMenu(false)}
                                                whileHover={{ x: 5 }}
                                                whileTap={{ scale: 0.95 }}
                                                initial={{ opacity: 0, y: 30 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5, delay: 0.1 }}
                                            >
                                                <NavLink to="/">INICIO</NavLink>
                                            </motion.li>

                                            <motion.li 
                                                onClick={handleOpenDesk}
                                                whileHover={{ x: 5 }}
                                                whileTap={{ scale: 0.95 }}
                                                initial={{ opacity: 0, y: 30 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5, delay: 0.2 }}
                                                style={{ position: 'relative' }}
                                            >
                                                SERVICIOS

                                                <AnimatePresence>
                                                    {openDeskMenu && (
                                                        <motion.div
                                                            className="desktop-services-submenu"
                                                            initial={{ opacity: 0, height: 0 }}
                                                            animate={{ opacity: 1, height: 'auto' }}
                                                            exit={{ opacity: 0, height: 0 }}
                                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                                        >
                                                            <motion.div 
                                                                onClick={() => setOpenDeskMenu(false)}
                                                                initial={{ opacity: 0, y: 20 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                transition={{ duration: 0.3, delay: 0.1 }}
                                                                className="service-item"
                                                            >
                                                                <NavLink to="/espacio-akaal">ESPACIO AKAAL</NavLink>
                                                            </motion.div>

                                                            <motion.div 
                                                                onClick={() => setOpenDeskMenu(false)}
                                                                initial={{ opacity: 0, y: 20 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                transition={{ duration: 0.3, delay: 0.15 }}
                                                                className="service-item"
                                                            >
                                                                <NavLink to="/una-vioska">UNA VIOSKA</NavLink>
                                                            </motion.div>

                                                            <motion.div 
                                                                onClick={() => setOpenDeskMenu(false)}
                                                                initial={{ opacity: 0, y: 20 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                transition={{ duration: 0.3, delay: 0.2 }}
                                                                className="service-item"
                                                            >
                                                                <NavLink to="/akaal-viajes">AKAAL VIAJES</NavLink>
                                                            </motion.div>

                                                            <motion.div 
                                                                onClick={() => setOpenDeskMenu(false)}
                                                                initial={{ opacity: 0, y: 20 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                transition={{ duration: 0.3, delay: 0.25 }}
                                                                className="service-item"
                                                            >
                                                                <NavLink to="/akaal-retiros">AKAAL RETIROS</NavLink>
                                                            </motion.div>

                                                            <motion.div 
                                                                onClick={() => setOpenDeskMenu(false)}
                                                                initial={{ opacity: 0, y: 20 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                transition={{ duration: 0.3, delay: 0.3 }}
                                                                className="service-item"
                                                            >
                                                                {/* <NavLink to="/gong">BAÑOS DE GONG</NavLink> */}
                                                            </motion.div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </motion.li>

                                            <motion.li 
                                                onClick={() => setOpenDeskMenu(false)}
                                                whileHover={{ x: 5 }}
                                                whileTap={{ scale: 0.95 }}
                                                initial={{ opacity: 0, y: 30 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5, delay: 0.3 }}
                                            >
                                                <NavLink to="/about">SOBRE MÍ</NavLink>
                                            </motion.li>

                                            <motion.li 
                                                onClick={() => setOpenDeskMenu(false)}
                                                whileHover={{ x: 5 }}
                                                whileTap={{ scale: 0.95 }}
                                                initial={{ opacity: 0, y: 30 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5, delay: 0.4 }}
                                            >
                                                <NavLink to="/contacto">CONTACTO</NavLink>
                                            </motion.li>
                                        </ul>

                                        <div className="desktop-menu-rrss">
                                            <NavLink to="/privacidad" className="desktop-menu-privacy" onClick={() => setOpenDeskMenu(false)}>
                                                POLÍTICA <br /> DE PRIVACIDAD
                                            </NavLink>

                                            <a className='desktop-menu-icon' href="https://www.instagram.com/espacio.akaal/" target="_blank" onClick={() => setOpenDeskMenu(false)}>
                                                <IoLogoInstagram />
                                            </a>
                                        </div>
                                    </div>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </nav>

            </header>
        </>
    );
};