import './css/vioska.css'
import { ImgContainer } from '../../components/components/Components';
import { LiaToggleOffSolid, LiaToggleOnSolid } from "react-icons/lia";
import { ProductCard } from '../../components/cards/Cards';
import { AiOutlineDelete } from "react-icons/ai";
import { useState, useEffect, useRef } from 'react';
import { Button } from '../../components/buttons/Button';
import useFetchProductos from '../../hooks/useFetchProducts';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Sparkles,
    Pointer,
    PointerOff,
    ShoppingCart,
    HandHeart,
    MessageCircleMore,
    ChevronLeft,
    ChevronRight,
    X
} from "lucide-react";
import ResumenPedido from './ResumenPedido';
import { Footer } from "../../components/footer/Footer";


// 📝 Lista de pasos de instrucciones
const pasosInstrucciones = [
    {
        icono: <Pointer strokeWidth={1} />,
        texto: 'Pulsa el botón "Seleccionar" para poder elegir las joyas que te hayan llegado al alma.'

    },
    {
        icono: <PointerOff strokeWidth={1} />,

        texto: 'Desactiva"para volver a vista normal.'



    },
    {
        icono: <ShoppingCart strokeWidth={1} />,
        texto: ' Pulsando "Ver pedido", verás el resumen de tus productos seleccionados.'

    },
    {
        icono: <MessageCircleMore strokeWidth={1} />,
        texto: 'Escribe tu nombre para conocerte mejor y contáctanos directamente por WhatsApp para reservar tus joyas.'


    },
    {
        icono: <HandHeart strokeWidth={1} />,
        texto: 'Recuerda que todo es 100% artesanal , por lo que te llevarás una pieza única.'


    },
];

// 📸 Imágenes para la galería masonry
const masonryImages = [
    {
        id: 1,
        img: 'https://res.cloudinary.com/dhwd1b4be/image/upload/v1769613621/colgante-foto_3_r4i19m.jpg',
        height: 300,
    },
    {
        id: 2,
        img: 'https://res.cloudinary.com/dhwd1b4be/image/upload/v1769613543/DSC00197_1_ggpsxe.jpg',
        height: 400,
    },
    {
        id: 3,
        img: 'https://res.cloudinary.com/dhwd1b4be/image/upload/v1769501553/IMG_2224_1_gvdsoy.png',
        height: 350,
    },
    {
        id: 4,
        img: 'https://res.cloudinary.com/dhwd1b4be/image/upload/v1769501547/Frame_2_mdpq44.png',
        height: 450,
    },
    {
        id: 5,
        img: 'https://res.cloudinary.com/dhwd1b4be/image/upload/v1769501608/Frame_6_m6rcop.png',
        height: 380,
    },
    {
        id: 6,
        img: 'https://res.cloudinary.com/dhwd1b4be/image/upload/v1769501475/Frame_4_sigg5c.png',
        height: 320,
    },

    {
        id: 7,
        img: '/img/colgante-mb.png',
        height: 360,
    }
];





