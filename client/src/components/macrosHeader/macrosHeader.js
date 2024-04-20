import React from "react";
import "./macrosHeader.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {

} from "@fortawesome/free-solid-svg-icons";



function macrosHeader() {
  const currentPath = window.location.pathname;
  const isActive = (path) => currentPath === path;

  return (
    <header className="header-menu">
      <nav className="navbarCarbs">
        <ul className="nav-links-Carbs">
          <li>
            <a href="/">
              <FontAwesomeIcon/> HOME
            </a>
          </li>

          <li className={isActive("/calories") ? "active" : ""}>
            <a href="/calories">
              <FontAwesomeIcon/> CALORIES
            </a>
          </li>
          <li className={isActive("/carbs") ? "active" : ""}>
            <a href="/carbs">
              <FontAwesomeIcon/> CARBS
            </a>
          </li>
          <li className={isActive("/fats") ? "active" : ""}>
            <a href="/fats">
              <FontAwesomeIcon/> FATS
            </a>
          </li>
          <li className={isActive("/proteins") ? "active" : ""}>
            <a href="/proteins">
              <FontAwesomeIcon/> PROTEINS
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default macrosHeader;
