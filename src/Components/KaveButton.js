import React from 'react';
import styles from '../styles/KaveButton.module.css';
import localfont from 'next/font/local';
import '../app/globals.css'
import Link from 'next/link';


const nugget = localfont(
    {
        src: [
            {
                path: "../../public/fonts/Draco.otf"
            }
        ],
        variable: "--font-nugget",
    }
);

const KaveButton = () => {
    return (
        <div className={styles.main}><Link href="/Courses">
            <button className={`${styles['kave-btn']} ${nugget.className}`}>
                <span className={styles['kave-line']}></span>
                EXPLORE
            </button></Link>
        </div>
    );
};

export default KaveButton;
