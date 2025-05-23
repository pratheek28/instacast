import React, { useEffect, useState } from "react";
import styles from "./login.module.css";
import { useNavigate, useLocation } from "react-router-dom";

function LogIn() {
  const [response, setResponse] = useState("");
  const navigate = useNavigate();
  let userType = "";
  let localStorageUser = null;
  try {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      localStorageUser = JSON.parse(storedUser);
    }
  } catch (e) {
    console.error("Error parsing localStorage user:", e);
  }

  let localStorageStudio = null;
  try {
    const storedStudio = localStorage.getItem("studioemail");
    if (storedStudio && storedStudio !== "undefined") {
      localStorageStudio = JSON.parse(storedStudio);
    }
  } catch (e) {
    console.error("Error parsing localStorage studio:", e);
  }

  useEffect(() => {
    if (localStorageUser) {
      navigate("/dash", { state: { user: localStorageUser } });
    } else if (localStorageStudio) {
      navigate("/sdashboard", { state: { user: localStorageStudio } });
    }
  }, []);

  const handleUserChange = (event) => {
    userType = event.target.value;
    console.log(userType);
    if (userType === "actor") {
      const actorInputField = document.getElementById("actorInputField");
      actorInputField.style.display = "block";

      const studioInputField = document.getElementById("studioInputField");
      studioInputField.style.display = "none";
    } else if (userType === "studio") {
      const actorInputField = document.getElementById("actorInputField");
      actorInputField.style.display = "none";

      const studioInputField = document.getElementById("studioInputField");
      studioInputField.style.display = "block";
    }
  };

  const [actorFormData, setActorFormData] = useState({
    email: "",
    password: "",
  });

  const [studioFormData, setStudioFormData] = useState({
    studioEmail: "",
    studioPassword: "",
  });

  const handleActorVarChange = (event) => {
    setActorFormData({
      ...actorFormData,
      [event.target.name]: event.target.value,
    });
  };

  const handleStudioVarChange = (event) => {
    setStudioFormData({
      ...studioFormData,
      [event.target.name]: event.target.value,
    });
  };

  const handleActorSubmit = (event) => {
    fetch("https://instacast.onrender.com/actorLogIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(actorFormData),
    })
      .then((response) => response.json())
      .then((data) => {
        setResponse(data.message);
        if (data.message.includes("Success")) {
          localStorage.setItem("user", JSON.stringify(data.user));
          navigate("/dash", { state: { user: data.user } });
        }
      });
  };

  const handleStudioSubmit = (event) => {
    fetch("https://instacast.onrender.com/studioLogIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(studioFormData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message.includes("Success")) {
          const localStorageMessage = {
            studioemail: data.studioemail,
            type: "studio",
          };
          localStorage.setItem(
            "studioemail",
            JSON.stringify(localStorageMessage),
          );
          navigate("/SDashboard", {
            state: { user: { studioemail: data.studioemail } },
          });
        }
      });
  };

  return (
    <div>
      <div>
        <button className={styles.back} onClick={() => navigate("/")} />
      </div>
      <div className={styles.container}>
        <div>
          <form className={styles.formcontainer}>
            <input
              type="radio"
              name="action"
              value="actor"
              onChange={handleUserChange}
            />
            <label for="actor">Actor</label>

            <input
              type="radio"
              name="action"
              value="studio"
              onChange={handleUserChange}
            />
            <label for="studio">Studio</label>
          </form>
        </div>

        <div className={styles.actorInputField} id="actorInputField">
          <div>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              onChange={handleActorVarChange}
            />
          </div>

          <div>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              onChange={handleActorVarChange}
            />
          </div>

          <div>
            <button
              type="submit"
              className={styles.submit}
              onClick={handleActorSubmit}
            >
              Submit
            </button>
          </div>
        </div>

        <div className={styles.studioInputField} id="studioInputField">
          <div>
            <input
              type="email"
              id="studioEmail"
              name="studioEmail"
              placeholder="Studio Email"
              onChange={handleStudioVarChange}
            />
          </div>

          <div>
            <input
              type="password"
              id="studioPassword"
              name="studioPassword"
              placeholder="Password"
              onChange={handleStudioVarChange}
            />
          </div>

          <div>
            <button
              type="submit"
              className={styles.submit}
              onClick={handleStudioSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LogIn;
