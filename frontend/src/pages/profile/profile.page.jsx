import React from "react";
import { useEffect } from "react";
import { fetchProfile } from "../../apis/profile.api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAccessToken, clearAccessToken, getRefreshToken, clearRefreshToken } from "../../auth/tokenService";

const Profile = () => {
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const profileHandler = async () => {
    const token = getAccessToken();
    if (!token) {
      setError("Unauthorized please login");
      setLoading(false);
      return;
    }
    try {
      const data = await fetchProfile();
      if (data?.user?.name) {
        setUserName(data.user.name);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const refreshToken = getRefreshToken();
      // Call backend logout to invalidate refresh token
      await fetch("http://localhost:8000/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken })
      });
    } catch (error) {
      console.error("Error logging out", error.message);
    } finally {
      clearAccessToken();
      clearRefreshToken();
      navigate("/login");
    }
  };

  useEffect(() => {
    profileHandler();
  }, []);

  if (loading) {
    return (<div>Loading...</div>);
  } else if (error) {
    return (
      <div>
        {error}
        <br />
        <div onClick={() => navigate("/login")}>Please login</div>
      </div>
    );
  } else if(userName) {
    return (
      <div>
        <h1>
          Hello{" "}
          {userName
            ? userName.charAt(0).toUpperCase() + userName.slice(1)
            : "user"}
          !!! Good Morning
        </h1>
        <button onClick={handleLogout}>Log Out</button>
      </div>
    );
  }
  else{
    return(
        <>
        </>
    )
  }
};

export default Profile;
