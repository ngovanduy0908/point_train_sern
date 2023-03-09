import React from 'react';
import Logo from '../../assets/img/LOGO_DTDH.png';
import './header.scss';
const Header = () => {
  return (
    <div className="container">
      <img src={Logo} alt="logo" />
    </div>
  );
};

export default Header;
