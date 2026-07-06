


import './cards.css'
import { Button } from '../buttons/Button';
import { NavLink } from 'react-router-dom';
import { MdOutlineNorthEast } from "react-icons/md";

import { useNavigate, useLocation } from 'react-router-dom';

export const ProductCard = ({ producto, modoSeleccion, seleccionado, onSeleccionar }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = () => {
        if (modoSeleccion) {
            onSeleccionar();
        } else {
            navigate(`/producto/${producto.id}`, {
                state: { background: location }
            });
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
        }
    };

    // Evitar renderizar si no hay imagen válida
    if (!producto.imagen || producto.imagen.trim() === '') {
        return null;
    }

    return (
        <article
            className={`card ${seleccionado ? 'card-seleccionada' : ''}`}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
            aria-label={producto.nombre}
        >
            <div className="card-img-container">
                <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="card-img"
                    onError={(e) => {
                        e.target.style.display = 'none';
                    }}
                />
            </div>

            <div className="card-info">
                <p className="card-name">{producto.nombre}</p>
                <p className="card-prize">{producto.precio} </p>
            </div>
        </article>
    );
};





export const CardPedido = ({ producto, onEliminar }) => {

    return (

        <div className=" card-pedido">

            <div className="imagen-info">
                <div className="card-img-container-resumen">
                    <img
                        src={producto.imagen}
                        alt={producto.nombre}
                        className="card-img-resumen"
                    />
                </div>

                <div className="card-info-resumen">
                    <p className="card-name">{producto.nombre}</p>
                    <p className="prize">{producto.precio}</p>
                </div>

            </div>
            <Button
                variant="noOutlined"
                onClick={() => onEliminar(producto.id)}
                className="btn-eliminar"
            >
                Eliminar
            </Button>

        </div>
    );
};





export const CardInicio = ({
    children,
    buttonText,
    to
}) => {

    return (
        <NavLink to={to} className="card-inicio card-clickable">
            <p className="card-text">{children}</p>

            <Button
                as="div"
                icon={<MdOutlineNorthEast />}
                iconPosition="right"
                variant="noOutlined"
                className='btn-icon-only'
            >
                {buttonText}
            </Button>
        </NavLink>
    );
};





export const CardViajes = ({
    icon,
    title,
    description,
    totalSteps,
    currentStep,
    isAnimating,
    onStepClick,
    onNextClick,
    cta
}) => {
    return (

        <div className={`card-viajes ${isAnimating ? 'animating' : ''}`}>


            <div className="viajes-icon">{icon}</div>

            <div className="viajes-texto">
                <h3 className="viajes-h1">{title}</h3>
                <p className="viajes-description">{description}</p>
                {cta && cta !== null && (
                    <div className="viajes-cta">
                        {cta}
                    </div>
                )}

            </div>



            <div className="viajes-footer">
                {/* Indicadores */}
                <div className="step-indicators">
                    {Array.from({ length: totalSteps }).map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            className={`step-dot ${index === currentStep ? 'active' : ''}`}
                            onClick={() => onStepClick(index)}
                            aria-label={`Ir al paso ${index + 1}`}
                            aria-current={index === currentStep ? 'true' : undefined}
                        />
                    ))}
                </div>

                {/* Botón "SIG." */}
                <Button variant='noOutlined' onClick={onNextClick}>
                    SIG.
                </Button>



            </div>
        </div>
    );
};





// CardBeneficios - similar a CardViajes para slider mobile
export const CardBeneficios = ({
    icon,
    title,
    description,
    totalSteps,
    currentStep,
    isAnimating,
    onStepClick,
    onNextClick
}) => {
    return (
        <div className={`card-viajes ${isAnimating ? 'animating' : ''}`}>
            <div className="viajes-icon">{icon}</div>
            <div className="viajes-texto">
                <h3 className="viajes-h1">{title}</h3>
                <p className="viajes-description">{description}</p>
            </div>
            <div className="viajes-footer">
                {/* Indicadores */}
                <div className="step-indicators">
                    {Array.from({ length: totalSteps }).map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            className={`step-dot ${index === currentStep ? 'active' : ''}`}
                            onClick={() => onStepClick(index)}
                            aria-label={`Ir al paso ${index + 1}`}
                            aria-current={index === currentStep ? 'true' : undefined}
                        />
                    ))}
                </div>
                {/* Botón "SIG." */}
                <Button variant='noOutlined' onClick={onNextClick}>
                    SIG.
                </Button>
            </div>
        </div>
    );
};

// ViajesGaleria Component (va en Cards.jsx)
export const ViajesGaleria = ({ nombre, src, onClick }) => {
    return (
        <div
            className="viajes-container"
            onClick={onClick}
        >
            <img src={src} alt={nombre} className="viajes-img" />
            <div className="viajes-info">
                <h2 className="viajes-titulo">{nombre}</h2>
            </div>
        </div>
    );
};




// card horario 

export const CardHorario = ({ nombre, hora, instructor, consultar }) => {
    return (
        <div className="card-horario">
            <div className="horario-info">
                <h4 className="clase">{nombre}</h4>
                <p className="hora">{hora}</p>
            </div>
            {consultar && (
                <div className="consultar-texto">
                    <p>(Consultar)</p>
                </div>
            )}
        </div>
    );
};































































