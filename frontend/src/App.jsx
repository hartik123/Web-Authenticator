// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/login/login.page";
import SignUp from "./pages/signup/signup.page";
import Profile from "./pages/profile/profile.page";
import NoPage from "./pages/nopage/nopage.page";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* default landing page */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/me" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
