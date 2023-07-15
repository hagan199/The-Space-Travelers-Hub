import React from 'react';
import '../style/nav.css';
import { NavLink } from 'react-router-dom';
import userImg from '../assets/planet.png';

function Nav() {
  return (
    // Header container with navigation styles
    <header className="nav-head">
      <div className="false-nav">
        <div className="nav">
          {/* Logo section */}
          <div className="logo">
            <img src={userImg} alt="logo" />
            <h2>Space Travelers&#39; Hub</h2>
          </div>
          {/* Navigation items */}
          <ul className="nav-items">
            {/* NavLink for Rockets */}
            <li className="nav-link">
              <NavLink to="/">Rockets</NavLink>
            </li>
            {/* NavLink for Missions */}
            <li className="nav-link">
              <NavLink to="/missions">Missions</NavLink>
            </li>
            {/* Separator */}
            <span>|</span>
            {/* NavLink for My Profile */}
            <li className="nav-link">
              <NavLink to="/profile">My Profile</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Nav;
