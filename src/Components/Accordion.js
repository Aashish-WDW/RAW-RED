import React, { useState } from 'react';
import styles from '../styles/Accordion.module.css';

const Accordion = ({ title, content }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={styles.accordion}>
            <div className={styles.accordionHeader} onClick={toggleAccordion}>
                <div>{title}</div>
                <div className={isOpen ? styles.iconOpen : styles.iconClosed}>+</div>
            </div>
            {isOpen && <div className={styles.accordionContent}>{content}</div>}
        </div>
    );
};

export default Accordion;
