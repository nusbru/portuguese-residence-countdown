import React from 'react';

/**
 * Header component - displays the application title and subtitle
 * Follows Single Responsibility Principle - only handles header display
 */
const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <i className="fas fa-id-card"></i>
          <h1>Residence Card Monitor</h1>
        </div>
        <p className="subtitle">Track your Portuguese residence authorization</p>
      </div>
    </header>
  );
};

export default Header;
