import React, {useState} from 'react';
import styles from "./signup.module.css";

function SignUp() {
    let userType = "";
    const[base64String, setBase64String] = useState("");

    const[actorFormData, setActorFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phoneNum: "",
        age: -1,
        gender: "",
        intro: "",
        location: "",
        pfp: base64String,
        genres: null
    })


    const handlePfpChange = (event) => {
        const selectedFile = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setBase64String(reader.result); 
            console.log(base64String);
            setActorFormData(prev => ({
                ...prev,
                pfp: base64String
            }));
        };
        if (selectedFile) {
            reader.readAsDataURL(selectedFile); // Converts image blob to base64
        }
    }

    const handleActorVarChange = (event) => {
        setActorFormData({
            ...actorFormData,
            [event.target.name]: [event.target.value]
        });
        console.log(event.target.value);
    };

    const handleActorSubmit = (event) => {
        fetch('http://127.0.0.1:8000/signUp', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(actorFormData)
        })
    };

    const handleUserChange = (event) => {
        userType = event.target.value;
        console.log(userType);
        if (userType == "actor") {
            const actorInputField = document.getElementById("actorInputField");
            actorInputField.style.display = "block";

            const studioInputField = document.getElementById("studioInputField");
            studioInputField.style.display = "none";
        }
        else if(userType == "studio") {
            const actorInputField = document.getElementById("actorInputField");
            actorInputField.style.display = "none";


            const studioInputField = document.getElementById("studioInputField");
            studioInputField.style.display = "block";
        }

    };

    return (
        <div className={styles.container}>
            {/* Choose the type of user */}
            <div>
                <form className={styles.formcontainer}>
                    <input type="radio" name="action" value="actor" onChange={handleUserChange}/>
                    <label for="actor">Actor</label>

                    <input type="radio" name="action" value="studio" onChange={handleUserChange}/>
                    <label for="studio">Studio</label>
                </form>
            </div>

            {/* Display the correct input field, based on the input */}

            <div className={styles.actorInputField} id="actorInputField">
                <div>
                    <input type="text" id="firstName" name="firstName" onChange={handleActorVarChange} placeholder="First Name"/>
                </div>

                <div>
                    <input type="text" id="lastName" name="lastName" onChange={handleActorVarChange} placeholder="Last Name"/>
                </div>

                <div>
                    <input type="email" id="email" name="email" onChange={handleActorVarChange} placeholder="Email"/>
                </div>

                <div>
                    <input type="password" id="password" name="password" onChange={handleActorVarChange} placeholder="Password"/>
                </div>

                <div>
                    <input type="number" id="phoneNum" name="phoneNum" onChange={handleActorVarChange} placeholder="Phone Number"/>
                </div>

                <div>
                    <input type="number" id="age" name="age" onChange={handleActorVarChange} placeholder="Enter your age"/>
                </div>

                <div>
                    <input type="text" id="gender" name="gender" onChange={handleActorVarChange} placeholder="Enter your gender"/>
                </div>

                <div>
                    <input type="text" id="intro" name="intro" onChange={handleActorVarChange} placeholder="Enter a short introduction for yourself"/>
                </div>

                <div>
                    <input type="text" id="location" name="location" onChange={handleActorVarChange} placeholder="Your City, Your State"/>
                </div>

                <div>
                    <label for="pfp">Upload a picture for your profile!</label>
                    <input type="file" id="pfp" name="pfp" onClick={handlePfpChange}/>
                </div>

                <h10>Genres you are interested in!</h10>

                <div>
                    <label for="horror">Horror:</label>
                    <input type="checkbox" name="horror" id="horror" />

                    <label for="comedy">Comedy:</label>
                    <input type="checkbox" name="comedy" id="comedy" />

                    <label for="fiction">Fiction:</label>
                    <input type="checkbox" name="fiction" id="fiction" />

                    <label for="action">Action:</label>
                    <input type="checkbox" name="action" id="action" />

                    <label for="adventure">Adventure:</label>
                    <input type="checkbox" name="adventure" id="adventure" />

                    <label for="romance">Romance:</label>
                    <input type="checkbox" name="romance" id="romance" />

                    <label for="thriller">Thriller:</label>
                    <input type="checkbox" name="thriller" id="thriller" />

                    <label for="musical">Musical:</label>
                    <input type="checkbox" name="musical" id="musical" />

                    <label for="History">History:</label>
                    <input type="checkbox" name="history" id="history" />

                    <label for="fantasy">Fantasy:</label>
                    <input type="checkbox" name="fantasy" id="fantasy" />
                    
                    <label for="documentary">Documentary:</label>
                    <input type="checkbox" name="documentary" id="documentary" />

                    <label for="mystery">Mystery:</label>
                    <input type="checkbox" name="mystery" id="mystery"/>
                </div>

                <div>
                    <button type="submit" onClick={handleActorSubmit}>Submit! </button>
                </div>
            </div>


            <div className={styles.studioInputField} id="studioInputField">
                <div>
                    <input type="text" id="studioName" name="studioName" placeholder="Studio Name"/>
                </div>

                <div>
                    <input type="text" id="personContact" name="personContact" placeholder="Name of person managing the account"/>
                </div>

                <div>
                    <input type="text" id="roleOfPerson" name="roleOfPerson" placeholder="Your role in the studio"/>
                </div>

                <div>
                    <input type="number" id="studioPhoneNum" name="studioPhoneNum" placeholder="Phone Number"/>
                </div>

                <div>
                    <input type="email" id="stdioEmail" name="studioEmail" placeholder="Studio Email"/>
                </div>

                <div>
                    <input type="password" id="studioPass" name="studioPass" placeholder="123-456-7890"/>
                </div>

                {/*change TO STUDIO submit button logic here*/}
                <div>
                    <button type="submit" onClick={handleActorSubmit}>Submit! </button>
                </div>
            </div>


        </div>
    )
}

export default SignUp
