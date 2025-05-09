import React, { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./center.css";
import $ from "jquery";

const SDashBoard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const user = location.state?.user;
  const localStorageUser = JSON.parse(localStorage.getItem("studioemail"));

  const [movie, setMovie] = useState([]);
  const [role, setRole] = useState([]);
  const [gender, setGender] = useState([]);
  const [age, setAgerange] = useState([]);
  const [plot, setPlot] = useState([]);
  const [genres, setGenres] = useState([]);

  const [email, setEmail] = useState("NA");
  const [manager, setManager] = useState("NA");
  const [number, setNumber] = useState("NA");
  const [studio, setStudio] = useState("NA");
  const [studioID, setStudioID] = useState("NA");

  const data = "";
  const data2 = {
    email: user?.studioemail || localStorageUser?.studioemail || "N/A",
  };

  useEffect(() => {
    if (!user && !localStorageUser) {
      return navigate("/");
    }

    const handleSubmit = () => {
      fetch("https://instacast.onrender.com/getStudioDash", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data2), // Send data as an object with topic
      })
        .then((response) => response.json())
        .then((data) => {
          setEmail(data.email);
          setManager(data.manager);
          setNumber(data.number);
          setStudio(data.studioname);
          setStudioID(data.uid);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };

    handleSubmit(); // Submit the data to the backend

    const handleSubmit2 = () => {
      fetch("https://instacast.onrender.com/getRoles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data2), // Send data as an object with topic
      })
        .then((response) => response.json())
        .then((data) => {
          // Separate each field from the list of role objects
          const movieTitles = data.map((role) => role.movietitle);
          const roles = data.map((role) => role.role);
          const genders = data.map((role) => role.gender);
          const ages = data.map((role) => role.roleage);
          const plots = data.map((role) => role.movieplot);
          const genresList = data.map((role) => role.moviegenres);

          // Set them into their respective state arrays
          setMovie(movieTitles);
          setRole(roles);
          setGender(genders);
          setAgerange(ages);
          setPlot(plots);
          setGenres(genresList);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };

    handleSubmit2(); // Submit the data to the backend
  }, []);

  const createRole = () => {
    if ($("#createRoleModal").length) {
      $("#createRoleModal").fadeIn();
      return;
    }

    const modalHtml = `
          <div id="createRoleModal" style="
            display: none;
            position: fixed;
            z-index: 999;
            left: 0;
            top: -50px;
            width: 100%;
            height: 200%;
            background: rgba(219, 100, 183, 0.5);
          ">
            <div style="
              background: rgba(50, 162, 168);
              padding: 20px;
              border-radius: 10px;
              width: 500px;
              margin: 100px auto;
              position: relative;
              box-shadow: 0px 0px 10px #444;
            ">
              <button class="closeRoleBtn" style="
                position: absolute;
                right: 10px;
                top: 10px;
                background: none;
                border: none;
                font-size: 18px;
                cursor: pointer;
                color: #888;
              ">&times;</button>
              <div style="text-align: center;">
              <h2>Create Movie Role</h2>
              </div>
              <form id="roleForm">
<div style="margin-bottom: 10px;">
  <div style="margin-bottom: 5px; font-weight: bold;">Movie Name</div>
  <input
    type="text"
    name="movie"
    placeholder="Enter Working Title"
    required
    style="width: 90%; padding: 8px; border: 1px solid #ccc; border-radius: 5px;"
  >
</div>   

<div style="margin-bottom: 10px;">
  <div style="margin-bottom: 5px; font-weight: bold;">Role Name</div>
  <input
    type="text"
    name="role"
    placeholder="Enter Name of Role"
    required
    style="width: 90%; padding: 8px; border: 1px solid #ccc; border-radius: 5px;"
  >
</div>  

<div style="margin-bottom: 10px;">
  <div style="margin-bottom: 5px; font-weight: bold;">Gender</div>
  <input
    type="text"
    name="gender"
    placeholder="Enter Gender for Role"
    required
    style="width: 90%; padding: 8px; border: 1px solid #ccc; border-radius: 5px;"
  >
</div>  

<div style="margin-bottom: 10px;">
  <div style="margin-bottom: 5px; font-weight: bold;">Age Range</div>
  <input
    type="text"
    name="age"
    placeholder="Enter Age Range for Role"
    required
    style="width: 90%; padding: 8px; border: 1px solid #ccc; border-radius: 5px;"
  >
</div>    

<div style="margin-bottom: 10px;">
  <div style="margin-bottom: 5px; font-weight: bold;">Description</div>
  <textarea
    name="summary"
    placeholder="Enter a brief description of role and plot"
    required
    style="width: 90%; padding: 8px; border: 1px solid #ccc; border-radius: 5px; height: 100px;"
  ></textarea>
</div>  

<div style="margin-bottom: 10px;">
  <div style="margin-bottom: 5px; font-weight: bold;">Choose Genres</div>
  
  <div style="display: flex; flex-wrap: wrap; gap: 5px;">
    <label>
      <input
        type="checkbox"
        name="genres[]"
        value="horror"
        style="margin-right: 10px;"
      >
      Horror
    </label>

    <label>
      <input
        type="checkbox"
        name="genres[]"
        value="comedy"
        style="margin-right: 10px;"
      >
      Comedy
    </label>

    <label>
      <input
        type="checkbox"
        name="genres[]"
        value="fiction"
        style="margin-right: 10px;"
      >
      Fiction
    </label>

    <label>
      <input
        type="checkbox"
        name="genres[]"
        value="action"
        style="margin-right: 10px;"
      >
      Action
    </label>
    <label>
      <input
        type="checkbox"
        name="genres[]"
        value="adventure"
        style="margin-right: 10px;"
      >
      Adventure
    </label>
    <label>
      <input
        type="checkbox"
        name="genres[]"
        value="romance"
        style="margin-right: 10px;"
      >
      Romance
    </label>
    <label>
      <input
        type="checkbox"
        name="genres[]"
        value="thriller"
        style="margin-right: 10px;"
      >
      Thriller
    </label>
    <label>
      <input
        type="checkbox"
        name="genres[]"
        value="musical"
        style="margin-right: 10px;"
      >
      Musical
    </label>
    <label>
      <input
        type="checkbox"
        name="genres[]"
        value="mystery"
        style="margin-right: 10px;"
      >
      Mystery
    </label>
    <label>
      <input
        type="checkbox"
        name="genres[]"
        value="history"
        style="margin-right: 10px;"
      >
      History
    </label>
    <label>
      <input
        type="checkbox"
        name="genres[]"
        value="fantasy"
        style="margin-right: 10px;"
      >
      Fantasy
    </label>
    <label>
      <input
        type="checkbox"
        name="genres[]"
        value="documentary"
        style="margin-right: 10px;"
      >
      Documentary
    </label>
  </div>
</div>
 
<div style="text-align: center;">
  <button type="submit" style="margin-top: 10px; padding: 8px 12px; border: none; border-radius: 5px; background-color: #28a745; color: white; cursor: pointer;">Create</button>
</div>              </form>
            </div>
          </div>
        `;

    $("body").append(modalHtml);
    $("#createRoleModal").fadeIn();

    $(".closeRoleBtn").on("click", function () {
      $("#createRoleModal").fadeOut();
    });

    $("#roleForm").on("submit", function (e) {
      e.preventDefault();

      const Movie = $('input[name="movie"]').val();
      const Role = $('input[name="role"]').val();
      const Gender = $('input[name="gender"]').val();
      const Age = $('input[name="age"]').val();
      const Plot = $('textarea[name="summary"]').val();
      const Genres = $('input[name="genres[]"]:checked')
        .map(function () {
          return $(this).val();
        })
        .get();

      setMovie((prevMovies) => [...prevMovies, Movie]);
      setRole((prevRoles) => [...prevRoles, Role]);
      setGender((prevGender) => [...prevGender, Gender]);
      setAgerange((prevAge) => [...prevAge, Age]);
      setPlot((prevPlot) => [...prevPlot, Plot]);
      setGenres((prevGenres) => [...prevGenres, Genres]);

      const roleData = {
        movie: Movie,
        genres: Genres,
        plot: Plot,
        age: Age,
        gender: Gender,
        role: Role,
        studioemail: user.studioemail,
        studio: studio,
      };

      const handleSubmit = () => {
        fetch("https://instacast.onrender.com/putNewRoles", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(roleData), // Send data as an object with topic
        })
          .then((response) => response.json())
          .then((data) => {})
          .catch((error) => {
            console.error("Error:", error);
          });
      };

      handleSubmit(); // Submit the data to the backend

      $("#createRoleModal").fadeOut();
    });
  };

  const handleRedirectMatch = () => {
    navigate("/StudioMatching", { state: { data2: data2 } });
  };

  const handleLogOut = () => {
    localStorage.removeItem("studioemail");
    try {
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Error removing user from localStorage:", error);
    }
    navigate("/");
  };

  return (
    <div>
      <div className="middle-box">
        {/* Top Half: 50% height */}
        <div
          style={{
            flex: 1,
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 24px",
            //borderBottom: '1px solid rgba(255,255,255,0.3)',
          }}
        >
          {/* Left Text */}
          <div
            style={{
              flex: 1,
              textAlign: "center",
              color: "black",
              flexDirection: "columnn",
            }}
          >
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.2)", // Light background for text box
                padding: "8px",
                borderRadius: "8px",
                marginBottom: "12px", // Space between the boxes
                marginLeft: "100px",
                gap: "10px",
                flexDirection: "column",
                width: "65%",
                textAlign: "center",
                display: "flex",
              }}
            >
              <div>
                <b>Studio Email: </b>
                {email}
              </div>
              <div>
                <b>Manager: </b>
                {manager}
              </div>
              <div>
                <b>Phone: </b>
                {number}
              </div>
            </div>
          </div>

          {/* Center Image */}
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <h1>
              <b>{studio}</b>
            </h1>
          </div>
          {/* Right Text */}
          <div
            style={{
              flex: 1,
              textAlign: "center",
              color: "black",
              flexDirection: "columnn",
            }}
          >
            <button
              onClick={() => createRole()}
              style={{
                background: "linear-gradient(135deg, #6e8efb, #a777e3)",
                border: "none",
                color: "white",
                padding: "12px 24px",
                borderRadius: "999px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease-in-out",
                boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.05)";
                e.target.style.boxShadow = "0 6px 20px rgba(0,0,0,0.3)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
              }}
            >
              Create Movie Role
            </button>{" "}
          </div>
        </div>

        {/* Bottom Half: 50% height */}
        <div
          style={{
            flex: 2,
            width: "100%",
            flexWrap: "wrap", // 👈 allow wrapping
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "left",
            padding: "24px",
            gap: "24px",
            overflowY: "auto", // optional scroll if they exceed vertically
          }}
        >
          {/* Two A4-ish rectangles */}
          {role.length === 0 ? (
            <div
              style={{ textAlign: "center", color: "white", fontSize: "16px" }}
            >
              <b>Start by Creating a New Movie Role!</b>
            </div>
          ) : (
            Array.from(role).map((irole, i) => (
              <div
                key={i}
                style={{
                  background:
                    "linear-gradient(135deg,rgb(238, 89, 131), #764ba2)",
                  width: "210px",
                  height: "297px",
                  borderRadius: "12px",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  padding: "10px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.2)", // Light background for text box
                    padding: "8px",
                    borderRadius: "8px",
                    marginBottom: "12px", // Space between the boxes
                    width: "90%",
                    textAlign: "center",
                  }}
                >
                  <b>Role: </b>
                  {irole}
                </div>
                <div
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    padding: "8px",
                    borderRadius: "8px",
                    marginBottom: "12px",
                    width: "90%",
                    textAlign: "center",
                  }}
                >
                  <b>Movie: </b>
                  {movie[i]}
                </div>
                <div
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    padding: "8px",
                    borderRadius: "8px",
                    textAlign: "center",
                    width: "90%",
                  }}
                >
                  <b>Gender: </b>
                  {gender[i]}
                </div>
                <div
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    padding: "8px",
                    borderRadius: "8px",
                    textAlign: "center",
                    width: "90%",
                  }}
                >
                  <button
                    onClick={() => alert("Edit not supported yet!")}
                    style={{
                      width: "100%", // Makes the button take full width of its container
                      padding: "8px",
                      borderRadius: "5px",
                      border: "2px solidrgb(7, 113, 32)", // Green border
                      backgroundColor: "transparent", // Makes the background transparent
                      color: "#28a745", // Green text
                      cursor: "pointer",
                    }}
                  >
                    <b>Edit</b>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div>
        <button
          className="renderMatching"
          onClick={handleRedirectMatch}
        ></button>
      </div>
      <div>
        <button className="logout" onClick={handleLogOut}>
          Log Out!
        </button>
      </div>
    </div>
  );
};

export default SDashBoard;
