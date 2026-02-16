import React, { useState } from "react";
import { signUpAPI } from "../../apis/signup.api";
import { useNavigate } from "react-router-dom";
import { setAccessToken, setRefreshToken } from "../../auth/tokenService";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    if (!userName || !userEmail || !userPassword) {
      setError("All fields are required");
      setTimeout(() => setError(""), 3000);
      return;
    }
    
    try {
      const data = await signUpAPI({ name: userName, email: userEmail, password: userPassword });
      if (data.token) {
        setAccessToken(data.token);
        if (data.refreshToken) {
          setRefreshToken(data.refreshToken);
        }
        navigate("/me");
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <div className="signup-page__container">
      <form className="signup-page__form" onSubmit={handleSignUp}>
        <div className="signup-page__element">
          <label className="signup-page__label">Enter name</label>
          <input
            className="signup-page__input"
            type="text"
            placeholder="Enter name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div className="signup-page__element">
          <label className="signup-page__label">Enter email</label>
          <input
            className="signup-page__input"
            type="email"
            placeholder="Enter email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />
        </div>
        <div className="signup-page__element">
          <label className="signup-page__label">Enter password</label>
          <input
            className="signup-page__input"
            type="password"
            placeholder="Enter password"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            required
          />
        </div>
        <button
          className="signup-page__submit_button"
          type="submit"
        >
          Sign Up
        </button>
        <br />
        {error && <span className="signup-page__error">{error}</span>}
      </form>
    </div>
  );
};

export default SignUp;
