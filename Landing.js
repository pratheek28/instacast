import React, { useState } from 'react';
import styles from "./Landing.module.css";

function Landing() {
    // need to handle login/signup button logic 

    return (
        <div className={styles.container}>
            <button className={styles.login}> </button>
            <button className={styles.signup}> </button>

            <div className={styles.box1}>
                <h2>What we do for ACTORS</h2>
                <p>Actor Dashboards: Actors can set up a profile, and our system automatically generates a resume for them - no stress.</p>
                <p>Tinder-style Applications: Actors can "like" roles they’re interested in, making applying super simple.</p>
                <p>Instant Responses: When a studio or casting manager likes an actor, they’ll get an email right away.</p>
            </div>

            <div className={styles.box2}>
                <h2>What we do for STUDIOS</h2>
                <p>Discover New Talent: Easily find actors using a swipe-based system, where you can "like" them for roles.</p>
                <p>Bring More Equity: Review applicants based on their profiles, making sure the process is fair and inclusive.</p>
                <p>Speed Up Communication: Get direct and instant communication between managers and actors - no more waiting around.</p>
            </div>
        </div>
    )

}

export default Landing;
