import React, { useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './actormatching.module.css';

function ActorMatching() {
  const location = useLocation();

  const [swipeDirection, setSwipeDirection] = useState('');

  const data2 = location.state?.data2;

  const [id, setId] = useState([]);
  const [moviegenres, setMoviegenres] = useState([]);
  const [movieplot, setMovieplot] = useState([]);
  const [movietitle, setMovietitle] = useState([]);
  const [roleage, setRoleage] = useState([]);
  const [rolegender, setRolegender] = useState([]);
  const [rolename, setRolename] = useState([]);
  const [studioemail, setStudioemail] = useState([]);
  const [studioid, setStudioid] = useState([]);
  const [studioname, setStudioName] = useState([]);

  const [i,setIteration]=useState(0);


  useEffect(() => {
    const handleSubmit = () => {
      fetch('https://instacast.onrender.com/getRecommended', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data2),
      })
        .then((response) => response.json())
        .then((data) => {
          const id = data.map((role) => role.id);
          const moviegenres = data.map((role) => role.moviegenres);
          const movieplot = data.map((role) => role.movieplot);
          const movietitle = data.map((role) => role.movietitle);
          const roleage = data.map((role) => role.roleage);
          const rolegender = data.map((role) => role.rolegender);
          const rolename = data.map((role) => role.rolename);
          const studioemail = data.map((role) => role.studioemail);
          const studioid = data.map((role) => role.studioid);
          const studioName = data.map((role) => role.studioname);

          setId(id);
          setMoviegenres(moviegenres);
          setMovieplot(movieplot);
          setMovietitle(movietitle);
          setRoleage(roleage);
          setRolegender(rolegender);
          setRolename(rolename);
          setStudioemail(studioemail);
          setStudioid(studioid);
          setStudioName(studioName)
        });
    };

    handleSubmit();
  }, []);

  const handleSwipe = (direction) => {
    setSwipeDirection(direction);
    setTimeout(() => setSwipeDirection(''), 800);
    afterTime();
    if (direction === "swipeRight") {
      console.log(data2.email);
      console.log(movietitle);
      console.log(rolename);
      console.log(studioemail);
      console.log(studioname);
      insertIntoDb()
    }
  };

  const insertIntoDb = () => {
    const result = {
      email: data2.email,
      moviename: movietitle[i],
      rolename: rolename[i],
      status: "pending",
      studioemail: studioemail[i],  // ✅ corrected
      studioname: studioname[i]
    }
    fetch("https://instacast.onrender.com/insertActorRightSwipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(result)
    })

    const emailData = {
      email: data2.email, //replace with actor email
      studioemail: studioemail[i],
      role: rolename[i],
      movie: movietitle[i],
      studio: studioname[i],
      name: "User's Name",
      status: "pending",

    };

    const handleSubmit2 = () => {
      fetch('https://instacast.onrender.com/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData), // Send data as an object with topic
      })
        .then((response) => response.json())
        .then((data) => {})
        .catch((error) => {
          console.error('Error:', error);
        });
    };

    handleSubmit2(); // Submit the data to the backend
  };

  function afterTime(){
    setTimeout(() => setIteration(i+1), 800);
  }

  return (
    <div>
      <div className={styles.container}>
        <button
          className={styles.dislike}
          id="dislike"
          name="dislike"
          onClick={() => handleSwipe('swipeLeft')} // Attach onClick handler
        ></button>
        <button
          className={styles.like}
          id="like"
          name="like"
          onClick={() => handleSwipe('swipeRight')} // Attach onClick handler
        ></button>
      </div>

      <div className={`${styles.tempBox} ${swipeDirection ? styles[swipeDirection] : ''}`} >
        <div>
          <div style={{ gap: '24px', marginTop: '25px' }}>
            <div>
              <h1
                style={{
                  fontSize: '28px',
                  fontWeight: 'bold',
                  marginBottom: '4px',
                }}
              >
                <b>{rolename[i]}</b>
              </h1>

              <p
                style={{ color: '#444', marginBottom: '4px', fontSize: '15px' }}
              >
                <b>Age Range: </b>{roleage[i]}
              </p>
              <p
                style={{ color: '#444', marginBottom: '4px', fontSize: '15px' }}
              >
                <b>Gender: </b>{rolegender[i]}
              </p>
            </div>
          </div>

          <div style={{ marginTop: '24px' }}>
            <h1
              style={{
                fontSize: '22px',
                fontWeight: '750',
                marginBottom: '4px', // reduce spacing
              }}
            >
              {movietitle[i]}
            </h1>
            <p style={{ fontSize: '14px', color: '#333', marginTop: '0' }}>
              Working Title
            </p>
          </div>

          <div style={{ marginTop: '40px' }}>
            <h1
              style={{
                fontSize: '22px',
                fontWeight: '750',
                marginBottom: '4px', // reduce spacing
              }}
            >
              {studioname[i]}
            </h1>
            <p style={{ fontSize: '14px', color: '#333', marginTop: '0' }}>
              Studio
            </p>
          </div>

          <div style={{ marginTop: '40px' }}>
            <h1
              style={{
                fontSize: '20px',
                fontWeight: '500',
                marginBottom: '4px', // reduce spacing
              }}
            >
              Description
            </h1>
            <p style={{ fontSize: '14px', color: '#333', marginTop: '0' }}>
              {movieplot[i]}
            </p>
          </div>

          <div style={{ marginTop: '40px' }}>
            <h2
              style={{
                fontSize: '18px',
                fontWeight: '600',
                marginBottom: '12px',
              }}
            >
              Genres
            </h2>

            {/* Center aligned text */}
            <p style={{ fontSize: '14px', color: '#333', textAlign: 'center' }}>
            {Array.isArray(moviegenres[i]) ? moviegenres[i].join(', ') : "Loading..."}
              {/* You can edit this accordingly but I'll leave it for now */}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActorMatching;
