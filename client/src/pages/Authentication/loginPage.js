import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase.js"
import "firebase/app";
import "./authentication.css";
import { createUserWithEmailAndPassword } from "firebase/auth";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    signInUsername: "",
    signInPassword: "",
  });

  const handleSignIn = async (e) => {
    e.preventDefault();
    console.log("Iniciar sesión con:", formData.signInUsername, formData.signInPassword);
    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, formData.signInUsername, formData.signInPassword);
      console.log(userCredentials);
    }
    catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="auth-page">
      <div className="bg-container">
        <div className="auth-container">
          <div className="forms-container">
            <div className="form-control signin-form">
              <form onSubmit={handleSignIn}>
                <h2>Sign In</h2>
                <input
                  type="text"
                  name="signInUsername"
                  placeholder="Username"
                  value={formData.signInUsername}
                  onChange={handleChange}
                  required
                />
                <input
                  type="password"
                  name="signInPassword"
                  placeholder="Password"
                  value={formData.signInPassword}
                  onChange={handleChange}
                  required
                />
                <button type="submit">Sign In</button>
              </form>
              <span>or sign in with</span>
              <div className="socials">
                <i className="fab fa-facebook-f"></i>
                <i className="fab fa-google"></i>
                <i className="fab fa-linkedin-in"></i>
              </div>
            </div>
          </div>
          <div className="intros-container">
            <div className="intro-control signin-intro">
              <div className="intro-control__inner">
                <h2>Welcome Back!</h2>
                <p>
                  Welcome back to the fitness world! We're delighted to have you
                  here. It's great to see you again. We hope you've had a safe
                  and enjoyable time.
                </p>
                <Link to="/register" id="signup-btn">
                  Don't have an account yet? Sign up.
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
