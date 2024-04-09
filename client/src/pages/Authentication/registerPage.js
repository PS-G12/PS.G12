import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./authentication.css";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    signUpUsername: "",
    signUpWeight: "",
    signUpHeight: "",
    signUpEmail: "",
    signUpPassword: "",
    signUpPassword_dup: "",
  });
  const [errors, setErrors] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  const [step, setStep] = useState(1);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleNextStep = () => {
    if (step < 4) {
      if (step === 1) {
        if (formData.signUpUsername === "") {
          setErrors({ signUpUsername: "Please fill out this field." });
          return;
        } else if (formData.signUpUsername.length < 4) {
          setErrors({
            signUpUsername: "Username must be at least 4 characters long.",
          });
          return;
        }
      }
      if (step === 2) {
        if (formData.signUpWeight === "" || formData.signUpHeight === "") {
          setErrors({
            signUpWeight: "Please fill out this field.",
            signUpHeight: "Please fill out this field.",
          });
          return;
        } else {
          const letterRegex = /^\d+(\.\d+)?$/;
          if (!letterRegex.test(formData.signUpWeight)) {
            setErrors({ signUpWeight: "Weight must be a valid number." });
            return;
          }
          if (!letterRegex.test(formData.signUpHeight)) {
            setErrors({ signUpHeight: "Height must be a valid number." });
            return;
          }
        }
      }
      if (step === 3) {
        if (
          formData.signUpEmail === "" ||
          formData.signUpPassword === "" ||
          formData.signUpPassword_dup === ""
        ) {
          setErrors({
            signUpEmail: "Please fill out this field.",
            signUpPassword: "Please fill out this field.",
            signUpPassword_dup: "Please fill out this field.",
          });
          return;
        } else {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(formData.signUpEmail)) {
            setErrors({ signUpEmail: "Please enter a valid email address." });
            return;
          }
          if (formData.signUpPassword.length < 5) {
            setErrors({
              signUpPassword: "Password must be at least 5 characters long.",
            });
            return;
          }
          if (formData.signUpPassword !== formData.signUpPassword_dup) {
            setErrors({
              signUpPassword_dup: "Please make sure your passwords match.",
            });
            return;
          }
        }
      }

      setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (step === 1 && formData.signUpUsername.length < 4) {
      newErrors.signUpUsername = "Username must be at least 4 characters long.";
    }

    if (step === 3 && formData.signUpPassword.length < 6) {
      newErrors.signUpPassword =
        "Passwords must be at least 5 characters long.";
    }

    if (step === 3 && formData.signUpPassword !== formData.signUpPassword_dup) {
      newErrors.signUpPassword_dup = "Please make sure your passwords match.";
    }
    if (step === 3 && !validateEmail(formData.signUpEmail)) {
      newErrors.signUpEmail = "Please enter a valid email address.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (step === 4) {
      try {
        const response = await fetch("/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
          sessionStorage.setItem("token", data.token);
          navigate("/registration-success");
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error occurred while registering user:", error);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: undefined,
    });

    // if (name === 'signUpWeight') {
    //   if (!(/^\d*\.?\d+$/.test(value))) {
    //     setErrors({
    //       ...errors,
    //       [name]: "Weight must be a valid number"
    //     });
    //   }
    // }

    // if (name === 'signUpHeight') {
    //   if (!(/^\d*\.?\d+$/.test(value))) {
    //     setErrors({
    //       ...errors,
    //       [name]: "Height must be a valid number"
    //     });
    //   }
    // }
  };

  const handleGoogleSignUp = async () => {
    console.log("Signing up with Google...");
  };

  const handleGithubSignUp = async () => {
    console.log("Signing up with GitHub...");
  };
  const navigate = useNavigate();
  if (loggedIn) {
    navigate("/");
  }
  return (
    <div className="auth-page">
      <div className="bg-container">
        <div className="auth-container">
          <div className={"forms-container" + (step > 1 ? " expanded" : "")}>
            <div
              className={
                "form-control signin-form" + (step > 1 ? " expanded" : "")
              }
            >
              <form onSubmit={handleSignUp}>
                <div className="progress-bar">
                  <div
                    className="progress"
                    style={{ width: `${(step - 1) * 33.33}%` }}
                  ></div>
                </div>

                <h2>Register - Step {step}</h2>

                {step === 1 && (
                  <>
                    <div className="form-item">
                      <input
                        type="text"
                        className={
                          "input-signin" +
                          (errors.signUpUsername ? " error" : "")
                        }
                        name="signUpUsername"
                        autoComplete="off"
                        value={formData.signUpUsername}
                        onChange={handleChange}
                        required
                      />
                      <label for="signUpUsername">Username</label>
                    </div>
                    <p className="error">
                      {errors.signUpUsername && (
                        <i className="error-icon fas fa-exclamation-circle"></i>
                      )}
                      {errors.signUpUsername && (
                        <span className="error">{errors.signUpUsername}</span>
                      )}
                    </p>
                  </>
                )}
                {step === 2 && (
                  <>
                    <div className="form-item">
                      <input
                        type="text"
                        className={
                          "input-signin" + (errors.signUpWeight ? " error" : "")
                        }
                        name="signUpWeight"
                        autoComplete="off"
                        value={formData.signUpWeight}
                        onChange={handleChange}
                        required
                      />
                      <label for="signUpWeight">Weight</label>
                    </div>
                    <p className="error">
                      {errors.signUpWeight && (
                        <i className="error-icon fas fa-exclamation-circle"></i>
                      )}
                      {errors.signUpWeight && (
                        <span className="error">{errors.signUpWeight}</span>
                      )}
                    </p>
                    <div className="form-item">
                      <input
                        type="text"
                        className={
                          "input-signin" + (errors.signUpHeight ? " error" : "")
                        }
                        name="signUpHeight"
                        autoComplete="off"
                        value={formData.signUpHeight}
                        onChange={handleChange}
                        required
                      />
                      <label for="signUpHeight">Height</label>
                    </div>
                    <p className="error">
                      {errors.signUpHeight && (
                        <i className="error-icon fas fa-exclamation-circle"></i>
                      )}
                      {errors.signUpHeight && (
                        <span className="error">{errors.signUpHeight}</span>
                      )}
                    </p>
                  </>
                )}

                {step === 3 && (
                  <>
                    <div className="form-item">
                      <input
                        type="email"
                        className="input-signin"
                        name="signUpEmail"
                        value={formData.signUpEmail}
                        onChange={handleChange}
                        required
                      />
                      <label for="signUpEmail">Email Address</label>
                    </div>
                    <p className="error">
                      {errors.signUpEmail && (
                        <i className="error-icon fas fa-exclamation-circle"></i>
                      )}
                      {errors.signUpEmail && (
                        <span className="error">{errors.signUpEmail}</span>
                      )}
                    </p>

                    <div className="form-item">
                      <input
                        type="password"
                        className={
                          "input-signin" +
                          (errors.signUpPassword || errors.signUpPassword_dup
                            ? " error"
                            : "")
                        }
                        name="signUpPassword"
                        value={formData.signUpPassword}
                        onChange={handleChange}
                        required
                      />
                      <label for="signUpPassword">Password</label>
                    </div>
                    <p className="error">
                      {errors.signUpPassword && (
                        <i className="error-icon fas fa-exclamation-circle"></i>
                      )}
                      {errors.signUpPassword && (
                        <span className="error">{errors.signUpPassword}</span>
                      )}
                    </p>

                    <div className="form-item">
                      <input
                        type="password"
                        className={
                          "input-signin" +
                          (errors.signUpPassword_dup ? " error" : "")
                        }
                        name="signUpPassword_dup"
                        value={formData.signUpPassword_dup}
                        onChange={handleChange}
                        required
                      />
                      <label for="signUpPassword_dup">Repeat password</label>
                    </div>
                    <p className="error-dup">
                      {errors.signUpPassword_dup && (
                        <i className="error-icon fas fa-exclamation-circle"></i>
                      )}
                      {errors.signUpPassword_dup && (
                        <span className="error">
                          {errors.signUpPassword_dup}
                        </span>
                      )}
                    </p>
                  </>
                )}

                {step === 4 && (
                  <>
                    <div className="activity-level-options">
                      <h3>Choose your current activity level:</h3>
                      <div className="form-item">
                        <select
                          name="activityLevel"
                          value={formData.activityLevel}
                          onChange={handleChange}
                        >
                          <option value="sedentary">Sedentary</option>
                          <option value="moderate">Moderate</option>
                          <option value="intense">Intense</option>
                        </select>
                      </div>
                    </div>

                    <div className="fitness-goal-options">
                      <h3>Choose your fitness goal:</h3>
                      <div className="form-item">
                        <select
                          name="fitnessGoal"
                          value={formData.fitnessGoal}
                          onChange={handleChange}
                        >
                          <option value="muscleGain">Gain Muscle</option>
                          <option value="maintainWeight">
                            Maintain Weight
                          </option>
                          <option value="gainWeight">Gain Weight</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}

                <div>
                  {step > 1 && (
                    <button
                      className="previous-button"
                      onClick={handlePrevStep}
                    >
                      Previous
                    </button>
                  )}
                  {step < 4 ? (
                    <button
                      className="continue-button"
                      onClick={handleNextStep}
                    >
                      Continue
                    </button>
                  ) : (
                    <button type="submit">Sign Up</button>
                  )}
                </div>
              </form>
              <div className={"social-auth-container" + (step > 1 ? " hidden" : "")}>
                <div className="linea-horizontal"></div>
                <span>or sign up with</span>
                <div className="socials">
                  <button
                    className="gsi-material-button"
                    id="google-signup"
                    onClick={handleGoogleSignUp}
                  >
                    <div className="gsi-material-button-state"></div>
                    <div className="gsi-material-button-content-wrapper">
                      <div className="gsi-material-button-icon">
                        <svg
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 48 48"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          style={{ display: "block" }}
                        >
                          <path
                            fill="#EA4335"
                            d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                          ></path>
                          <path
                            fill="#4285F4"
                            d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                          ></path>
                          <path
                            fill="#FBBC05"
                            d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                          ></path>
                          <path
                            fill="#34A853"
                            d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                          ></path>
                          <path fill="none" d="M0 0h48v48H0z"></path>
                        </svg>
                      </div>
                      <span className="gsi-material-button-contents">
                        Sign up with Google
                      </span>
                      <span style={{ display: "none" }}>
                        Sign up with Google
                      </span>
                    </div>
                  </button>
                  <button
                    className="gsi-material-button"
                    id="github-signup"
                    onClick={handleGithubSignUp}
                  >
                    <div className="gsi-material-button-state"></div>
                    <div className="gsi-material-button-content-wrapper">
                      <div className="gsi-material-button-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 496 512"
                        >
                          <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6z" />
                          <path d="M134.8 392.9c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3z" />
                          <path d="M179 391.2c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9z" />
                          <path d="M244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8z" />
                          <path d="M97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1z" />
                          <path d="M86.4 344.8c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.7-3.6-.3-4.3 .7z" />
                          <path d="M118.8 380.4c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1z" />
                          <path d="M107.4 365.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
                        </svg>
                      </div>
                      <span className="gsi-material-button-contents">
                        Sign up with Github
                      </span>
                      <span style={{ display: "none" }}>
                        Sign up with Github
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="intros-container">
            <div
              className={
                "intro-control signin-intro" + (step > 1 ? " hidden" : "")
              }
            >
              <div className="intro-control__inner">
                <h2>
                  Welcome to{" "}
                  <span className="fitnesscoach-msg">FitnessCoach!</span>
                </h2>
                <p>
                  Start your fitness journey today! We're excited to have you
                  join us. Let's get moving and stay healthy together.
                </p>
                <Link to="/login" id="signup-btn">
                  Already have an account? Sign in.
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
