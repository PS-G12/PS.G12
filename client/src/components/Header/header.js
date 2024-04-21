import React from "react";
import { Link } from "react-router-dom";
import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faUtensils,
  faDumbbell,
  faCalculator,
  faSignInAlt,
  faUserPlus,
  faSignOut,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import icon2 from "../../images/icons/icon-app/icon-3.png";
import iconUser from "../../images/icons/icon-header/user-default.png";

function handleLogout(event) {
  event.preventDefault();
  sessionStorage.removeItem("token");
  window.location.href = "/";
}

function Header({ isAuthenticated }) {
  const currentPath = window.location.pathname;
  const isActive = (path) => currentPath === path;

  return (
    <header className="header-menu">
      <div className="icon-bar">
        <img className="icon-1" src={icon2} alt="Icon" />
      </div>
        <div className="logo"></div>
      <nav className="navbar">
        <ul className="nav-links">
          <li className={isActive("/") ? "active" : ""}>
            <a href="/">
              <FontAwesomeIcon icon={faChartLine} /> HOME
            </a>
          </li>
          <li
            className={
              isActive("/registerFood") || isActive("/registerFood")
                ? "active"
                : ""
            }
          >
            <a href="/registerFood">
              <FontAwesomeIcon icon={faUtensils} /> FOOD
            </a>
          </li>
          <li className={isActive("/routines") ? "active" : ""}>
            <a href="/routines">
              <FontAwesomeIcon icon={faDumbbell} /> EXERCISE
            </a>
          </li>
          <li className="dropdown-menu">
            <a href="#">
              <FontAwesomeIcon icon={faCalculator} /> CALCULATORS
            </a>
            <ul className="submenu">
              <li className={isActive("/BMIcalculation") ? "active" : ""}>
                <a href="/BMIcalculation" className="calc">
                  CALCULATOR BMI
                </a>
              </li>
              <li className={isActive("/MacrosCalculation") ? "active" : ""}>
                <a href="/MacrosCalculation" className="calc">
                  MACROS CALCULATOR
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <div className="icon-users">
        {isAuthenticated ? (
          <div className="hero">
            <details className="dropdown">
              <summary role="button">
                <a className="button">
                  <img src={iconUser} alt="User Icon" />
                </a>
              </summary>
              <ul>
                <li>
                  <Link to = '/profile'>
                  <FontAwesomeIcon icon={faUser} />
                    Profile
                  </Link>
                </li>
                <li>
                  <Link onClick={handleLogout} className="nav-links">
                  <FontAwesomeIcon icon={faSignOut} />
                    Log out
                  </Link>
                </li>
              </ul>
            </details>
          </div>
        ) : (
          <div className="hero">
            <details className="dropdown">
              <summary role="button">
                <a className="button">
                  <img src={iconUser} alt="User Icon" />
                </a>
              </summary>
              <ul>
                <li>
                  <Link to="/login">
                    <FontAwesomeIcon icon={faSignInAlt} />
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register">
                    <FontAwesomeIcon icon={faUserPlus} />
                    Register
                  </Link>
                </li>
              </ul>
            </details>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
