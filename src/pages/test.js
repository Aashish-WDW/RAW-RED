import React from 'react'
import styles from '../styles/Land.module.css';
import '../app/globals.css';

function test() {
  return (
    <div className={styles.body}>
      <div className={styles.sides}>
        <div className={styles.s1}></div>
        <div className={styles.s2}></div>
      </div>
      < div className={styles.main} ></div >
    </div>
  )
}

export default test