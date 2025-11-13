import React, { useState } from "react";
import "./Projects.css";
import sl from "../../assets/Silver leaf.jpg";
import Glenmore from "../../assets/Glenmore.jpg";
import GlenmoreWood from "../../assets/Glenmore Woods.jpg";
import Modal from "../Modal/Modal";
import GlenMoreModal from "../GlenMoreModal/GlenMoreModal";

const Projects = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Adjusted translateX for 2 projects
  const slidePositions = ["34%", "-0%", "-34%"];

  const openModal = (modalName) => setActiveModal(modalName);
  const closeModal = () => setActiveModal(null);

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
    <div className="projects-wrapper">
      <div
        className="projects"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          transform:
            window.innerWidth <= 720
              ? `translateX(${slidePositions[currentSlide]})`
              : "none",
          transition: "transform 0.3s ease",
        }}
      >
        <div className="project">
          <img src={Glenmore} alt="" />
          <h3>
            Glenmore Park
            <br />
            G+18 storey building
            <br />
            OFF EM Bypass
          </h3>
          <button
            className="learn-btn"
            onClick={() =>
              window.open("https://www.glenmoreparkkolkata.com/", "_blank")
            }
          >
            LEARN MORE
          </button>
        </div>

        <div className="project">
          <img src={GlenmoreWood} alt="" />
          <h3>
            Glenmore Woods
            <br />
            G+18 storey building
            <br />
            OFF EM Bypass
          </h3>
          <button className="learn-btn" onClick={() => openModal("glenmore")}>
            LEARN MORE
          </button>
        </div>

        <div className="project">
          <img src={sl} alt="" />
          <h3>
            Silver Leaf
            <br />
            G+4 storey building
            <br />
            New Alipore
          </h3>
          <button
            className="learn-btn"
            id="l1"
            onClick={() => openModal("silverleaf")}
          >
            LEARN MORE
          </button>
        </div>
      </div>

      {activeModal === "silverleaf" && <Modal onClose={closeModal} />}
      {activeModal === "glenmore" && <GlenMoreModal onClose={closeModal} />}
    </div>
  );
};

export default Projects;
