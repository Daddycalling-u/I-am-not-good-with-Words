import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig'; // adjust path if needed
import { Link } from 'react-router-dom';

const IndexPage = () => {
  const [poems, setPoems] = useState([]);

  useEffect(() => {
    const fetchPoems = async () => {
      try {
        const poemsRef = collection(db, 'poems');
        const q = query(
          poemsRef,
          where('visible', '==', true),
          orderBy('pageNumber')
        );

        const querySnapshot = await getDocs(q);
        const poemList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPoems(poemList);
      } catch (error) {
        console.error('Error fetching poems:', error);
      }
    };

    fetchPoems();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontFamily: 'Playfair Display', fontWeight: 'bold' }}>
        I Am Not Good With Words
      </h1>
      <h2 style={{ fontFamily: 'Playfair Display', fontWeight: 'bold' }}>
        Index
      </h2>
      <ul style={{ fontFamily: 'Lora', fontSize: '1.2rem' }}>
        {poems.map((poem, index) => (
          <li key={poem.id}>
            <Link to={`/poem/${poem.pageNumber}`}>
              {poem.pageNumber}. {poem.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IndexPage;


