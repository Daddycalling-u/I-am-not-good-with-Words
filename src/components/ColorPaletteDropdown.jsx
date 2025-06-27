// src/components/ColorPaletteDropdown.jsx
import React from 'react';
import '../styles/LineOptionsDialog.css';

const generateDailyColors = () => {
  const palettes = [
    ['#f39c12', '#1abc9c', '#9b59b6', '#e67e22', '#2ecc71', '#e74c3c'],
    ['#d35400', '#2980b9', '#16a085', '#c0392b', '#8e44ad', '#27ae60'],
    ['#34495e', '#7f8c8d', '#bdc3c7', '#95a5a6', '#f1c40f', '#2c3e50']
  ];
  const index = new Date().getDate() % palettes.length;
  return palettes[index];
};

const ColorPaletteDropdown = ({ onSelectColor }) => {
  const colors = generateDailyColors();

  return (
    <div className="color-palette-dropdown">
      {colors.map((color, idx) => (
        <span
          key={idx}
          className="color-option"
          style={{ backgroundColor: color }}
          onClick={() => onSelectColor(color)}
        />
      ))}
    </div>
  );
};

export default ColorPaletteDropdown;
