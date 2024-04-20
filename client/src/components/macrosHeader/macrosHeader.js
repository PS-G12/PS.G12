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
          <li className={isActive("/") ? "active" : ""}>
            <a href="/calories">
              <FontAwesomeIcon/> CALORIES
            </a>
          </li>
          <li>
            <a href="/carbs">
              <FontAwesomeIcon/> CARBS
            </a>
          </li>
          <li>
            <a href="/fats">
              <FontAwesomeIcon/> FATS
            </a>
          </li>
          <li>
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
