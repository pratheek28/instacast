import React from 'react';
import styles from './ActorMatching.module.css';

function ActorMatching() {
   return (
    <div>
        <div className={styles.container}>
            <button className={styles.dislike}> </button>
            <button className={styles.like}> </button>
        </div>
    </div>


   )
}

export default ActorMatching;
