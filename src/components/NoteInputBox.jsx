// src/components/NoteInputBox.jsx
import React, { useState } from 'react';
import '../styles/NoteInputBox.css';

const NoteInputBox = ({ top, left, defaultText = '', onSave, onCancel, onDelete }) => {
  const [text, setText] = useState(defaultText);

  return (
    <div className="note-input-box" style={{ top: `${top}px`, left: `${left}px` }}>
      <label className="note-tooltip">
        Notes
        <span className="tooltip-text">
          This box won’t grow. But your thoughts can scroll.
        </span>
      </label>

      <textarea
        className="note-box"
        placeholder="Write between the lines..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="note-buttons">
        <button onClick={() => onSave(text)}>SAVE</button>
        <button onClick={onCancel}>CANCEL</button>
        {defaultText && <button onClick={onDelete}>DELETE</button>}
      </div>
    </div>
  );
};

export default NoteInputBox;
