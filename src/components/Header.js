import React from 'react';
import Logo from './Logo';
import { GrSearch } from "react-icons/gr";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import './Header.css';

const Header = () => {
  return (
    <header className='header'>
      <div className='header-container'>
        <div className='logo-link'>
          <Link to={"/"}>
            <Logo w={100} h={60} />
          </Link>
        </div>
        <div className='search-bar-lg'>
          <input type='text' placeholder='search here...' className='search-input' />
          <div className='search-button'>
            <GrSearch />
          </div>
        </div>
        <div className='user-actions'>
          <div>
            <Link to={"/login"} className='user-link'>
              <FaRegUserCircle />
            </Link>
          </div>
          <div>
            <Link to={"/"} className='logout-link'>Logout</Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
