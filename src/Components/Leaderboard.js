// src/components/Leaderboard.js

import React, { useEffect, useState } from 'react';
import { db } from '../Conf/config';
import { collection, getDocs } from 'firebase/firestore';

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  const fetchLeaderboardData = async () => {
    setLoading(true);
    setError(null);

    try {
      const quizResultsRef = collection(db, 'quizResults');
      const querySnapshot = await getDocs(quizResultsRef);

      const data = [];
      querySnapshot.forEach((doc) => {
        const entry = { id: doc.id, ...doc.data() };

        // Assuming displayName is directly stored in quizResults
        // Replace with actual logic if displayName needs to be fetched from another collection
        // Modify this line to fetch displayName from another collection or source
        entry.displayName = doc.data().displayName; // Replace with actual path to displayName

        data.push(entry);
      });

      // Sort data by score (descending)
      data.sort((a, b) => b.score - a.score);

      setLeaderboardData(data);
    } catch (error) {
      console.error('Error fetching leaderboard data:', error);
      setError('Error fetching leaderboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading leaderboard...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Leaderboard</h2>
      <ul>
        {leaderboardData.map((entry, index) => (
          <li key={entry.id}>
            <span>{index + 1}. </span>
            <span>User: {entry.id}</span> {/* Display user's displayName */}
            <span> - Score: {entry.score}</span> {/* Display user's score */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
