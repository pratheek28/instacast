import React, { useState } from 'react';
import styles from './ActorMatching.module.css';

function ActorMatching() {
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

export default ActorMatching;
