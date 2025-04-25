import React, { useRef, useState, useEffect } from 'react';
import './center.css';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ResumeModal from './resume';
import { useLocation, useNavigate } from 'react-router-dom';

const DashBoard = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const user = location.state?.user;
  const [showResume, setShowResume] = useState(false); // <-- this controls the popup
  const [Name, setName] = useState('No Name');
  const [Contact, setEmail] = useState('NA');
  const [Height, setHeight] = useState('NA');
  const [Weight, setWeight] = useState('NA');
  const [Headshot, setpfp] = useState('NA');
  const [Genres, setGenres] = useState([]);
  const [Location, setLocation] = useState('NA');
  const [Number, setNumber] = useState('NA');
  const [Gender, setGender] = useState('NA');
  const [Age, setAge] = useState('NA');
  const [Intro, setIntro] = useState('NA');

  const [roles, setRoles] = useState([]);
  const [movie, setMovie] = useState([]);
  const [studio, setStudio] = useState([]);
  const [status, setStatus] = useState([]);

  const data = '';

  const data2 = {
    email: user.email,
  };

  useEffect(() => {
    

    const handleSubmit = () => {
      fetch('https://instacast.onrender.com/getActorDash', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data2), // Send data as an object with topic
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          console.log('data location:', data.location);
          setName(data.name);
          setpfp(data.pfp);
          setGenres(data.genres);
          setLocation(data.location);
          setNumber(data.phone);
          setGender(data.gender);
          setAge(data.age);
          setIntro(data.intro);
          setEmail(data.email);
          setWeight(data.weight);
          setHeight(data.height);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    };

    handleSubmit(); // Submit the data to the backend

    
    const handleSubmit2 = () => {
      fetch('https://instacast.onrender.com/getActorRoles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data2), // Send data as an object with topic
      })
        .then((response) => response.json())
        .then((data) => {
          // Separate each field from the list of role objects
          const Role = data.map((match) => match.role);
          const Movie = data.map((match) => match.movie);
          const Studio = data.map((match) => match.studio);
          const Status = data.map((match) => match.status);

          // Set them into their respective state arrays
          setRoles(Role);
          setMovie(Movie);
          setStudio(Studio);
          setStatus(Status);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    };

    handleSubmit2(); // Submit the data to the backend
  }, []);

  const openResume = () => {
    setShowResume(true);
  };

  const resumeData = {
    name: Name,
    contact: Contact,
    height: Height,
    weight: Weight,
    headshot: Headshot,

    genres: Genres,
    location: Location,
    number: Number,
    gender: Gender,
    age: Age,
    intro: Intro,
  };

  const handleRedirectMatch = (event) => {
    navigate("/ActorMatching", {state: {data2: data2}});
  };


  return (
    <div>
    
      <div className="middle-box">
        {/* Top Half: 50% height */}
        <div
          style={{
            flex: 1,
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            //borderBottom: '1px solid rgba(255,255,255,0.3)',
          }}
        >
          {/* Left Text */}
          <div
            style={{
              flex: 1,
              textAlign: 'center',
              color: 'black',
              flexDirection: 'columnn',
            }}
          >
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)', // Light background for text box
                padding: '8px',
                borderRadius: '8px',
                marginBottom: '12px', // Space between the boxes
                marginLeft: '100px',
                gap: '10px',
                flexDirection: 'column',
                width: '65%',
                textAlign: 'center',
                display: 'flex',
              }}
            >
              <div>
                <b>Email: </b>
                {Contact}
              </div>
              <div>
                <b>
                  <u>Interests</u>
                </b>
              </div>
              <div
                style={{
                  flex: 1,
                  width: '100%',
                  flexWrap: 'wrap', // 👈 allow wrapping
                  display: 'flex',
                  //justifyContent: 'space-evenly',
                  alignItems: 'left',
                  padding: '5px',
                  gap: '5px',
                  overflowY: 'auto', // optional scroll if they exceed vertically
                  maxHeight: '100px', // 👈 limit the vertical height here
                }}
              >
                {Array.from(Genres).map((genre, i) => (
                  <div
                    key={i}
                    style={{
                      background: 'rgba(17, 49, 230, 0.5)', // Semi-transparent
                      width: '100px',
                      height: '3px',
                      borderRadius: '5px',
                      color: 'black',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      padding: '10px',
                      marginBottom: '8px', // spacing between bars
                    }}
                  >
                    {genre}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Center Image */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <img
              src={Headshot}
              alt="User Profile"
              style={{
                height: '200px',
                width: '200px',
                borderRadius: '50%',
                objectFit: 'cover',
              }}
            />
            <h2>
              <b>{Name}</b>
            </h2>
          </div>

          {/* Right Text */}
          <div style={{ flex: 1, textAlign: 'center', color: 'black' }}>
            <button
              onClick={() => openResume()}
              style={{
                background: 'linear-gradient(to right, #764ba2, #e84a5f)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 20px',
                fontSize: '16px',
                cursor: 'pointer',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.3)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
              }}
            >
              View Resume
            </button>{' '}
          </div>
        </div>
        {/* Resume Modal */}
        <ResumeModal
          show={showResume}
          onClose={() => setShowResume(false)}
          resumeData={resumeData}
        />

        {/* Bottom Half: 50% height */}
        <div
          style={{
            flex: 1,
            width: '100%',
            flexWrap: 'wrap', // 👈 allow wrapping
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'left',
            padding: '24px',
            gap: '24px',
            overflowY: 'auto', // optional scroll if they exceed vertically
          }}
        >
          {roles.length === 0 ? (
            <div
              style={{ textAlign: 'center', color: 'white', fontSize: '16px' }}
            >
              <b>Start by Swiping in the Matching System!</b>
            </div>
          ) : (
            Array.from(roles).map((iroles, i) => (
              <div
                key={i}
                style={{
                  background:
                    'linear-gradient(135deg,rgb(238, 89, 131), #764ba2)',
                  width: '210px',
                  height: '297px',
                  borderRadius: '12px',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  justifyContent: 'space-evenly',
                  padding: '10px',
                }}
              >
                <div
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Light background for text box
                    padding: '8px',
                    borderRadius: '8px',
                    marginBottom: '12px', // Space between the boxes
                    width: '90%',
                    textAlign: 'center',
                  }}
                >
                  <b>{iroles}</b>
                </div>
                <div
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    padding: '8px',
                    borderRadius: '8px',
                    marginBottom: '12px',
                    width: '90%',
                    textAlign: 'center',
                  }}
                >
                  <b>Movie: </b>
                  {movie[i]}
                </div>
                <div
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    padding: '8px',
                    borderRadius: '8px',
                    marginBottom: '12px',
                    width: '90%',
                    textAlign: 'center',
                  }}
                >
                  <b>Studio: </b>
                  {studio[i]}
                </div>
                <div
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    padding: '8px',
                    borderRadius: '8px',
                    textAlign: 'center',
                    width: '90%',
                  }}
                >
                  <b>Status: </b> {status[i]}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div>
        <button className="renderMatching" onClick={handleRedirectMatch}>Click Me!</button>
      </div>
    </div>
  );
};

export default DashBoard;