// src/components/WaterSlideEffect.jsx
import React from 'react';
import '../styles/WaterSlideEffect.css';

const WaterSlideEffect = ({ top, left, width }) => {
  return (
    <div
      className="water-slide-effect"
      style={{
        top: `${top}px`,
        left: `${left}px`,
        width: `${width}px`
      }}
    />
  );
};

export default WaterSlideEffect;
