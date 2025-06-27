import React, { useEffect, useRef, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { useNavigate } from 'react-router-dom'; 
import ScrollBar from '../components/ScrollBar';
import FloatingNote from '../components/FloatingNote';
import '../styles/PoemPage.css';
import { splitPoemIntoPages } from '../utils/splitPoemIntoPages';

const PoemPage = ({ poemData, currentPage, totalPages }) => {
  // -----------------------------
  // Local State
  // -----------------------------
  const [showNote, setShowNote] = useState(false);
  const [selectedNote, setSelectedNote] = useState('');
  const [isAuthorNote, setIsAuthorNote] = useState(false);
  const [pages, setPages] = useState([]);

  const contentRef = useRef(null);
  const navigate = useNavigate();

  // -----------------------------
  // Process & Split Poem Content
  // -----------------------------
  useEffect(() => {
    if (poemData?.content) {
      // Split poem into pages with alignment metadata
      const result = splitPoemIntoPages(poemData.content);
      setPages(result);
      console.log("Split pages result:", result);
    }

    // Trigger fade animation
    const el = contentRef.current;
    if (el) {
      el.classList.remove('show');
      void el.offsetWidth; // Trigger reflow
      el.classList.add('show');
    }
  }, [poemData]);

  // -----------------------------
  // Navigation Logic
  // -----------------------------
  const goToPreviousPage = () => {
    if (currentPage > 1) navigate(`/poem/${currentPage - 1}`);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) navigate(`/poem/${currentPage + 1}`);
  };

  const handlers = useSwipeable({
    onSwipedLeft: goToNextPage,
    onSwipedRight: goToPreviousPage,
    preventDefaultTouchmoveEvent: true,
    trackTouch: true,
  });

  // -----------------------------
  // Determine Current Page Content
  // -----------------------------
  const pageIndex = currentPage - poemData.startPage;
  const isFirstPage = pageIndex === 0;
  const currentPageData = pages[pageIndex] || { content: 'Loading...', isCentered: false };

  return (
    <div className="poem-page-container" {...handlers}>
      
      {/* Click zones for navigation */}
      <div className="click-zones">
        <div className="left-zone" onClick={goToPreviousPage}></div>
        <div className="right-zone" onClick={goToNextPage}></div>
      </div>

      {/* Poem Content Area */}
      <div ref={contentRef} className="poem-content">
  {pageIndex === 0 && (
    <h1 className="poem-title">{poemData.title}</h1>
  )}
  <div className={`poem-body ${page?.isCentered ? 'center-aligned' : 'left-aligned'}`}>
    <pre>{page?.content}</pre>
  </div>
</div>

      {/* Bottom Scrollbar */}
      <ScrollBar currentPage={currentPage} totalPages={totalPages} />

      {/* Test Button (Remove in production) */}
      <button className="test-note-btn" onClick={() => {
        setSelectedNote("Test note from the poet...");
        setIsAuthorNote(false);
        setShowNote(true);
      }}>
        Show Test Note
      </button>

      {/* Floating Note UI */}
      {showNote && (
        <FloatingNote
          note={selectedNote}
          onChange={(text) => setSelectedNote(text)}
          onSave={() => {
            console.log("Saving:", selectedNote);
            setShowNote(false);
          }}
          onDelete={() => {
            console.log("Deleted note");
            setSelectedNote('');
            setShowNote(false);
          }}
          onCancel={() => setShowNote(false)}
          isReadOnly={isAuthorNote}
        />
      )}
    </div>
  );
};

export default PoemPage;






