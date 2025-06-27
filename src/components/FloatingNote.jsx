
import React from 'react';
import './FloatingNote.css';

const FloatingNote = ({ note, onChange, onSave, onDelete, onClose, readOnly }) => {
  return (
    <div className="floating-note">
      <button className="close-btn" onClick={onClose}>×</button>
      <textarea
        className="note-input"
        placeholder="Write between the lines..."
        value={note}
        onChange={onChange}
        readOnly={readOnly}
      />
      {!readOnly && (
        <div className="note-buttons">
          <button className="delete-btn" onClick={onDelete}>Delete</button>
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="save-btn" onClick={onSave}>Save</button>
        </div>
      )}
    </div>
  );
};

export default FloatingNote;
