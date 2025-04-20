import React, { useState } from 'react';
import styles from './StudioMatching.module.css';

function StudioMatching() {
   const [swipeDirection, setSwipeDirection] = useState('');
   
    const handleSwipe = (direction) => {
        setSwipeDirection(direction);
   
        setTimeout(() => setSwipeDirection(''), 800);
    };
   
    return (
        <div>
            <div className={styles.container}>
                <button
                    className={styles.dislike}
                    onClick={() => handleSwipe('swipeLeft')}
                ></button>
                <button
                    className={styles.like}
                    onClick={() => handleSwipe('swipeRight')}
                ></button>
            </div>
   
            <div
                className={`${styles.tempBox} ${swipeDirection ? styles[swipeDirection] : ''}`}
            ></div>
        </div>
    );
}

export default StudioMatching;
