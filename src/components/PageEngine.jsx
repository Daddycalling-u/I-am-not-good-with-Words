// ../components/PageEngine.jsx
import React, { useState, useRef, useEffect } from 'react';
import LineOptionsDialog from './LineOptionsDialog';
import WaterSlideEffect from './WaterSlideEffect';
import NoteInputBox from './NoteInputBox';
import './PageEngine.css';

const PageEngine = ({ pages }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedLineIndex, setSelectedLineIndex] = useState(null);
  const [dialogueVisible, setDialogueVisible] = useState(false);
  const [dialoguePos, setDialoguePos] = useState({ top: 0, left: 0 });
  const [noteBoxVisible, setNoteBoxVisible] = useState(false);
  const [noteBoxPos, setNoteBoxPos] = useState({ top: 0, left: 0 });
  const [noteText, setNoteText] = useState('');
  const [waterEffect, setWaterEffect] = useState(null);

  const rippleRef = useRef(null);
  const poem = pages[currentPage];

  // 🔄 Handle page navigation and ripple animation on page click
  const handlePageClick = (direction, e) => {
    if (dialogueVisible) return setDialogueVisible(false); // ⛔ Hide menu if clicking elsewhere
    const next = currentPage + direction;
    if (next < 0 || next >= pages.length) return;

    const ripple = rippleRef.current;
    const x = e.clientX - ripple.offsetLeft;
    const y = e.clientY - ripple.offsetTop;

    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.classList.add("ripple");

    setTimeout(() => ripple.classList.remove("ripple"), 500);
    setCurrentPage(next);
    setSelectedLineIndex(null); // 🔄 Reset selected line
  };

  const showTitle = poem.title !== '';
  const alignmentClass = poem.isCentered ? 'center-aligned' : 'left-aligned';

  // ✋ Handle long press event on a line to trigger dialogue box
  const handleLongPress = (index, event) => {
    const rect = event.target.getBoundingClientRect();
    setSelectedLineIndex(index);
    setDialoguePos({ top: rect.top + window.scrollY, left: rect.left });
    setDialogueVisible(true);

    // 💧 Trigger WaterSlideEffect
    setWaterEffect({
      top: rect.top + window.scrollY,
      left: rect.left,
      width: rect.width
    });
  };

  // ❌ Close the dialogue box
  const handleDialogClose = () => {
    setDialogueVisible(false);
    setSelectedLineIndex(null);
  };

  // 📝 Open note input box
  const handleAddNote = () => {
    const rect = document.querySelectorAll('.line')[selectedLineIndex].getBoundingClientRect();
    setNoteBoxPos({ top: rect.top + window.scrollY + 40, left: rect.left });
    setNoteText('');
    setNoteBoxVisible(true);
    setDialogueVisible(false);
  };

  // 📝 Save note stub
  const handleSaveNote = (text) => {
    setNoteBoxVisible(false);
    console.log('Note saved:', text);
  };

  // ⏳ Clear water effect after animation
  useEffect(() => {
    if (waterEffect) {
      const timer = setTimeout(() => setWaterEffect(null), 800); // matches animation duration
      return () => clearTimeout(timer);
    }
  }, [waterEffect]);

  const lines = poem.content.split('\n');

  return (
    <div className="page-engine" onClick={() => handleDialogClose()}>
      {/* 💧 Water slide visual effect */}
      {waterEffect && <WaterSlideEffect {...waterEffect} />}

      {/* 🌊 Ripple container for page turn effect */}
      <div className="ripple-container" ref={rippleRef}></div>

      {/* 📄 Main content display */}
      <div className="page-content">
        <div className="poem-page">
          {showTitle && <h1 className="poem-title">{poem.title}</h1>}
          <pre className={`poem-body ${alignmentClass}`}>
            {lines.map((line, idx) => (
              <div
                key={idx}
                className={`line ${selectedLineIndex === idx ? 'selected-line' : ''}`}
                // 📍 Long press detection logic
                onPointerDown={(e) => {
                  const timer = setTimeout(() => handleLongPress(idx, e), 500); // 500ms = long press
                  const cancel = () => clearTimeout(timer);
                  e.target.addEventListener('pointerup', cancel, { once: true });
                  e.target.addEventListener('pointerleave', cancel, { once: true });
                }}
              >
                {line}
              </div>
            ))}
          </pre>
        </div>
      </div>

      {/* 💬 Floating interactive dialog box */}
      {dialogueVisible && (
        <LineOptionsDialog
          onClose={handleDialogClose}
          onHighlight={() => {}} // stub
          onPin={() => {}} // stub
          onAddNote={handleAddNote}
          onCopy={() => {}} // stub
        />
      )}

      {/* 📝 Floating Note Input Box */}
      {noteBoxVisible && (
        <NoteInputBox
          top={noteBoxPos.top}
          left={noteBoxPos.left}
          defaultText={noteText}
          onSave={handleSaveNote}
          onCancel={() => setNoteBoxVisible(false)}
          onDelete={() => setNoteBoxVisible(false)}
        />
      )}

      {/* ◀️ Left and ▶️ Right zones for page navigation */}
      <div className="left-zone" onClick={(e) => handlePageClick(-1, e)} />
      <div className="right-zone" onClick={(e) => handlePageClick(1, e)} />
    </div>
  );
};

export default PageEngine;


