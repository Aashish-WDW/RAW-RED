import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/Home.module.scss';
import '../app/globals.css';
import { useRouter } from 'next/router';

function Home() {
  const canvasRef = useRef(null);
  const textRef = useRef(null);
  const ulRef = useRef(null);
  const [idx, setIdx] = useState(0);
  const [count, setCount] = useState(0);

  const [activeIndex, setActiveIndex] = useState(0);

  const menuItems = [
    { id: 1, label: 'Home', href: '/' },
    { id: 2, label: 'About', href: '/about' },
    { id: 3, label: 'Contact', href: '/contact' },
  ];

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      setActiveIndex((prev) => (prev + 1) % menuItems.length);
    } else if (e.key === 'ArrowUp') {
      setActiveIndex((prev) => (prev - 1 + menuItems.length) % menuItems.length);
    } else if (e.key === 'Enter') {
      window.location.href = menuItems[activeIndex].href;
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const text = textRef.current;
    const ul = ulRef.current;

    if (!canvas || !text || !ul) return;

    const ww = window.innerWidth;

    // Set canvas size
    canvas.width = ww / 3;
    canvas.height = (ww * 0.5625) / 3;

    // Generate CRT noise
    function snow(ctx) {
      var w = ctx.canvas.width,
        h = ctx.canvas.height,
        d = ctx.createImageData(w, h),
        b = new Uint32Array(d.data.buffer),
        len = b.length;

      for (var i = 0; i < len; i++) {
        b[i] = ((255 * Math.random()) | 0) << 24;
      }

      ctx.putImageData(d, 0, 0);
    }

    function animate() {
      const ctx = canvas.getContext('2d');
      snow(ctx);
      requestAnimationFrame(animate);
    }

    // Glitch effect
    for (let i = 0; i < 4; i++) {
      const span = text.firstElementChild.cloneNode(true);
      text.appendChild(span);
    }

    // Animation start
    setTimeout(() => {
      animate();
    }, 1000);

    // Keyboard events
    function handleKeyDown(e) {
      const key = e.keyCode;
      const prev = idx;
      if (key === 38 || key === 40) {
        e.preventDefault();
        switch (key) {
          case 38:
            if (idx > 0) {
              setIdx(idx - 1);
            }
            break;
          case 40:
            if (idx < count - 1) {
              setIdx(idx + 1);
            }
            break;
          default:
            break;
        }
      }
    }

    // Event listener setup
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [idx, count]); // Dependency array

  const router = useRouter();

  useEffect(() => {
    const ul = ulRef.current;

    // Initial active element
    let activeIndex = 0;
    ul.childNodes[activeIndex].classList.add(styles.active);

    const handleKeyDown = (e) => {
      const key = e.key;
      const currentActive = ul.querySelector(`.${styles.active}`);

      if (key === 'ArrowDown' && currentActive.nextSibling) {
        currentActive.classList.remove(styles.active);
        currentActive.nextSibling.classList.add(styles.active);
      } else if (key === 'ArrowUp' && currentActive.previousSibling) {
        currentActive.classList.remove(styles.active);
        currentActive.previousSibling.classList.add(styles.active);
      } else if (key === 'Enter') {
        const selectedPage = currentActive.querySelector('a').getAttribute('href');
        router.push(selectedPage);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [router]);

  return (
    <div className={styles.main}>
      <div className={styles.scanlines}>
        <div className={styles.screen}>
          <canvas id="canvas" ref={canvasRef} className={styles.picture}></canvas>
          <div className={styles.overlay}>
            <div ref={textRef} className={styles.text}>
              <span>AV-1</span>
            </div>
            <div className={styles.menu}>
              <header>Main Menu</header>
              <ul ref={ulRef}>
                <li className={styles.active}><a href="/Tetris" title="">TETRIS</a></li>
                <li><a href="/Stick" title="">STICK</a></li>
              </ul>
              <footer>
                <div className={styles.key1}>Arrows to select</div>
                <div className={styles.key}>Exit: <span>1</span></div>
                <div className={styles.key}>Select: <span>2</span></div>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
