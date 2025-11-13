import React, { useRef, useState } from "react";
import "./EnvelopeAnimation.css";

export default function EnvelopeOpenAnimation() {
  const flipRef = useRef(null);
  const letterRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleEnvelopeClick = () => {
    if (isOpen) return;
    const flip = flipRef.current;
    const letter = letterRef.current;
    flip.classList.add("open");
    flip.classList.remove("close");
    setTimeout(() => {
      letter.classList.add("letterOpen");
      letter.classList.remove("letterClose");
      letter.style.zIndex = "7";
      setIsOpen(true);
    }, 600);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    const flip = flipRef.current;
    const letter = letterRef.current;
    letter.classList.remove("letterOpen");
    letter.classList.add("letterClose");
    setTimeout(() => {
      flip.classList.remove("open");
      flip.classList.add("close");
      letter.style.zIndex = "5";
      setIsOpen(false);
    }, 600);
  };

  return (
    <div className="envelope-wrapper">
      <div className="container" onClick={handleEnvelopeClick}>
        <div className="envelope"></div>

        <div className="flip" ref={flipRef} onClick={handleEnvelopeClick}></div>

        <div className="letter" ref={letterRef}>
          <div className="text">
            <p>
              “True North Homes, was incorporated, having begun working on
              government contractual infrastructure projects, turnkey interior
              jobs and real estate development, mainly focusing on civil
              construction, development, expansion and design of land,
              buildings, residential complexes, roads, highways etc.”
            </p>
            <p>
              But with time I began to diversify and started taking on partners
              who will share a single vision - delivering modern residential
              properties to solve the housing problem at modest pricing while at
              once being responsible towards Mother Earth. All our projects are
              value for money, with thoughtful, smart and aesthetic designs.
            </p>
            <p>
              My vision for True North Homes is a unified family of builders,
              developers, collaborators, who come from varying backgrounds but
              share a common vision. A future where our future generations can
              live and inherit a better earth.
            </p>
          </div>
          {isOpen && (
            <button className="close-btn" onClick={handleClose}>
              ✕
            </button>
          )}
        </div>
      </div>

      <button className="founder-btn" onClick={handleEnvelopeClick}>
        FROM THE FOUNDER’S DESK
      </button>
    </div>
  );
}