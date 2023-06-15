import { useState } from 'react';
import React from 'react';
import { NavbarContainer } from './App.style';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {

  // const isLoggedIn = sessionStorage.getItem('token'); // Check if user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem('token')); // Check if user is logged in

  const  handleLogout = async () => {
    const token = sessionStorage.getItem('token');

    await axios.post('http://localhost:4000/user/logout', {
      headers: {
        token: `${token}`,
      },
      withCredentials: false,
    }).then((res) => {
      sessionStorage.removeItem('token');
      setIsLoggedIn(false);
    });
  };  

  return (
    <NavbarContainer>
      <span className='title'>Gerçek Zamanlı İnsan Sayma</span>
      <div>
        <Link to='/'>Monitör</Link>
        <Link to='/sorgu'>Sorgu</Link>
        {isLoggedIn ? (
          // If user is logged in, show logout button
          <button onClick={handleLogout} style={ 
            {
              
      
              marginLeft: '1rem',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              padding: '1rem 2rem',
              backgroundColor: 'transparent',
              border: '1px solid black',
              borderRadius: '20px',
              cursor: 'pointer',
              color: 'black',
              fontSize: '16px',
              fontWeight: 'bold',
              textDecoration: 'none',
              margin: '0 10px',
            }
          } >Çıkış Yap</button>
        ) : (
          // If user is not logged in, show login button
          <Link to='/girisyap'>Giriş Yap</Link>
        )}
      </div>
    </NavbarContainer>
  );
};

export default Navbar;
