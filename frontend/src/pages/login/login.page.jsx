import React, { useState } from "react";
import { loginAPI } from "../../apis/login.api";
import { useNavigate } from "react-router-dom";
import { setAccessToken, setRefreshToken } from "../../auth/tokenService";


const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!userEmail || !userPassword) {
      setError("All fields are required");
      setTimeout(() => setError(""), 3000);
      return;
    }
    
    try {
      const data = await loginAPI({ email: userEmail, password: userPassword });
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
    <div className="login-page__container">
      <form className="login-page__form" onSubmit={handleLogin}>
        <div className="login-page__element">
          <label className="login-page__label">Enter email</label>
          <input
            className="login-page__input"
            type="email"
            placeholder="Enter email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />
        </div>
        <div className="login-page__element">
          <label className="login-page__label">Enter password</label>
          <input
            className="login-page__input"
            type="password"
            placeholder="Enter password"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            required
          />
        </div>
        <button
          className="login-page__submit_button"
          type="submit"
        >
          Login
        </button>
        <br />
        {error && <span className="login-page__error">{error}</span>}
      </form>
      <button
          className="login-page__submit_button"
          type="button"
          onClick={()=>navigate('/signup')}
        >
          Sign up
        </button>
    </div>
  );
};

export default Login;
