import React from 'react';
import { Link } from 'react-router-dom';
import '../css/index.css';
import githubIcon from '../assets/img/github-mark-white.png'; 

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <h1 className="header__title">
          <img src={githubIcon} alt="GitHub Logo" />
          GitHub Finder
        </h1>
        <Link to="/" className="header__link">Home</Link>
      </div>
    </header>
  );
};

export default Header;



