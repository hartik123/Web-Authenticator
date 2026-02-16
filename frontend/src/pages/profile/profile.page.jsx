import React from "react";
import { useEffect } from "react";
import { fetchProfile } from "../../apis/profile.api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const profileHandler = async () => {
    const token = localStorage.getItem("token");
    console.log("TOKEN", token);
    if (!token) {
      setError("Unauthorized please login");
      return;
    }
    try {
      const data = await fetchProfile(token);
      if (data?.user?.name) {
        setUserName(data.user.name);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError(error.message);
    } finally {
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
    } catch (error) {
      console.error("Error logging out", error.message);
    } finally {
      navigate("/login");
    }
  };

  useEffect(() => {
    profileHandler();
  }, []);

  if (error) {
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
