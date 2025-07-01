// ../components/PageEngine.jsx
import React, { useState, useRef, useEffect } from 'react';
import LineOptionsDialog from './LineOptionsDialog';
import WaterSlideEffect from './WaterSlideEffect';
import NoteInputBox from './NoteInputBox';
import './PageEngine.css';

const PageEngine = ({ pages }) => {
  const [selectedLineIndex, setSelectedLineIndex] = useState(null);
  const [dialogueVisible, setDialogueVisible] = useState(false);
  const [dialoguePos, setDialoguePos] = useState({ top: 0, left: 0 });
  const [noteBoxVisible, setNoteBoxVisible] = useState(false);
  const [noteBoxPos, setNoteBoxPos] = useState({ top: 0, left: 0 });
  const [noteText, setNoteText] = useState('');
  const [waterEffect, setWaterEffect] = useState(null);

  const rippleRef = useRef(null);

  // ✋ Handle long press event on a line to trigger dialogue box
  const handleLongPress = (pageIndex, lineIndex, event) => {
    const rect = event.target.getBoundingClientRect();
    setSelectedLineIndex(`${pageIndex}-${lineIndex}`);
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
    const parts = selectedLineIndex.split('-');
    const pageIdx = parseInt(parts[0]);
    const lineIdx = parseInt(parts[1]);
    const rect = document.querySelectorAll('.poem-page')[pageIdx]
      .querySelectorAll('.line')[lineIdx].getBoundingClientRect();
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
      const timer = setTimeout(() => setWaterEffect(null), 800);
      return () => clearTimeout(timer);
    }
  }, [waterEffect]);

  return (
    <div className="page-engine vertical-scroll" onClick={() => handleDialogClose()}>
      {waterEffect && <WaterSlideEffect {...waterEffect} />}

      <div className="ripple-container" ref={rippleRef}></div>

      <div className="page-content column-layout">
        {pages.map((poem, pageIndex) => {
          const showTitle = poem.title !== '';
          const alignmentClass = poem.isCentered ? 'center-aligned' : 'left-aligned';
          const lines = poem.content.split('\n');

          return (
            <div className="poem-page" key={pageIndex}>
              {showTitle && <h1 className="poem-title">{poem.title}</h1>}
              <pre className={`poem-body ${alignmentClass}`}>
                {lines.map((line, idx) => (
                  <div
                    key={idx}
                    className={`line`}
                    onPointerDown={(e) => {
                      const timer = setTimeout(() => handleLongPress(pageIndex, idx, e), 500);
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
          );
        })}
      </div>

      {dialogueVisible && (
        <LineOptionsDialog
          onClose={handleDialogClose}
          onHighlight={() => {}}
          onPin={() => {}}
          onAddNote={handleAddNote}
          onCopy={() => {}}
        />
      )}

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
    </div>
  );
};

export default PageEngine;