const UnaVioska = () => {
    const [modoSeleccion, setModoSeleccion] = useState(false);
    const [seleccionados, setSeleccionados] = useState([]);
    const [menu, setMenu] = useState(false);
    const [filtroActivo, setFiltroActivo] = useState("todo");
    const [tipoActivo, setTipoActivo] = useState("todo");
    const [imagenActual, setImagenActual] = useState(0);

    // Combinar estados de scroll para reducir hooks
    const [scrollState, setScrollState] = useState({
        position: {
            pendientes: 0,
            colgantes: 0,
            anillos: 0
        },
        canScrollPrev: {
            pendientes: false,
            colgantes: false,
            anillos: false
        }
    });

    const [menuResumenAbierto, setMenuResumenAbierto] = useState(false);

    const menuRef = useRef(null);
    const pendientesRef = useRef(null);
    const colgantesRef = useRef(null);
    const anillosRef = useRef(null);

    const productos = useFetchProductos();
    const navigate = useNavigate();

    const toggleSeleccion = () => {
        setModoSeleccion(prev => {
            if (prev) setSeleccionados([]);
            return !prev;
        });
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenu(false);
            }
        };

        if (menu) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menu]);

    useEffect(() => {
        const seleccionGuardada = JSON.parse(localStorage.getItem("seleccionados")) || [];
        setSeleccionados(seleccionGuardada);

        if (seleccionGuardada.length > 0) {
            setModoSeleccion(true); // 💡 Activa el modo selección si hay algo guardado
        }
    }, []);


    const handleSeleccion = (id) => {
        let nuevaSeleccion;
        if (seleccionados.includes(id)) {
            nuevaSeleccion = seleccionados.filter(item => item !== id);
        } else {
            nuevaSeleccion = [...seleccionados, id];
        }
        setSeleccionados(nuevaSeleccion);
        localStorage.setItem("seleccionados", JSON.stringify(nuevaSeleccion));
    };





    const borrarSeleccion = () => {
        setSeleccionados([]);
        localStorage.removeItem("seleccionados");
    };



    const handleMenu = () => setMenu(!menu);

    // Funciones para el slider de imágenes
    const imagenSiguiente = () => {
        setImagenActual((prev) => (prev + 1) % masonryImages.length);
    };

    const imagenAnterior = () => {
        setImagenActual((prev) => (prev - 1 + masonryImages.length) % masonryImages.length);
    };

    const irAImagen = (index) => {
        setImagenActual(index);
    };





    const handleFiltro = (filtro) => {
        setFiltroActivo(filtro);
        setMenu(false);
    };

    const handleTipo = (tipo) => {
        setTipoActivo(tipo);
        setMenu(false);
    };

    const scrollGallery = (tipo, direction) => {
        const refs = {
            pendientes: pendientesRef,
            colgantes: colgantesRef,
            anillos: anillosRef
        };

        const ref = refs[tipo];
        if (ref.current) {
            const cardWidth = 200; // Ancho aproximado de cada tarjeta
            const gap = 16; // Gap entre tarjetas
            const scrollAmount = (cardWidth + gap) * 2; // Mover 2 tarjetas

            if (direction === 'next') {
                ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                // Activar el botón ANT después de hacer scroll
                setScrollState(prev => ({
                    ...prev,
                    canScrollPrev: {
                        ...prev.canScrollPrev,
                        [tipo]: true
                    }
                }));
            } else {
                ref.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                // Desactivar ANT si vuelve al inicio
                setTimeout(() => {
                    if (ref.current.scrollLeft <= scrollAmount) {
                        setScrollState(prev => ({
                            ...prev,
                            canScrollPrev: {
                                ...prev.canScrollPrev,
                                [tipo]: false
                            }
                        }));
                    }
                }, 300);
            }
        }
    };

    const canScrollNext = (tipo) => {
        const productosTipo = productos.filter(producto => producto.tipo === tipo);
        const refs = {
            pendientes: pendientesRef,
            colgantes: colgantesRef,
            anillos: anillosRef
        };

        const ref = refs[tipo];
        if (ref.current && productosTipo.length > 4) {
            return ref.current.scrollLeft < (productosTipo.length - 4) * 216;
        }
        return false;
    };

    const canScrollPrev = (tipo) => {
        return scrollState.canScrollPrev[tipo];
    };





    const productosFiltrados = productos.filter(producto =>
        (filtroActivo === "todo" || producto.filtro === filtroActivo) &&
        (tipoActivo === "todo" || producto.tipo === tipoActivo)
    );


    const irAResumen = () => {
        const productosSeleccionados = productos.filter(producto =>
            seleccionados.includes(producto.id)
        );

        // Verificar si es desktop (≥768px)
        if (window.innerWidth >= 768) {
            // En desktop abrir menú lateral directamente
            setMenuResumenAbierto(true);
        } else {
            // En mobile navegar a página separada
            navigate('/resumen-producto', {
                state: {
                    productos: productosSeleccionados,
                    esMenuLateral: false // Indicador para que sepa que es página normal
                }
            });
        }
    };

    useEffect(() => {
        if (window.location.hash === '#galeria') {
            const section = document.querySelector('.vioska-galeria');
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, []);

    return (
        <>

            <main className={`vioska-page ${menuResumenAbierto ? 'dimmed' : ''}`}>

                <section className='vioska-inicio'>
                    <img src="https://res.cloudinary.com/dhwd1b4be/image/upload/v1769501553/IMG_2224_1_gvdsoy.png" alt="colgante" className="vioska-portada" />
                    <div className="vioska-info">
                        <h1 className="vioska-titulo">una vioska.</h1>
                        <p className="vioska-subtitulo">Artesanía hecha con propósito.</p>
                    </div>
                </section>

                {/* Versión Mobile */}
                <section className="vioska-instrucciones mobile-only">
                    <div className="artesania">
                        <Sparkles strokeWidth={0.7} />
                        <h3 className="instrucciones-texto">Cada pieza está hecha a mano, con mucho mimo y dedicación.</h3>
                        <Sparkles strokeWidth={0.7} />
                    </div>

                    <h4 className="instrucciones-texto">Pero antes de empezar...</h4>

                    <ul className="instrucciones-ul">
                        {pasosInstrucciones.map((item, index) => (
                            <li key={`instruccion-${index}`} className="instrucciones-li">
                                {item.icono}
                                <p className="instrucciones-p">{item.texto}</p>
                            </li>
                        ))}
                    </ul>

                    <div className="button">
                        <Button as="a" href="#galeria">
                            Ver galería
                        </Button></div>

                </section>

                <section id='galeria' className="vioska-galeria mobile-only">
                    <h2 className="galeria-titulo">Galería de productos</h2>

                    <div className="galeria-header-sticky">
                        <div className="modo-seleccion-container">
                            <div className="seleccion-multiple-container">
                                <p className="seleccion-titulo">
                                    {modoSeleccion
                                        ? 'Estás en modo selección. Pulsa para volver a vista normal.'
                                        : 'Estás en vista normal. ¿Quieres seleccionar varias piezas a la vez?'}
                                </p>
                                <Button onClick={toggleSeleccion}>
                                    {modoSeleccion ? 'VISTA' : 'SELECCIÓN'}
                                </Button>
                            </div>
                        </div>

                        <div className="filtros" ref={menuRef}>
                            <p onClick={handleMenu} className="filtros-texto">
                                FILTRAR{(filtroActivo !== "todo" || tipoActivo !== "todo") && ` · ${filtroActivo !== "todo" ? filtroActivo : ""}${(filtroActivo !== "todo" && tipoActivo !== "todo") ? " / " : ""}${tipoActivo !== "todo" ? tipoActivo : ""}`}
                            </p>

                            {menu && (
                                <ul className="filtro-ul">
                                    <li className="filtro-li" onClick={() => handleTipo("todo")}>TODO</li>
                                    <li className="filtro-li" onClick={() => handleTipo("pendientes")}>PENDIENTES</li>
                                    <li className="filtro-li" onClick={() => handleTipo("colgantes")}>COLGANTES</li>
                                    <li className="filtro-li" onClick={() => handleTipo("anillos")}>ANILLOS</li>
                                    <li className="filtro-li" onClick={() => handleTipo("macrame")}>MACRAMÉ</li>
                                    {/* <li className="filtro-li" onClick={() => handleFiltro("macrame")}>MACRAMÉ</li>
                                <li className="filtro-li" onClick={() => handleFiltro("plata")}>PLATA</li> */}
                                </ul>
                            )}
                        </div>


                        {seleccionados.length > 0 && (
                            <div className="pedido-header">
                                <Button variant='noOutlined' onClick={irAResumen}>VER PEDIDO ({seleccionados.length})</Button>
                                <AiOutlineDelete onClick={borrarSeleccion} />
                            </div>
                        )}
                    </div>


                    <div className="productos">
                        {productosFiltrados.map(producto => (
                            <ProductCard
                                key={`mobile-${producto.id}`}
                                producto={producto}
                                modoSeleccion={modoSeleccion}
                                seleccionado={seleccionados.includes(producto.id)}
                                onSeleccionar={() => handleSeleccion(producto.id)}
                            />
                        ))}
                    </div>

                    {seleccionados.length > 0 && (
                        <div className="pedido-footer">
                            <Button onClick={irAResumen}>IR A PEDIDO ({seleccionados.length})</Button>

                        </div>
                    )}


                </section>











                {seleccionados.length > 0 && (
                    <footer className="pedido-footer-desktop">
                        <Button onClick={irAResumen}>VER PEDIDO ({seleccionados.length})</Button>
                    </footer>
                )}

                {/* Galería Slider Minimalista - Ahora al final */}
                <section className="vioska-slider-section">
                    <h2 className="slider-titulo">Creación consciente</h2>
                    <p className="slider-subtitulo">Un viaje a través de nuestras creaciones y momentos</p>

                    <div className="slider-container-galery">
                        <div className="slider-imagen">
                            <img
                                src={masonryImages[imagenActual].img}
                                alt={`Imagen ${imagenActual + 1}`}
                                className="slider-img-galery"
                            />
                        </div>

                        <button
                            className="slider-btn slider-btn-prev"
                            onClick={imagenAnterior}
                            aria-label="Imagen anterior"
                        >
                            <ChevronLeft size={32} />
                        </button>

                        <button
                            className="slider-btn slider-btn-next"
                            onClick={imagenSiguiente}
                            aria-label="Siguiente imagen"
                        >
                            <ChevronRight size={32} />
                        </button>
                    </div>

                    <div className="slider-dots">
                        {masonryImages.map((_, index) => (
                            <button
                                key={`slider-dot-${index}`}
                                className={`slider-dot ${index === imagenActual ? 'slider-dot-active' : ''}`}
                                onClick={() => irAImagen(index)}
                                aria-label={`Ir a imagen ${index + 1}`}
                            />
                        ))}
                    </div>
                </section>

                {menuResumenAbierto && (
                    <div
                        className={`overlay ${menuResumenAbierto ? 'active' : ''}`}
                        onClick={() => setMenuResumenAbierto(false)}
                    />
                )}

                {/* Menú lateral para desktop */}
                <AnimatePresence>
                    {menuResumenAbierto && (
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="menu-resumen-lateral desktop-only"
                        >
                            <div className="menu-resumen-header">
                                <h3>Resumen del Pedido</h3>
                                <button
                                    className="btn-cerrar-menu"
                                    onClick={() => setMenuResumenAbierto(false)}
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="menu-resumen-content">
                                {/* Aquí irá el contenido del resumen */}
                                <div style={{ padding: '1rem' }}>
                                    <h3>Resumen del Pedido</h3>
                                    <p>Productos seleccionados: {seleccionados.length}</p>
                                    <Button onClick={() => setMenuResumenAbierto(false)}>Cerrar</Button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>




            {/* version desk */}
            <main className="desk">
                <section className="desktop">






                    <img src="https://res.cloudinary.com/dhwd1b4be/image/upload/v1769501553/IMG_2224_1_gvdsoy.png" alt="portada" className="desktop-image" />

                    <div className="title-container">




                        <div className="contenedor">
                            <h1 className="title-intr">una vioska.</h1>


                            <div className="subtitulo-imgs">

                                <div className="subtitulo">
                                    <h2 className="h2-titulo">Creación consciente</h2>
                                    <p className="p">Joyas artesanales hechas a mano, pieza por pieza, con dedicación y cuidado en cada detalle. <br /> Trabajo de manera consciente, eligiendo los materiales y procesos,  poniendo cariño y alma en cada creación, para que cada joya no solo adorne, sino que también cuente una historia.</p>
                                </div>


                                <div className="imgs-cont">

                                    <div className="imgs">
                                        <div className="fila">

                                            <div className="cont">
                                                <img src="https://res.cloudinary.com/dhwd1b4be/image/upload/v1770793446/Frame_30_vi0u0x.png" alt="portada" className='cont-img' />

                                                <div className="cont-title">
                                                    MACRAMÉ
                                                </div>
                                            </div>
                                            <div className="cont ">

                                                <img src="https://res.cloudinary.com/dhwd1b4be/image/upload/v1770293173/ChatGPT_Image_5_feb_2026_13_06_06_aikals.png" alt="portada" className='cont-img' />

                                                <div className="cont-title">
                                                    COLGANTES
                                                </div>

                                            </div>



                                        </div>


                                        <div className="fila">

                                           


                                            <div className="cont">
                                                <img src="https://res.cloudinary.com/dhwd1b4be/image/upload/v1770799131/Frame_38_2_zavngq.png" alt="portada" className='cont-img' />
                                                <div className="cont-title">
                                                    ANILLOS
                                                </div>
                                            </div>

                                             <div className="cont"> <img src="https://res.cloudinary.com/dhwd1b4be/image/upload/v1770295069/ChatGPT_Image_5_feb_2026_13_37_29_epl8ge.png" alt="portada" className='cont-img' />
                                                <div className="cont-title">
                                                    PENDIENTES
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <div className=" cont-btn">

                                        <Button 
                                        className='boton-vioska'
                                            variant='noOutlined' 
                                            style={{ color: "var(--background)", display: "flex", alignItems: 'center', width: '100%', justifyContent: 'end', fontSize: "0.7rem", gap: '0.5rem',  }} 
                                            iconPosition='right' 
                                            icon={<ChevronRight size={14} style={{marginTop:'0.2rem'}} />}
                                            onClick={() => {
                                                const section = document.querySelector('.desktop-productos');
                                                if (section) {
                                                    section.scrollIntoView({ behavior: 'smooth' });
                                                }
                                            }}
                                        >
                                            VER TODO
                                        </Button>

                                    </div>
                                </div>


                            </div>




                        </div>



                    </div>






                </section>


                <section className="desktop-productos" id='gallery'>

                    <h1 className="titulo-galeria">Galería <br/> de productos</h1>
                    <p className="subtitulo-galeria">Explora cada pieza con calma. <br/> Activa el modo selección para marcar tus favoritas y crear tu propia colección. <br/> Desactívalo cuando quieras volver a mirar sin compromiso</p>

                    <div className="galeria-contenedor">
                           <div className="filtros-header">
                                <ul className="filtro-ul-galeria">
                                    <li className={`filtro-li ${tipoActivo === "todo" ? "activo" : ""}`} onClick={() => handleTipo("todo")}>TODO</li>
                                    <li className={`filtro-li ${tipoActivo === "macrame" ? "activo" : ""}`} onClick={() => handleTipo("macrame")}>MACRAMÉ</li>
                                    <li className={`filtro-li ${tipoActivo === "colgantes" ? "activo" : ""}`} onClick={() => handleTipo("colgantes")}>COLGANTES</li>
                                    <li className={`filtro-li ${tipoActivo === "anillos" ? "activo" : ""}`} onClick={() => handleTipo("anillos")}>ANILLOS</li>
                                    <li className={`filtro-li ${tipoActivo === "pendientes" ? "activo" : ""}`} onClick={() => handleTipo("pendientes")}>PENDIENTES</li>
                                    {/* <li className="filtro-li" onClick={() => handleFiltro("macrame")}>MACRAMÉ</li>
                                <li className="filtro-li" onClick={() => handleFiltro("plata")}>PLATA</li> */}
                                </ul>
                                <Button onClick={toggleSeleccion}>
                                    {modoSeleccion ? 'VISTA' : 'SELECCIÓN'}
                                </Button>
                           </div>
                           {seleccionados.length > 0 && (
                                <div className="pedido-header-desktop">
                                    <Button variant='noOutlined' onClick={irAResumen}>VER PEDIDO ({seleccionados.length})</Button>
                                    <AiOutlineDelete onClick={borrarSeleccion} />
                                </div>
                            )}


                                <div className="galeria">

                                    {/* Fila MACRAMÉ */}
                                    {tipoActivo === "todo" || tipoActivo === "macrame" ? (
                                        <div className="producto-titulo">
                                            <div className="producto-titulo">
                                                <h2>MACRAMÉ</h2>
                                            </div>
                                            <div className="galeria-scroll-container">
                                                <div className="galeria-scroll-desk">
                                                    <div className="productos-scroll">
                                                        {productos
                                                            .filter(producto => producto.tipo === 'macrame')
                                                            .map(producto => (
                                                                <ProductCard
                                                                    key={`desktop-macrame-${producto.id}`}
                                                                    producto={producto}
                                                                    modoSeleccion={modoSeleccion}
                                                                    seleccionado={seleccionados.includes(producto.id)}
                                                                    onSeleccionar={() => handleSeleccion(producto.id)}
                                                                />
                                                            ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : null}

                                    {/* Fila COLGANTES */}
                                    {tipoActivo === "todo" || tipoActivo === "colgantes" ? (
                                        <div className="producto-titulo">
                                            <div className="producto-titulo">
                                                <h2>COLGANTES</h2>
                                            </div>
                                            <div className="galeria-scroll-container">
                                                {canScrollPrev('colgantes') && (
                                                    <button className="nav-btn" onClick={() => scrollGallery('colgantes', 'prev')}>
                                                        <ChevronLeft size={20} />
                                                    </button>
                                                )}
                                                <div className="galeria-scroll-desk">
                                                    <div className="productos-scroll" ref={colgantesRef}>
                                                        {productos
                                                            .filter(producto => producto.tipo === 'colgantes')
                                                            .map(producto => (
                                                                <ProductCard
                                                                    key={`desktop-colgantes-${producto.id}`}
                                                                    producto={producto}
                                                                    modoSeleccion={modoSeleccion}
                                                                    seleccionado={seleccionados.includes(producto.id)}
                                                                    onSeleccionar={() => handleSeleccion(producto.id)}
                                                                />
                                                            ))}
                                                    </div>
                                                </div>
                                                {canScrollNext('colgantes') && (
                                                    <button className="nav-btn" onClick={() => scrollGallery('colgantes', 'next')}>
                                                        <ChevronRight size={20} />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ) : null}

                                    {/* Fila ANILLOS */}
                                    {tipoActivo === "todo" || tipoActivo === "anillos" ? (
                                        <div className="producto-titulo">
                                            <div className="producto-titulo">
                                                <h2>ANILLOS</h2>
                                            </div>
                                            <div className="galeria-scroll-container">
                                                {canScrollPrev('anillos') && (
                                                    <button className="nav-btn" onClick={() => scrollGallery('anillos', 'prev')}>
                                                        <ChevronLeft size={20} />
                                                    </button>
                                                )}
                                                <div className="galeria-scroll-desk">
                                                    <div className="productos-scroll" ref={anillosRef}>
                                                        {productos
                                                            .filter(producto => producto.tipo === 'anillos')
                                                            .map(producto => (
                                                                <ProductCard
                                                                    key={`desktop-anillos-${producto.id}`}
                                                                    producto={producto}
                                                                    modoSeleccion={modoSeleccion}
                                                                    seleccionado={seleccionados.includes(producto.id)}
                                                                    onSeleccionar={() => handleSeleccion(producto.id)}
                                                                />
                                                            ))}
                                                    </div>
                                                </div>
                                                {canScrollNext('anillos') && (
                                                    <button className="nav-btn" onClick={() => scrollGallery('anillos', 'next')}>
                                                        <ChevronRight size={20} />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ) : null}

                                    {/* Fila PENDIENTES */}
                                    {tipoActivo === "todo" || tipoActivo === "pendientes" ? (
                                        <div className="producto-titulo">
                                            <div className="producto-titulo">
                                                <h2>PENDIENTES</h2>
                                            </div>
                                            <div className="galeria-scroll-container">
                                                {canScrollPrev('pendientes') && (
                                                    <button className="nav-btn" onClick={() => scrollGallery('pendientes', 'prev')}>
                                                        <ChevronLeft size={20} />
                                                    </button>
                                                )}
                                                <div className="galeria-scroll-desk">
                                                    <div className="productos-scroll" ref={pendientesRef}>
                                                        {productos
                                                            .filter(producto => producto.tipo === 'pendientes')
                                                            .map(producto => (
                                                                <ProductCard
                                                                    key={`desktop-pendientes-${producto.id}`}
                                                                    producto={producto}
                                                                    modoSeleccion={modoSeleccion}
                                                                    seleccionado={seleccionados.includes(producto.id)}
                                                                    onSeleccionar={() => handleSeleccion(producto.id)}
                                                                />
                                                            ))}
                                                    </div>
                                                </div>
                                                {canScrollNext('pendientes') && (
                                                    <button className="nav-btn" onClick={() => scrollGallery('pendientes', 'next')}>
                                                        <ChevronRight size={20} />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ) : null}

                                </div>
                        
                    </div>


                  

                </section>
                
                {/* Footer - solo visible en desktop */}
                <Footer />
            </main>
        </>
    );
};

export default UnaVioska;
