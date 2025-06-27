
// src/App.jsx
import React, { useEffect, useState } from "react";
import PageEngine from "./components/PageEngine";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase"; // Firebase instance

function App() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔧 Helper: Breaks a poem's content into multiple page-sized chunks
  const splitPoemIntoPages = (content, linesPerPage = 22) => {
    const lines = content.trim().split('\n').filter(Boolean); // Remove empty lines
    const chunks = [];
    for (let i = 0; i < lines.length; i += linesPerPage) {
      const chunk = lines.slice(i, i + linesPerPage).join('\n');
      chunks.push(chunk);
    }
    return chunks;
  };

  useEffect(() => {
    const fetchPoems = async () => {
      const querySnapshot = await getDocs(collection(db, "poems"));
      const poems = querySnapshot.docs.map(doc => doc.data());

      // ✅ Sort poems by 'order' field to maintain desired chronology
      poems.sort((a, b) => a.order - b.order);

      // 📜 Break each poem into one or more pages
      const flatPages = poems.flatMap(poem => {
        const chunks = splitPoemIntoPages(poem.content);
        const isSinglePagePoem = chunks.length === 1;

        return chunks.map((chunk, index) => ({
          title: index === 0 ? poem.title : '',           // Show title only on first page
          content: chunk,                                 // Page content
          isCentered: isSinglePagePoem                    // Center-align if only 1 page
        }));
      });

      setPages(flatPages);    // 🔃 Update state with processed pages
      setLoading(false);      // ✅ Done loading
    };

    fetchPoems();
  }, []);

  // 📟 Optional loading screen while data fetches
  if (loading) return <div className="loading-screen">Loading your book...</div>;

  // 🧠 Send fully processed pages to the PageEngine
  return <PageEngine pages={pages} />;
}

export default App;




