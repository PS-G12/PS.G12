import React from "react";
import { Link } from "react-router-dom";
import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faUtensils,
  faDumbbell,
  faCalculator,
} from "@fortawesome/free-solid-svg-icons";
import icon2 from "../../images/icons/icon-3.png";

function Header() {
  const currentPath = window.location.pathname;

  const isActive = (path) => currentPath === path;

  return (
    <header className="header-menu">
      <div className="icon-bar">
        <img className="icon-1" src={icon2} alt="Icon" />
      </div>
      <nav className="navbar">
        <div className="logo"></div>
        <ul className="nav-links">
          <li className={isActive("/") ? "active" : ""}>
            <a href="/">
              <FontAwesomeIcon icon={faChartLine} /> HOME
            </a>
          </li>
          <li
            className={
              isActive("/registerFood") || isActive("/registerFood") ? "active" : ""
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
          <li className="dropdown">
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
      {/* Utiliza el componente Link para redirigir a /authentication */}
      <div className="icon-users">
        <Link to="/login">
          <img src="user.png" alt="User Icon" />
        </Link>
      </div>
    </header>
  );
}

export default Header;
