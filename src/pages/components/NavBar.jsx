import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from '../CSS Components/NavBar.module.css';
import { FaBars, FaTimes } from 'react-icons/fa';
import { UserContext } from '../../UserContext';
const NavBar = () => {
  const { data, userLogout } = React.useContext(UserContext) || {};
  const navRef = React.useRef();

  const showNavBar = () => {
    navRef.current.classList.toggle(`${styles.responsive_nav}`);
  };

  const location = useLocation();

  return (
    <nav className={styles.navBar}>
      <h2>ONTime</h2>
      <div ref={navRef} className={styles.navDiv}>
        {data ? (
          <div className={styles.links}>
            <Link
              to="/agendamentos"
              className={
                location.pathname === '/agendamentos' ? styles.activedLink : ''
              }
            >
              Agendamentos
            </Link>
            <button onClick={userLogout}>Logout</button>
          </div>
        ) : (
          <div className={styles.links}>
            <Link
              to="/"
              className={location.pathname === '/' ? styles.activedLink : ''}
            >
              Home
            </Link>
            <Link
              to="/planos"
              className={
                location.pathname === '/planos' ? styles.activedLink : ''
              }
            >
              Planos
            </Link>
            <Link
              to="/login"
              className={
                location.pathname === '/login' ? styles.activedLink : ''
              }
            >
              Login / Registro
            </Link>
          </div>
        )}
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
