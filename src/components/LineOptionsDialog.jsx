// src/components/LineOptionsDialog.jsx
import React, { useState } from 'react';
import ColorPaletteDropdown from './ColorPaletteDropdown';
import '../styles/LineOptionsDialog.css';

const LineOptionsDialog = ({ onClose, onHighlight, onPin, onAddNote, onCopy }) => {
  const [showPalette, setShowPalette] = useState(false);

  const handleHighlightClick = () => setShowPalette(!showPalette);

  return (
    <div className="dialog-container">
      <div className="dialog-scrollable">
        <button onClick={handleHighlightClick}>Highlight</button>
        {showPalette && <ColorPaletteDropdown onSelectColor={onHighlight} />}
        <button onClick={onPin}>Pin</button>
        <button onClick={onAddNote}>Add Note</button>
        <button onClick={onCopy}>Copy</button>
      </div>
    </div>
  );
};

export default LineOptionsDialog;
