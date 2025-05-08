import React, { useState, useEffect } from "react";
import styles from "./landing.module.css";
import { useNavigate } from "react-router-dom";

function Landing() {
  // need to handle login/signup button logic
  const navigate = useNavigate();
  useEffect(() => {
    document.body.className = "landing";
    return () => {
      document.body.className = ""; // cleanup when unmounting
    };
  }, []);

  const handleRedirectLogIn = (event) => {
    navigate("/logIn");
  };

  const handleRedirectSignUp = (event) => {
    navigate("/signUp");
  };

  return (
    <div className={styles.container}>
      <button className={styles.login} onClick={handleRedirectLogIn}>
        {" "}
      </button>
      <button className={styles.signup} onClick={handleRedirectSignUp}>
        {" "}
      </button>

      <div className={styles.box1}>
        <h2>What we do for ACTORS</h2>
        <p>
          Actor Dashboards: Actors can set up a profile, and our system
          automatically generates a resume for them - no stress.
        </p>
        <p>
          Tinder-style Applications: Actors can "like" roles they’re interested
          in, making applying super simple.
        </p>
        <p>
          Instant Responses: When a studio or casting manager likes an actor,
          they’ll get an email right away.
        </p>
      </div>

      <div className={styles.box2}>
        <h2>What we do for STUDIOS</h2>
        <p>
          Discover New Talent: Easily find actors using a swipe-based system,
          where you can "like" them for roles.
        </p>
        <p>
          Bring More Equity: Review applicants based on their profiles, making
          sure the process is fair and inclusive.
        </p>
        <p>
          Speed Up Communication: Get direct and instant communication between
          managers and actors - no more waiting around.
        </p>
      </div>
    </div>
  );
}

export default Landing;
