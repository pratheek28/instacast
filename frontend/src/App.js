import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./SignUp";
import Landing from "./Landing";
import LogIn from "./LogIn";
import ActorMatching from "./ActorMatching";
import StudioMatching from "./StudioMatching";
import SDashBoard from "./StudioDashboard";
import DashBoard from "./dash";

function App() {
  return (
    <div>
      <div>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/logIn" element={<LogIn />} />
          <Route path="/actorMatching" element={<ActorMatching />} />
          <Route path="/studioMatching" element={<StudioMatching />} />
          <Route path="/sdashboard" element={<SDashBoard />} />
          <Route path="/dash" element={<DashBoard />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
