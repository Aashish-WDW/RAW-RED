import React from 'react'
import Navbar from '@/Components/Navbar'
import Tabs from '@/Components/Tabs'
import Accordion from '@/Components/Accordion'
import styles from '../styles/Accordion.module.css';
import Quiz from '@/Components/Quiz';


function Courses() {
    return (
        <div className={styles.main}>
            <Navbar />
            <div className={styles.accor}>
                <Tabs />
                <Accordion
                    title="Introduction to HTML5 Semantics"
                    content="HTML5 semantics introduces specific tags like <header>, <nav>, <section>, <article>, <aside>, <footer>, and <main> designed to provide clearer structure and meaning to web content. These tags enhance accessibility, improve SEO, and make code more readable by defining distinct sections of a webpage. By using semantic HTML, developers can create websites that are easier to navigate, understand, and maintain, ensuring a better user experience across various devices and platforms."
                />
            </div>
            <h1>Ready to test your HTML knowledge? Complete the quiz below to begin your adventure!</h1>
            <Quiz/>
        </div>
    )
}

export default Courses