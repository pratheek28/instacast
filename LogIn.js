import React, {useState} from 'react';
import styles from "./login.module.css"




function LogIn() {
    let userType = "";

    const handleUserChange = (event) => {
        userType = event.target.value;
        console.log(userType);
        if (userType === "actor") {
            const actorInputField = document.getElementById("actorInputField");
            actorInputField.style.display = "block";

            const studioInputField = document.getElementById("studioInputField");
            studioInputField.style.display = "none";
        }
        else if(userType === "studio") {
            const actorInputField = document.getElementById("actorInputField");
            actorInputField.style.display = "none";


            const studioInputField = document.getElementById("studioInputField");
            studioInputField.style.display = "block";
        }

    };

    const[actorFormData, setActorFormData] = useState({
        email: "",
        password: ""
    });

    const[studioFormData, setStudioFormData] = useState({
        studioEmail: "",
        studioPassword: ""
    });

    const handleActorVarChange = (event) => {
        setActorFormData({
            ...actorFormData,
            [event.target.name]: event.target.value
        });
    };

    const handleStudioVarChange = (event) => {
        setStudioFormData({
            ...studioFormData,
            [event.target.name]: event.target.value
        });
    };

    const handleActorSubmit = (event) => {
        fetch("http://127.0.0.1:8000/actorLogIn", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(actorFormData)
        });
    };

    const handleStudioSubmit = (event) => {
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
                    <input type="radio" name="action" value="actor" onChange={handleUserChange}/>
                    <label for="actor">Actor</label>

                    <input type="radio" name="action" value="studio" onChange={handleUserChange}/>
                    <label for="studio">Studio</label>
                </form>
            </div>

            <div className={styles.actorInputField} id="actorInputField">
                <div>
                    <input type="email" name="email" id="email" placeholder="Email" onChange={handleActorVarChange}/>
                </div>

                <div>
                    <input type="password" id="password" name="password" placeholder="Password" onChange={handleActorVarChange}/>
                </div>

                <div>
                    <button type="submit" onClick={handleActorSubmit}>Submit</button>
                </div>
            </div>

            <div className={styles.studioInputField} id="studioInputField">
                <div>
                    <input type="email" id="studioEmail" name="studioEmail" placeholder="Studio Email" onChange={handleStudioVarChange}/>
                </div>

                <div>
                    <input type="password" id="studioPassword" name="studioPassword" placeholder="Password" onChange={handleStudioVarChange}/>
                </div>

                <div>
                    <button type="submit" onClick={handleStudioSubmit}>Submit</button>
                </div>
            </div>

        </div>
    )
}
export default LogIn;