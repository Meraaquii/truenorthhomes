import React, { useState } from 'react';
import './Experience.css';
import { useNavigate } from 'react-router-dom';
import img1 from '../../assets/experience-slider1.png';
import img2 from '../../assets/experience-slider2.png';

const Experience = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Corrected translateX percentages for mobile swipe (negative values)
  const slidePositions = ['27%', '-27%'];

  const handleRedirect = (path) => {
    navigate(path);
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
    // Optional cleanup if dropdown states exist
    // setToggle(false);
    // setShowDropdown(false);
    // setMobileDropdownOpen(false);
  };

  const handleTouchStart = (e) => {
    if (window.innerWidth > 720) return;
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging || window.innerWidth > 720) return;
    e.preventDefault();
  };

  const handleTouchEnd = (e) => {
    if (!isDragging || window.innerWidth > 720) return;
    setIsDragging(false);

    const endX = e.changedTouches[0].clientX;
    const diffX = startX - endX;

    if (Math.abs(diffX) > 50) {
      if (diffX > 0 && currentSlide < slidePositions.length - 1) {
        setCurrentSlide(currentSlide + 1);
      } else if (diffX < 0 && currentSlide > 0) {
        setCurrentSlide(currentSlide - 1);
      }
    }
  };

  return (
    <div className='experience-wrapper'>
      <div className="experience">
        <div className="exp-header">
          <h1>THE TRUE NORTH<br /> HOMES EXPERIENCE</h1>
        </div>
        <div
          className="projects"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            transform: window.innerWidth <= 720 ? `translateX(${slidePositions[currentSlide]})` : 'none',
            transition: 'transform 0.3s ease'
          }}
        >
          <div className="project-div">
            <img src={img1} alt="Completed Projects" />
            <div className="project-details">
              <h2>PROJECTS<br />COMPLETED</h2>
              <button className="view-btn">
                <a href="https://bengalroytech.com/projects.html" target='_blank' rel="noreferrer">VIEW</a>
              </button>
            </div>
          </div>
          <div className="project-div">
            <img src={img2} alt="Ongoing Projects" />
            <div className="project-details">
              <h2 id='ongoing'>ONGOING<br />PROJECTS</h2>
              <button className="view-btn" id='ongoing-btn' onClick={() => handleRedirect('/project')}>
                VIEW
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
