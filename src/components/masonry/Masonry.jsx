import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import './masonry.css';

const useMedia = (queries, values, defaultValue) => {
  const get = () => values[queries.findIndex(q => matchMedia(q).matches)] ?? defaultValue;
  const [value, setValue] = useState(get);

  useEffect(() => {
    const handler = () => setValue(get);
    queries.forEach(q => matchMedia(q).addEventListener('change', handler));
    return () => queries.forEach(q => matchMedia(q).removeEventListener('change', handler));
  }, [queries]);

  return value;
};

const useMeasure = () => {
  const ref = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size];
};

const preloadImages = async urls => {
  await Promise.all(
    urls.map(
      src =>
        new Promise(resolve => {
          const img = new Image();
          img.src = src;
          img.onload = img.onerror = () => resolve();
        })
    )
  );
};

const Masonry = ({
  items,
  ease = 'power3.out',
  duration = 0.6,
  stagger = 0.05,
  animateFrom = 'bottom',
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false
}) => {
  const columns = useMedia(
    ['(min-width:1500px)', '(min-width:1000px)', '(min-width:600px)', '(min-width:400px)'],
    [5, 4, 3, 2],
    2
  );

  const [containerRef, { width }] = useMeasure();
  const [imagesReady, setImagesReady] = useState(false);
  const [sliderOpen, setSliderOpen] = useState(false);
  const [sliderIndex, setSliderIndex] = useState(0);
  const sliderRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const getInitialPosition = item => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return { x: item.x, y: item.y };

    let direction = animateFrom;

    if (animateFrom === 'random') {
      const directions = ['top', 'bottom', 'left', 'right'];
      direction = directions[Math.floor(Math.random() * directions.length)];
    }

    switch (direction) {
      case 'top':
        return { x: item.x, y: -200 };
      case 'bottom':
        return { x: item.x, y: window.innerHeight + 200 };
      case 'left':
        return { x: -200, y: item.y };
      case 'right':
        return { x: window.innerWidth + 200, y: item.y };
      case 'center':
        return {
          x: containerRect.width / 2 - item.w / 2,
          y: containerRect.height / 2 - item.h / 2
        };
      default:
        return { x: item.x, y: item.y + 100 };
    }
  };

  useEffect(() => {
    preloadImages(items.map(i => i.img)).then(() => setImagesReady(true));
  }, [items]);

  const grid = useMemo(() => {
    if (!width) return [];

    const colHeights = new Array(columns).fill(0);
    const columnWidth = width / columns;

    return items.map(child => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = columnWidth * col;
      const height = child.height / 2;
      const y = colHeights[col];

      colHeights[col] += height;

      return { ...child, x, y, w: columnWidth, h: height };
    });
  }, [columns, items, width]);

  const hasMounted = useRef(false);

  useLayoutEffect(() => {
    if (!imagesReady) return;

    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`;
      const animationProps = {
        x: item.x,
        y: item.y,
        width: item.w,
        height: item.h
      };

      if (!hasMounted.current) {
        const initialPos = getInitialPosition(item, index);
        const initialState = {
          opacity: 0,
          x: initialPos.x,
          y: initialPos.y,
          width: item.w,
          height: item.h,
          ...(blurToFocus && { filter: 'blur(10px)' })
        };

        gsap.fromTo(selector, initialState, {
          opacity: 1,
          ...animationProps,
          ...(blurToFocus && { filter: 'blur(0px)' }),
          duration: 0.8,
          ease: 'power3.out',
          delay: index * stagger
        });
      } else {
        gsap.to(selector, {
          ...animationProps,
          duration: duration,
          ease: ease,
          overwrite: 'auto'
        });
      }
    });

    hasMounted.current = true;
  }, [grid, imagesReady, stagger, animateFrom, blurToFocus, duration, ease]);

  const handleMouseEnter = (e, item) => {
    const selector = `[data-key="${item.id}"]`;
    if (scaleOnHover) {
      gsap.to(selector, {
        scale: hoverScale,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  };

  const handleMouseLeave = (e, item) => {
    const selector = `[data-key="${item.id}"]`;
    if (scaleOnHover) {
      gsap.to(selector, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  };

  // Manejar scroll con debounce
  let scrollTimeout;
  const handleScroll = (e) => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      const slider = e.target;
      if (slider && items.length > 0) {
        const scrollLeft = slider.scrollLeft;
        const containerWidth = slider.offsetWidth;
        
        if (containerWidth > 0) {
          const newIndex = Math.round(scrollLeft / containerWidth);
          if (newIndex >= 0 && newIndex < items.length) {
            setSliderIndex(newIndex);
          }
        }
      }
    }, 100);
  };

  // Navegación con flechas
  const navigateImage = (direction) => {
    if (direction === 'next') {
      const nextIndex = (sliderIndex + 1) % items.length;
      setSliderIndex(nextIndex);
      scrollToImage(nextIndex);
    } else {
      const prevIndex = sliderIndex === 0 ? items.length - 1 : sliderIndex - 1;
      setSliderIndex(prevIndex);
      scrollToImage(prevIndex);
    }
  };

  // Scroll a imagen específica
  const scrollToImage = (index) => {
    if (sliderRef.current) {
      const containerWidth = sliderRef.current.offsetWidth;
      sliderRef.current.scrollTo({
        left: index * containerWidth,
        behavior: 'smooth'
      });
    }
  };

  // Manejar teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!sliderOpen) return;
      
      switch(e.key) {
        case 'ArrowLeft':
          navigateImage('prev');
          break;
        case 'ArrowRight':
          navigateImage('next');
          break;
        case 'Escape':
          setSliderOpen(false);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sliderOpen, sliderIndex, items.length]);

  // Sincronizar scroll cuando cambia el índice
  useEffect(() => {
    if (sliderOpen && sliderRef.current) {
      scrollToImage(sliderIndex);
    }
  }, [sliderIndex, sliderOpen]);

  return (
    <>
      <div ref={containerRef} className="list">
        {grid.map((item, index) => (
          <div
            key={item.id}
            data-key={item.id}
            className="item-wrapper"
            onClick={() => {
              setSliderIndex(index);
              setSliderOpen(true);
            }}
            onMouseEnter={e => handleMouseEnter(e, item)}
            onMouseLeave={e => handleMouseLeave(e, item)}
          >
            <div className="item-img" style={{ backgroundImage: `url(${item.img})` }}></div>
          </div>
        ))}
      </div>

      {sliderOpen && (
        <div className="slider-overlay" onClick={() => setSliderOpen(false)}>
          {/* Botón de cerrar blanco simple */}
          <button 
            className="slider-close-simple" 
            onClick={(e) => {
              e.stopPropagation();
              setSliderOpen(false);
            }}
          >
            <X size={24} />
          </button>

          {/* Imagen actual con contenedor de scroll */}
          <div
            className="slider-scroll-container"
            ref={sliderRef}
            onClick={e => e.stopPropagation()}
            onScroll={handleScroll}
          >
            {items.map((item, index) => (
              <img 
                key={item.id}
                src={item.img}
                alt="Imagen ampliada"
                className="slider-scroll-img"
              />
            ))}
          </div>

          {/* Flechas de navegación - solo visibles en desktop */}
          <button
            className="slider-nav-arrow slider-nav-left"
            onClick={(e) => {
              e.stopPropagation();
              navigateImage('prev');
            }}
            aria-label="Imagen anterior"
          >
            <ChevronLeft size={32} />
          </button>
          
          <button
            className="slider-nav-arrow slider-nav-right"
            onClick={(e) => {
              e.stopPropagation();
              navigateImage('next');
            }}
            aria-label="Siguiente imagen"
          >
            <ChevronRight size={32} />
          </button>

          {/* Indicadores de posición */}
          <div className="slider-indicators">
            {items.map((_, index) => (
              <button
                key={index}
                className={`slider-indicator ${index === sliderIndex ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSliderIndex(index);
                }}
                aria-label={`Ir a imagen ${index + 1}`}
              />
            ))}
          </div>

          {/* Imagen actual mostrada */}
          <img
            src={items[sliderIndex].img}
            alt="Imagen ampliada"
            className="slider-img"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};

export default Masonry;
