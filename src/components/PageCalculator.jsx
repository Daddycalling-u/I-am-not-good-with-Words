// src/components/PageCalculator.jsx
import React, { useRef, useEffect, useState } from 'react';

const PageCalculator = ({ content, onCalculated }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const height = ref.current.getBoundingClientRect().height;
    const pageHeight = 720; // Adjust based on your design
    const pageCount = Math.ceil(height / pageHeight);

    onCalculated(pageCount);
  }, [content, onCalculated]);

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        visibility: 'hidden',
        height: 'auto',
        width: '80vw',
        fontSize: '1.2rem',
        lineHeight: '1.6',
        padding: '2rem',
        whiteSpace: 'pre-wrap',
      }}
    >
      {content}
    </div>
  );
};

export default PageCalculator;
