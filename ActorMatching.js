import React, { useRef } from 'react';
import styles from './actormatching.module.css';

function ActorMatching() {
    const boxRef = useRef(null);

    const playAnimation = (animationName) => {
        if (boxRef.current) {
            console.log("Button is clicked:", animationName);
            boxRef.current.style.animation = 'none';

            requestAnimationFrame(() => {
                void boxRef.current.offsetWidth; // Trigger reflow
                boxRef.current.style.animation = `${animationName} 2.5s ease-in-out forwards`;
            });
        }
    };

    return (
        <div>
            <div className={styles.container}>
                <button
                    className={styles.dislike}
                    id="dislike"
                    name="dislike"
                    onClick={() => playAnimation('move-left')} // Attach onClick handler
                ></button>
                <button
                    className={styles.like}
                    id="like"
                    name="like"
                    onClick={() => playAnimation('move-right')} // Attach onClick handler
                ></button>
            </div>

            <div className={styles.tempBox} ref={boxRef}></div>
        </div>
    );
}

export default ActorMatching;
