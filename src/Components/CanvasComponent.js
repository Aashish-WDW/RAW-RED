import { useEffect, useRef } from 'react';
import styles from '../styles/Home.module.css';

const CanvasComponent = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const snow = () => {
            const w = canvas.width;
            const h = canvas.height;
            const d = ctx.createImageData(w, h);
            const b = new Uint32Array(d.data.buffer);
            const len = b.length;

            for (let i = 0; i < len; i++) {
                b[i] = ((255 * Math.random()) | 0) << 24;
            }

            ctx.putImageData(d, 0, 0);
        };

        const animate = () => {
            snow();
            requestAnimationFrame(animate);
        };

        canvas.width = window.innerWidth / 3;
        canvas.height = (window.innerWidth * 0.5625) / 3;
        animate();

        return () => cancelAnimationFrame(animate);
    }, []);

    return <canvas ref={canvasRef} id="canvas" className={styles.picture}></canvas>;
};

export default CanvasComponent;
