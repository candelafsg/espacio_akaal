import { useState, useRef } from "react";
import "./slider.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Slider({ images = [] }) {
  const [current, setCurrent] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  const touchStartX = useRef(null);
  const sliderRef = useRef(null);

  if (!images.length) return null;

  const goTo = (index) => {
    const clamped = Math.max(0, Math.min(index, images.length - 1));
    setCurrent(clamped);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
    setDragging(true);
    setDragOffset(0);
  };

  const handleTouchMove = (e) => {
    if (touchStartX.current === null) return;
    const delta = e.targetTouches[0].clientX - touchStartX.current;
    setDragOffset(delta);
  };

  const handleTouchEnd = () => {
    const sliderWidth = sliderRef.current?.offsetWidth || 300;
    const threshold = sliderWidth * 0.25; // 25% del ancho para cambiar slide

    if (dragOffset < -threshold) goTo(current + 1);
    else if (dragOffset > threshold) goTo(current - 1);

    setDragging(false);
    setDragOffset(0);
    touchStartX.current = null;
  };

  // Posición base + arrastre en tiempo real
  const translateX = `calc(-${current * 100}% + ${dragOffset}px)`;

  return (
    <div className="slider-wrapper">
      <div
        className="slider"
        ref={sliderRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="slider-track"
          style={{
            transform: `translateX(${translateX})`,
            transition: dragging ? "none" : "transform 0.4s ease-in-out",
          }}
        >
          {images.map((img, index) => (
            <div className="slide" key={index}>
              <img
                src={img}
                alt={`Imagen ${index + 1}`}
                className="slide-imagen"
                draggable={false}
              />
            </div>
          ))}
        </div>

        <button className="arrow left" onClick={() => goTo(current - 1)} aria-label="Imagen anterior">
          <ChevronLeft />
        </button>
        <button className="arrow right" onClick={() => goTo(current + 1)} aria-label="Imagen siguiente">
          <ChevronRight />
        </button>
      </div>

      <div className="dots">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`dot ${current === index ? "active" : ""}`}
            onClick={() => goTo(index)}
            aria-label={`Ir a la imagen ${index + 1}`}
            aria-current={current === index ? "true" : undefined}
          />
        ))}
      </div>
    </div>
  );
}