import React, { useState } from 'react';
import styles from "./login.module.css";

function LogIn() {
    const [userType, setUserType] = useState("");
    const [actorFormData, setActorFormData] = useState({
        email: "",
        password: ""
    });

    const [studioFormData, setStudioFormData] = useState({
        studioEmail: "",
        studioPassword: ""
    });

    // Handle the user type change (actor or studio)
    const handleUserChange = (event) => {
        setUserType(event.target.value);
        console.log(userType);

        if (event.target.value === "actor") {
            document.getElementById("actorInputField").classList.add(styles.active);
            document.getElementById("studioInputField").classList.remove(styles.active);
        } else if (event.target.value === "studio") {
            document.getElementById("actorInputField").classList.remove(styles.active);
            document.getElementById("studioInputField").classList.add(styles.active);
        }
    };

    // Handle changes in actor form fields
    const handleActorVarChange = (event) => {
        setActorFormData({
            ...actorFormData,
            [event.target.name]: event.target.value
        });
    };

    // Handle changes in studio form fields
    const handleStudioVarChange = (event) => {
        setStudioFormData({
            ...studioFormData,
            [event.target.name]: event.target.value
        });
    };

    // Handle actor form submission
    const handleActorSubmit = (event) => {
        event.preventDefault();
        fetch("http://127.0.0.1:8000/actorLogIn", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(actorFormData)
        });
    };

    // Handle studio form submission
    const handleStudioSubmit = (event) => {
        event.preventDefault();
        fetch("http://127.0.0.1:8000/studioLogIn", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(studioFormData)
        });
    };

    return (
        <div className={styles.container}>
            <div>
                <form className={styles.formcontainer}>
                    <input 
                        type="radio" 
                        name="action" 
                        value="actor" 
                        onChange={handleUserChange} 
                    />
                    <label htmlFor="actor">Actor</label>

                    <input 
                        type="radio" 
                        name="action" 
                        value="studio" 
                        onChange={handleUserChange} 
                    />
                    <label htmlFor="studio">Studio</label>
                </form>
            </div>

            <div id="actorInputField" className={`${styles.actorInputField} ${userType === "actor" ? styles.active : ""}`}>
                <div>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Email" 
                        onChange={handleActorVarChange} 
                    />
                </div>

                <div>
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        onChange={handleActorVarChange} 
                    />
                </div>

                <div>
                    <button type="submit" onClick={handleActorSubmit}>Submit</button>
                </div>
            </div>

            <div id="studioInputField" className={`${styles.studioInputField} ${userType === "studio" ? styles.active : ""}`}>
                <div>
                    <input 
                        type="email" 
                        name="studioEmail" 
                        placeholder="Studio Email" 
                        onChange={handleStudioVarChange} 
                    />
                </div>

                <div>
                    <input 
                        type="password" 
                        name="studioPassword" 
                        placeholder="Password" 
                        onChange={handleStudioVarChange} 
                    />
                </div>

                <div>
                    <button type="submit" onClick={handleStudioSubmit}>Submit</button>
                </div>
            </div>
        </div>
    );
}

export default LogIn;
