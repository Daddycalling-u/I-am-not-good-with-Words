// src/components/ScrollBar.jsx
import React, { useState, useEffect } from 'react';
import './ScrollBar.css';

const ScrollBar = ({ currentPage, totalPages }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const show = () => setVisible(true);
    const hide = () => setVisible(false);

    let timeout;
    const handleInteraction = () => {
      setVisible(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setVisible(false), 1500);
    };

    window.addEventListener('mousemove', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);

    return () => {
      window.removeEventListener('mousemove', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, []);

  const thumbWidth = (100 / totalPages) + '%';
  const thumbPosition = (100 / totalPages) * (currentPage - 1) + '%';

  return (
    <div className={`scroll-bar-container ${visible ? 'visible' : ''}`}>
      <div className="scroll-track">
        <div
          className="scroll-thumb"
          style={{
            width: thumbWidth,
            transform: `translateX(${thumbPosition})`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default ScrollBar;

