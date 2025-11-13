import React from "react";

function SliderContent({ activeIndex, sliderImage }) {
  const translateX = -activeIndex * 100;
   
  return (
    <div 
      className="slides" 
      style={{ transform: `translateX(${translateX}%)` }}
    >
      {sliderImage.map((slide, index) => (
        <div key={index} className="slide">
          <img
            src={slide.urls || slide.url || slide.src} // Adjust based on your data structure
            alt={slide.title || `Slide ${index + 1}`}
            className="slide-image"
          />
          {/* {slide.title && <h2 className="slide-title">{slide.title}</h2>}
          {slide.text && <p className="slide-text">{slide.text}</p>} */}
        </div>
      ))}
    </div>
  );
}

export default SliderContent;