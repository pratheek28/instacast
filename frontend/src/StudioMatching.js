import React, { useEffect, useRef, useState } from "react";
import styles from "./studiomatching.module.css";
import { useLocation, useNavigate } from "react-router-dom";

function StudioMatching() {
  const location = useLocation();
  const navigate = useNavigate();

  const localStorageUser = JSON.parse(localStorage.getItem("studioemail"));
  const data2 = location.state?.data2;

  const [firstname, setFirstName] = useState([]);
  const [lastname, setLastName] = useState([]);
  const [actorgender, setActorGender] = useState([]);
  const [actorage, setActorAge] = useState([]);
  const [actorheight, setActorHeight] = useState([]);
  const [actorweight, setActorWeight] = useState([]);
  const [actorintro, setActorIntro] = useState([]);
  const [actorgenres, setActorGenres] = useState([]);
  const [actorpfp, setActorPfp] = useState([]);
  const [moviename, setMoviename] = useState([]);
  const [rolename, setRolename] = useState([]);
  const [actorlocation, setActorLocation] = useState([]);
  const [actornum, setActorNum] = useState([]);
  const [actoremail, setActoremail] = useState([]);
  const [studioname, setstudioname] = useState([]);
  const [studioemail, setstudioemail] = useState([]);

  const [i, setIteration] = useState(0);

  const [swipeDirection, setSwipeDirection] = useState("");

  const handleSwipe = (direction) => {
    setSwipeDirection(direction);

    setTimeout(() => setSwipeDirection(""), 800);
    afterTime();
    if (direction === "swipeRight") {
      // console.log(data2.email);
      // console.log(movietitle);
      // console.log(rolename);
      // console.log(studioemail);
      // console.log(studioname);
      updateDb(1); //changethissss
    }
    if (direction === "swipeLeft") {
      // console.log(data2.email);
      // console.log(movietitle);
      // console.log(rolename);
      // console.log(studioemail);
      // console.log(studioname);
      updateDb(0); //changethissss
    }
  };
  function afterTime() {
    setTimeout(() => setIteration(i + 1), 800);
  }

  const updateDb = (flag) => {
    const status = flag === 1 ? "Accepted" : "Rejected";
    if (flag === 1) {
      const response = {
        status: "Accepted",
        actoremail: actoremail[i],
        rolename: rolename[i],
      };
      fetch("https://instacast.onrender.com/updateMatchDb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(response),
      });
    } else {
      const response = {
        status: "Rejected",
        actoremail: actoremail[i],
        rolename: rolename[i],
      };
      fetch("https://instacast.onrender.com/updateMatchDb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(response),
      });
    }

    const emailData = {
      email: actoremail[i], //replace with actor email
      studioemail: studioemail[i],
      role: rolename[i],
      movie: moviename[i],
      studio: studioname[i],
      name: firstname[i],
      status: status,
    };

    const handleSubmit2 = () => {
      fetch("https://instacast.onrender.com/sendEmailDec", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData), // Send data as an object with topic
      })
        .then((response) => response.json())
        .then((data) => {})
        .catch((error) => {
          console.error("Error:", error);
        });
    };

    handleSubmit2(); // Submit the data to the backend
  };

  useEffect(() => {
    if (!data2 && !localStorageUser) {
      return navigate("/");
    }
    console.log("Data2: ", data2);
    const handleSubmit = () => {
      fetch("https://instacast.onrender.com/getSwipedActors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data2),
      })
        .then((response) => response.json())
        .then((data) => {
          const firstname = data.map((role) => role.firstName);
          const lastname = data.map((role) => role.lastName);
          const actorgender = data.map((role) => role.actorGender);
          const actorage = data.map((role) => role.actorAge);
          const actorheight = data.map((role) => role.actorHeight);
          const actorweight = data.map((role) => role.actorWeight);
          const actorintro = data.map((role) => role.actorIntro);
          const actorgenres = data.map((role) => role.actorGenres);
          const actorpfp = data.map((role) => role.actorPfp);
          const moviename = data.map((role) => role.moviename);
          const rolename = data.map((role) => role.rolename);
          const actorlocation = data.map((role) => role.actorlocation);
          const actornum = data.map((role) => role.actornum);
          const actoremail = data.map((role) => role.actoremail);
          const studio = data.map((role) => role.studioname);
          const semail = data.map((role) => role.studioemail);

          setFirstName(firstname);
          setLastName(lastname);
          setActorGender(actorgender);
          setActorAge(actorage);
          setActorHeight(actorheight);
          setActorWeight(actorweight);
          setActorIntro(actorintro);
          setActorGenres(actorgenres);
          setActorPfp(actorpfp);
          setMoviename(moviename);
          setRolename(rolename);
          setActorLocation(actorlocation);
          setActorNum(actornum);
          setActoremail(actoremail);
          setstudioname(studio);
          setstudioemail(semail);
        });
    };
    handleSubmit();
  }, []);

  const [resumeData, setResumeData] = useState(null);

  useEffect(() => {}, []);

  return (
    <div>
      <div>
        <button
          className={styles.back}
          onClick={() => navigate("/sdashboard")}
        />
      </div>
      <div className={styles.container}>
        <button
          className={styles.dislike}
          onClick={() => handleSwipe("swipeLeft")} // Attach onClick handler
        ></button>
        <button
          className={styles.like}
          onClick={() => handleSwipe("swipeRight")} // Attach onClick handler
        ></button>
      </div>

      {i < firstname.length ? (
        <div
          className={`${styles.tempBox} ${swipeDirection ? styles[swipeDirection] : ""}`}
        >
          <div>
            <div style={{ display: "flex", gap: "24px", marginTop: "25px" }}>
              <img
                src={actorpfp[i]}
                alt="Headshot"
                style={{
                  width: "160px",
                  height: "160px",
                  objectFit: "cover",
                  borderRadius: "50%", // Makes it circular
                  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                }}
              />
              <div>
                <h1
                  style={{
                    fontSize: "28px",
                    fontWeight: "bold",
                    marginBottom: "4px",
                  }}
                >
                  {firstname[i] + " " + lastname[i]}
                </h1>
                <p style={{ fontSize: "14px", color: "#555" }}>
                  ({actorgender[i]}, {actorage[i]}yo)
                </p>
                <p
                  style={{
                    color: "#444",
                    marginBottom: "4px",
                    fontSize: "15px",
                  }}
                >
                  📧 {actoremail[i]}
                </p>
                <p
                  style={{
                    color: "#444",
                    marginBottom: "4px",
                    fontSize: "15px",
                  }}
                >
                  📞 {actornum[i]}
                </p>
                <p style={{ fontSize: "14px", color: "#666" }}>
                  Height: {actorheight[i]} | Weight: {actorweight[i]}
                </p>
              </div>
            </div>

            <div style={{ marginTop: "24px" }}>
              <h2
                style={{
                  fontSize: "25px",
                  fontWeight: "700",
                  marginBottom: "2px",
                }}
              >
                {moviename[i]} - {rolename[i]}
              </h2>
              <p
                style={{ fontSize: "14px", color: "#333", marginTop: "0" }}
              ></p>
            </div>

            <div style={{ marginTop: "24px" }}>
              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  marginBottom: "12px",
                }}
              >
                Intro
              </h2>
              <p style={{ fontSize: "14px", color: "#333" }}>{actorintro[i]}</p>
            </div>

            <div style={{ marginTop: "24px" }}>
              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  marginBottom: "12px",
                }}
              >
                Interests
              </h2>

              {/* Center aligned text */}
              <p
                style={{ fontSize: "14px", color: "#333", textAlign: "center" }}
              >
                {Array.isArray(actorgenres[i])
                  ? actorgenres[i].join(", ")
                  : "Nothing Left"}
              </p>
            </div>

            <div style={{ marginTop: "24px" }}>
              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  marginBottom: "12px",
                }}
              >
                Location
              </h2>
              <p style={{ fontSize: "14px", color: "#333" }}>
                {actorlocation[i]}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "bold" }}>
            🎉 Matches Over!
          </h1>
          <p style={{ fontSize: "18px", color: "#555" }}>
            You’ve reviewed all potential matches.
          </p>
        </div>
      )}
    </div>
  );
}

export default StudioMatching;
