// components/Edu.js
import React, { useState, useEffect } from 'react';
import styles from '../styles/Edu.module.css';
import Navbar from '@/Components/Navbar';
import TypingAnimation from '@/Components/TypingAnimation';
import KaveButton from '@/Components/KaveButton';

function Edu() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 9000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.EduBAck}>
      <Navbar />
      <div className={styles.bord}>
        <TypingAnimation />
        {showButton && <KaveButton />}
      </div>
    </div>
  );
}

export default Edu;
