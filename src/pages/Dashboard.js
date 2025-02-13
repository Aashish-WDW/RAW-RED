import React, { useEffect, useState } from 'react';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth'; 
import { db } from '../Conf/config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Leaderboard from '@/Components/Leaderboard';
import styles from '../styles/dashboard.module.css'; // Import your CSS module

const Dashboard = () => {
  const auth = getAuth();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [quizResults, setQuizResults] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchQuizResults(user.uid); 
      } else {
        router.push('/');
      }
    });
    return () => unsubscribe();
  }, [auth, router]);

  const fetchQuizResults = async (userId) => {
    try {
      const quizResultsRef = collection(db, 'quizResults');
      const q = query(quizResultsRef, where('userId', '==', userId));
      const querySnapshot = await getDocs(q);

      const results = [];
      querySnapshot.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });

      setQuizResults(results);
    } catch (error) {
      console.error('Error fetching quiz results:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className={styles.container}>
        <h1 className={styles.heading}>
          Welcome to the Dashboard, {user ? user.displayName : 'Guest'}!
        </h1>

        {quizResults.length > 0 ? (
          <div className="mb-4">
            <h2 className={styles.subheading}>Recent Quiz Results:</h2>
            <ul className={styles['result-list']}>
              {quizResults.map((result) => (
                <li key={result.id} className={styles['result-item']}>
                  Score: {result.score} | 
                  Date: {result.timestamp.toDate().toLocaleDateString()}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="mb-4 text-center">No quiz results available.</p>
        )}

        <Leaderboard/>

        <div className={styles['button-group']}>
          <Link href="/Edu">
            <button className={styles.button}>
              Go Back to Home
            </button>
          </Link>
          <button onClick={handleLogout} className={styles.button}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
