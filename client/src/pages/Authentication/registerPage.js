import React, { useState } from "react";
import { auth } from "../../firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "./authentication.css";

const RegisterForm = ({ isSignUp }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      console.log("User registered:", userCredentials.user);
      // Aquí podrías redirigir al usuario a otra página después de registrarse
    } catch (err) {
      console.error(err);
      alert("Error occurred during registration. Please try again.");
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
            <div className="form-control signup-form">
              <form onSubmit={handleSignUp}>
                <h2>{isSignUp ? "Sign Up" : "Welcome Back!"}</h2>
                {isSignUp && (
                  <>
                    <input
                      type="text"
                      name="username"
                      placeholder="Username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </>
                )}
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                {isSignUp && (
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                )}
                <button type="submit">
                  {isSignUp ? "Sign Up" : "Sign In"}
                </button>
              </form>
              <span>or sign {isSignUp ? "up" : "in"} with</span>
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
                <h2>{isSignUp ? "Join Us!" : "Welcome Back!"}</h2>
                <p>
                  {isSignUp
                    ? "We're excited to have you here. If you haven't already, create an account to access exclusive offers, rewards, and discounts."
                    : "Welcome back to the fitness world! We're delighted to have you here. It's great to see you again. We hope you've had a safe and enjoyable time."}
                </p>
                <button id="signin-btn">
                  {isSignUp
                    ? "Already have an account? Sign in."
                    : "Don't have an account yet? Sign up."}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
