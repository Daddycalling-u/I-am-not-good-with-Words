import React from 'react';
import { useNavigate } from 'react-router-dom';

const Cover = () => {
  const navigate = useNavigate();

  const handleCoverClick = () => {
    navigate('/index'); // or wherever your index route is
  };

  return (
    <div
      onClick={handleCoverClick}
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#f4e6c2',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h1>A Collection by Ashad</h1>
    </div>
  );
};

export default Cover;

