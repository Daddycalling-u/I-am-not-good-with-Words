//src/pages/Cover.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CoverImage from '@assets/Cover.png'; // ✅ Ensure it exists
import '@styles/Cover.css'; // Optional custom styling

const Cover = () => {
  const navigate = useNavigate();

  const handleCoverClick = () => {
    // ⏩ Navigate to login page with slight delay for animation (optional)
    setTimeout(() => {
      navigate('/authpage');
    }, 250); // a gentle nudge for UX polish
  };

  return (
    <div
      onClick={handleCoverClick}
      className="cover-container"
    >
      <img
        src={CoverImage}
        alt="Book Cover"
        className="cover-image"
      />
    </div>
  );
};

export default Cover;


