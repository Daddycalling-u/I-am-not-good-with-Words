// src/App.jsx
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Cover from '@pages/Cover';
import AuthPage from '@pages/AuthPage';
import IndexPage from '@pages/Index';
import PoemPage from '@pages/PoemPage';

import { auth, db } from './firebase/firebaseconfig';

function App() {
  const [poems, setPoems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // 👈 optional error state

  const splitPoemIntoPages = (content, linesPerPage = 22) => {
    const lines = content.trim().split('\n').filter(Boolean);
    const chunks = [];
    for (let i = 0; i < lines.length; i += linesPerPage) {
      const chunk = lines.slice(i, i + linesPerPage).join('\n');
      chunks.push(chunk);
    }
    return chunks;
  };

  useEffect(() => {
    const fetchPoems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "poems"));
        const rawPoems = querySnapshot.docs.map(doc => doc.data());

        rawPoems.sort((a, b) => a.order - b.order);

        let currentPage = 1;
        const processedPoems = rawPoems.map(poem => {
          const pages = splitPoemIntoPages(poem.content);
          const startPage = currentPage;
          const pageObjects = pages.map((chunk, index) => ({
            content: chunk,
            isCentered: pages.length === 1,
            title: index === 0 ? poem.title : "",
            pageNum: currentPage + index
          }));
          currentPage += pages.length;
          return {
            ...poem,
            pages: pageObjects,
            startPage,
            endPage: currentPage - 1
          };
        });

        setPoems(processedPoems);
        setLoading(false);
      } catch (err) {
        console.error("🔥 Failed to fetch poems from Firestore:", err);
        setError("Something went wrong while loading your book.");
        setLoading(false);
      }
    };

    fetchPoems();
  }, []);

  if (loading) return <div className="loading-screen">📖 Loading your book...</div>;
  if (error) return <div className="error-screen">⚠️ {error}</div>;

  const totalPages = poems.reduce((acc, poem) => acc + poem.pages.length, 0);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Cover />} />
        <Route path="/authpage" element={<AuthPage />} />
        <Route path="/index" element={<IndexPage poems={poems} />} />
        <Route
          path="/poem/:pageNum"
          element={<PoemPage poemBook={poems} totalPages={totalPages} />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;





