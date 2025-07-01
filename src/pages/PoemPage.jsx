import React, { useEffect, useRef, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { useNavigate } from 'react-router-dom';
import ScrollBar from '@components/ScrollBar';
import FloatingNote from '@components/FloatingNote';
import '@styles/PoemPage.css';
import { splitPoemIntoPages } from '@utils/splitPoemIntoPages';

const PoemPage = ({ poemData, currentPage, totalPages }) => {
  const [showNote, setShowNote] = useState(false);
  const [selectedNote, setSelectedNote] = useState('');
  const [isAuthorNote, setIsAuthorNote] = useState(false);
  const [pages, setPages] = useState([]);

  const contentRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (poemData?.content) {
      const result = splitPoemIntoPages(poemData.content);
      setPages(result);
    }

    const el = contentRef.current;
    if (el) {
      el.classList.remove('show');
      void el.offsetWidth;
      el.classList.add('show');
    }
  }, [poemData]);

  const goToPreviousPage = () => {
    if (currentPage > 1) navigate(`/poem/${currentPage - 1}`);
    else navigate('/');
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

  const pageIndex = currentPage - poemData.startPage;
  const currentPageData = pages[pageIndex] || { content: 'Loading...', isCentered: false };
  const backLabel = currentPage === 1 ? 'Index' : `Page ${currentPage - 1}`;

  return (
    <div className="poem-page-container" {...handlers}>
      {/* 🔙 Back and ❌ Close */}
      <div className="top-bar">
        <button className="back-button" onClick={goToPreviousPage}>{`← ${backLabel}`}</button>
        <button className="close-button" onClick={() => navigate('/index')}>×</button>
      </div>

      {/* 📚 Menu / Library */}
      <button className="menu-button">☰</button>

      {/* 📝 Poem Content */}
      <div ref={contentRef} className="poem-content">
        {pageIndex === 0 && <h1 className="poem-title">{poemData.title}</h1>}
        <div className={`poem-body ${currentPageData.isCentered ? 'center-aligned' : 'left-aligned'}`}>
          <pre>{currentPageData.content}</pre>
        </div>
      </div>

      {/* 📟 Page Indicator ScrollBar */}
      <ScrollBar currentPage={currentPage} totalPages={totalPages} />

      {/* 🧪 Test Note Button */}
      <button className="test-note-btn" onClick={() => {
        setSelectedNote("Test note from the poet...");
        setIsAuthorNote(false);
        setShowNote(true);
      }}>Show Test Note</button>

      {/* ✨ Floating Note UI */}
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







