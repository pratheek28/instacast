import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./signup.module.css";



function SignUp() {
    const [response, setResponse] = useState("");
    const navigate = useNavigate();
    let userType = "";


    const[actorFormData, setActorFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phoneNum: -1,
        age: -1,
        gender: "",
        intro: "",
        location: "",
        pfp: "",
        genres: [],
        height: "",
        weight: ""
    })

    const[studioFormData, setStudioFormData] = useState ({
        studioName: "",
        personContact: "",
        roleOfPerson: "",
        studioPhoneNum: "",
        studioEmail: "",
        studioPass: ""
    })


    const handlePfpChange = (event) => {
        const selectedFile = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            const base64 = reader.result

            setActorFormData(prev => ({
                ...prev,
                pfp: base64
            }));
        };
        if (selectedFile) {
            reader.readAsDataURL(selectedFile); // Converts image blob to base64
        }
    };

    const handleGenreChange = (event) => {
        const {name, checked} = event.target;
        if (checked) {
            setActorFormData(prev => ({
                ...prev,
                genres: [...(prev.genres || []), name]
            }));
        }
    };

    const handleActorVarChange = (event) => {
        setActorFormData({
            ...actorFormData,
            [event.target.name]: event.target.value
        });
    };

    const handleActorSubmit = (event) => {
        event.preventDefault();
        fetch('https://instacast.onrender.com/actorSignUp', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(actorFormData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.message.includes("Success")) {
                navigate("/logIn");
            }
        });
    };




    const handleStudioVarChange = (event) => {
        setStudioFormData({
            ...studioFormData,
            [event.target.name]: event.target.value
        });
    };

    const handleStudioSubmit = (event) => {
        event.preventDefault();
        fetch('https://instacast.onrender.com/studioSignUp', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(studioFormData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.message.includes("Success")) {
                navigate("/logIn");
            }
        });
    };

    

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
                    <textarea id="intro" name="intro" onChange={handleActorVarChange} placeholder="Enter a short introduction for yourself"/>
                </div>

                <div>
                    <input type="text" id="location" name="location" onChange={handleActorVarChange} placeholder="Your City, Your State"/>
                </div>

                <div>
                    <label for="pfp">Upload a picture for your profile!</label>
                    <input type="file" id="pfp" name="pfp" onChange={handlePfpChange}/>
                </div>

                <div>
                    <input type="text" id="height" name="height" onChange={handleActorVarChange} placeholder="Height"/>
                </div>

                <div>
                    <input type="text" id="weight" name="weight" onChange={handleActorVarChange} placeholder="Weight (in lbs)" />
                </div>

                <h10>Genres you are interested in!</h10>

                <div>
                    <label for="horror">Horror:</label>
                    <input type="checkbox" name="horror" id="genres" onClick={handleGenreChange}/>

                    <label for="comedy">Comedy:</label>
                    <input type="checkbox" name="comedy" id="genres" onClick={handleGenreChange}/>

                    <label for="fiction">Fiction:</label>
                    <input type="checkbox" name="fiction" id="genres" onClick={handleGenreChange}/>

                    <label for="action">Action:</label>
                    <input type="checkbox" name="action" id="genres" onClick={handleGenreChange}/>

                    <label for="adventure">Adventure:</label>
                    <input type="checkbox" name="adventure" id="genres" onClick={handleGenreChange}/>

                    <label for="romance">Romance:</label>
                    <input type="checkbox" name="romance" id="genres" onClick={handleGenreChange}/>

                    <label for="thriller">Thriller:</label>
                    <input type="checkbox" name="thriller" id="genres" onClick={handleGenreChange}/>

                    <label for="musical">Musical:</label>
                    <input type="checkbox" name="musical" id="genres" onClick={handleGenreChange}/>

                    <label for="History">History:</label>
                    <input type="checkbox" name="history" id="genres" onClick={handleGenreChange}/>

                    <label for="fantasy">Fantasy:</label>
                    <input type="checkbox" name="fantasy" id="genres" onClick={handleGenreChange}/>
                    
                    <label for="documentary">Documentary:</label>
                    <input type="checkbox" name="documentary" id="genres" onClick={handleGenreChange}/>

                    <label for="mystery">Mystery:</label>
                    <input type="checkbox" name="mystery" id="genres" onClick={handleGenreChange}/>
                </div>

                <div>
                    <button type="submit" id="submit" name="submit" className={styles.submit} onClick={handleActorSubmit}>Submit! </button>
                </div>
            </div>


            <div className={styles.studioInputField} id="studioInputField">
                <form>
                    <div>
                        <input type="text" id="studioName" name="studioName" placeholder="Studio Name" onChange={handleStudioVarChange}/>
                    </div>

                    <div>
                        <input type="text" id="personContact" name="personContact" placeholder="Name of person managing the account" onChange={handleStudioVarChange}/>
                    </div>

                    <div>
                        <input type="text" id="roleOfPerson" name="roleOfPerson" placeholder="Your role in the studio" onChange={handleStudioVarChange}/>
                    </div>

                    <div>
                        <input type="number" id="studioPhoneNum" name="studioPhoneNum" placeholder="Phone Number" onChange={handleStudioVarChange}/>
                    </div>

                    <div>
                        <input type="email" id="studioEmail" name="studioEmail" placeholder="Studio Email" onChange={handleStudioVarChange}/>
                    </div>

                    <div>
                        <input type="password" id="studioPass" name="studioPass" placeholder="Enter your password" onChange={handleStudioVarChange}/>
                    </div>

                    <div>
                        <button type="submit" id="submit" name="submit" className={styles.submit} onClick={handleStudioSubmit}>Submit!</button>
                    </div>
                </form>
            </div>


        </div>
    )
}

export default SignUp