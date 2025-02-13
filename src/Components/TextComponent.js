import { useEffect } from 'react';
import styles from '../styles/Home.module.css';

const TextComponent = () => {
  useEffect(() => {
    const text = document.querySelector('.text');

    if (text) {
      for (let i = 0; i < 4; i++) {
        const span = document.createElement('span');
        span.textContent = 'AV-1';
        text.appendChild(span);
      }
    }
  }, []);

  return (
    <div className={styles.text}>
      <div className={styles.overlay}>
        <div className={styles.text}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default TextComponent;
