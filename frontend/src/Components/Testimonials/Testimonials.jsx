import React, { useState, useRef } from 'react';
import bg from '../../assets/customer-bg.jpg';
import q1 from '../../assets/quet1.png';
import q2 from '../../assets/quet2.png';
import './Testimonials.css';

const Testimonials = () => {
  const testimonials = [
    {
      text: "We are writing to thank Roytech Group for the kind assistance they have provided to secure the property at Kolkata. From the beginning, we found that Roytech Group had an honest approach and were ready to accommodate us.",
      name: "ALOKE BASU",
      location: "California, USA"
    },
    {
      text: "Roytech, the primary aspect we are convinced of is their quality control. Their caring emphasis on minute details is what seperates a Flat from a home.",
      name: "DR GAUTAM DUTTA",
      location: "Indian Institutes of Foreign Trade, Kolkata"
    },
    {
      text: "Had done a COMPLETED reiki on all the Bengal Roy Tech projects and found the construction and quality to be superior, hence decided to invest in an apartment. Expecting a good return on my investment.",
      name: "AMIT SHARMA",
      location: "Kolkata"
    }
  ];

  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState('next');
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const wheelTimeout = useRef(null);
  const lastWheelTime = useRef(0);

  const goToNext = () => {
    setDirection('next');
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const goToPrev = () => {
    setDirection('prev');
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setDirection(index > current ? 'next' : 'prev');
    setCurrent(index);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handleWheel = (e) => {
    const now = Date.now();
    
    // Prevent too frequent changes (throttle to 800ms)
    if (now - lastWheelTime.current < 800) {
      return;
    }

    // Detect horizontal scrolling
    const isHorizontalScroll = Math.abs(e.deltaX) > Math.abs(e.deltaY);
    
    if (isHorizontalScroll && Math.abs(e.deltaX) > 30) {
      e.preventDefault();
      
      if (e.deltaX > 0) {
        // Scrolling right → next testimonial
        goToNext();
      } else {
        // Scrolling left → previous testimonial
        goToPrev();
      }
      
      lastWheelTime.current = now;
    }
  };

  const getSlideClass = (index) => {
    if (index === current) return 'active';
    return '';
  };

  return (
    <div className='testimonials-wrapper'>
      <div className="testimonials">
        {/* <div className="testimonial-bg">
          <img src={bg} alt="Background" />
        </div> */}

        <div className="testimonial-main">
          <h2>HAPPY CUSTOMERS.<br />HAPPY US.</h2>

          <div
            className="testimonial-slider"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onWheel={handleWheel}
          >
            {testimonials.map((item, index) => (
              <div
                key={index}
                className={`testimonial ${getSlideClass(index)}`}
              >
                <img src={q1} alt="quote open" className="quote-icon start" />
                <p className="testimonial-text">{item.text}</p>
                <p className="testimonial-name">{item.name}</p>
                <p className="testimonial-location">{item.location}</p>
                <img src={q2} alt="quote close" className="quote-icon end" />
              </div>
            ))}
          </div>

          <div className="testimonial-dots">
            {testimonials.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === current ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;