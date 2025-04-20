import React from 'react';
import styles from './StudioMatching.module.css';

function StudioMatching() {
   return (
    <div>
        <div className={styles.container}>
            <button className={styles.dislike}> </button>
            <button className={styles.like}> </button>

            
        </div>
        <div>
            <button className={styles.dashboard}>  </button>
        </div>
    </div>


   )
}

export default StudioMatching;
