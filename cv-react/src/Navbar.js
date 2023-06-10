import React from 'react';
import { NavbarContainer } from './App.style';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <NavbarContainer>
      <span className='title'>Gercek Zamanli Insan Sayma</span>
      <div>
        <Link to='/'>Home</Link>
        <Link to='/sorgu'>Sorgu</Link>
      </div>
    </NavbarContainer>
  );
};

export default Navbar;
