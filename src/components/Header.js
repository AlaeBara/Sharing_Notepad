import React from 'react';
import Logo from './Logo';
import { GrSearch } from "react-icons/gr";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.logoLink}>
          <Link to={"/"}>
            <Logo w={120} h={70} />
          </Link>
        </div>
        <div className={styles.searchBarLg}>
          <input type='text' placeholder='Search here...' className={styles.searchInput} />
          <button className={styles.searchButton}>
            <GrSearch />
          </button>
        </div>
        <div className={styles.userActions}>
          <Link to={"/"} className={styles.logoutLink}>Logout</Link>
        </div>
      </div>
    </header>
  );
}

export default Header;