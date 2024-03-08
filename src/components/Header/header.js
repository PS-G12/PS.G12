import React from 'react';
import './header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faUtensils, faDumbbell, faCalculator } from '@fortawesome/free-solid-svg-icons';

function Header() {
  const currentPath = window.location.pathname;
  console.log(currentPath);

  const isActive = (path) => currentPath === path;

  return (
    <header className="header-menu">
      <nav className="navbar">
        <div className="logo"></div>
        <ul className="nav-links">
          <li className={isActive("/") ? "active" : ""}><a href="/"><FontAwesomeIcon icon={faChartLine} /> HOME</a></li>
          <li className={isActive("/buscarAlimento") || isActive("/buscarAlimento") ? "active" : ""}><a href="/buscarAlimento"><FontAwesomeIcon icon={faUtensils} /> FOOD</a></li>
          <li className={isActive("/rutinas") ? "active" : ""}><a href="/rutinas"><FontAwesomeIcon icon={faDumbbell} /> EXCERSICE</a></li>
          <li className={isActive("/calculoIMC") ? "active" : ""}><a href="/calculoIMC"><FontAwesomeIcon icon={faCalculator} /> CALCULATOR</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
