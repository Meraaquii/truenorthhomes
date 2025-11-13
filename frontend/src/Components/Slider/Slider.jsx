import React, { useEffect, useState } from "react";
import SliderContent from "../SliderContent/SliderContent";
import sliderImage from "../SliderImage/SliderImage";
import Dots from "../Dots/Dots";
import "./slider.css";

const len = sliderImage.length - 1;

function Slider() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prevIndex => (prevIndex === len ? 0 : prevIndex + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

//   const nextSlide = () => {
//     setActiveIndex(activeIndex === len ? 0 : activeIndex + 1);
//   };

//   const prevSlide = () => {
//     setActiveIndex(activeIndex === 0 ? len : activeIndex - 1);
//   };

  return (
    <div className="slider-container">
      <SliderContent activeIndex={activeIndex} sliderImage={sliderImage} />
      {/* <Arrows prevSlide={prevSlide} nextSlide={nextSlide} /> */}
      <Dots
        activeIndex={activeIndex}
        sliderImage={sliderImage}
        onClick={setActiveIndex}
      />
    </div>
  );
}

export default Slider;
