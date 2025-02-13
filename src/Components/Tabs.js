import { useState } from 'react';
import styles from '../styles/Tabs.module.css'; 
import Beginner from './Beginner';
import Moderate from './Moderate';

const Tabs = () => {
    const [activeTab, setActiveTab] = useState('beginner'); 

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className={styles.main}>
            <h1 className={styles.h1}>LEARN HTML THE GAMER WAY!</h1>
            <div className={styles.tabsContainer}>
                <div className={styles.tabButtons}>
                    <button
                        className={`${styles.tabButton} ${activeTab === 'beginner' ? styles.active : ''}`}
                        onClick={() => handleTabClick('beginner')}
                    >
                        Beginner
                    </button>
                    <button
                        className={`${styles.tabButton} ${activeTab === 'moderate' ? styles.active : ''}`}
                        onClick={() => handleTabClick('moderate')}
                    >
                        Moderate
                    </button>
                    <button
                        className={`${styles.tabButton} ${activeTab === 'advanced' ? styles.active : ''}`}
                        onClick={() => handleTabClick('advanced')}
                    >
                        Advanced
                    </button>
                </div>
                <div className={styles.tabContent}>
                    {activeTab === 'beginner' && (
                        <div>
                            <h2>Beginner Content</h2>
                            <p>Topics on this page</p>
                            <Beginner/>
                        </div>
                    )}
                    {activeTab === 'moderate' && (
                        <div>
                            <h2>Moderate Content</h2>
                            <p>Topics on this page</p>
                            <Moderate/>
                        </div>
                    )}
                    {activeTab === 'advanced' && (
                        <div>
                            <h2>Advanced Content</h2>
                            <p>Topics on this page</p>
                            <Beginner/>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Tabs;
