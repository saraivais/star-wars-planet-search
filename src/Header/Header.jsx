import React from 'react';
import './Header.css';
import starWarsLogo from '../images/star-wars-logo.png';

function Header() {
  return (
    <header className="header">
      <h1 className="header-title">PLANET</h1>
      <img className="header-logo" src={ starWarsLogo } alt="star-wars-logo" />
      <h1 className="header-title">SEARCH</h1>
    </header>
  );
}

export default Header;
