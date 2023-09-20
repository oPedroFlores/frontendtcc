import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../CSS Components/NavBar.module.css';
import { FaBars, FaTimes } from 'react-icons/fa';
const NavBar = () => {
  const navRef = React.useRef();

  const showNavBar = () => {
    navRef.current.classList.toggle(`${styles.responsive_nav}`);
  };
  return (
    <nav className={styles.navBar}>
      <h2>ONTime</h2>
      <div ref={navRef} className={styles.navDiv}>
        <Link to="/">Home</Link>
        <Link to="/planos">Planos</Link>
        <Link to="/contato">Contato</Link>
        <Link to="/login">Login / Registro</Link>
        <button
          className={`${styles.navBtn} ${styles.navCloseBtn}`}
          onClick={showNavBar}
        >
          <FaTimes />
        </button>
      </div>
      <button className={`${styles.navBtn}`} onClick={showNavBar}>
        <FaBars />
      </button>
    </nav>
  );
};

export default NavBar;
