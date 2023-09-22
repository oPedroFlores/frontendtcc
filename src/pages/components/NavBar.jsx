import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../CSS Components/NavBar.module.css';
import { FaBars, FaTimes } from 'react-icons/fa';
import { UserContext } from '../../UserContext';
const NavBar = () => {
  const { data, userLogout } = React.useContext(UserContext) || {};
  const navRef = React.useRef();

  const showNavBar = () => {
    navRef.current.classList.toggle(`${styles.responsive_nav}`);
  };
  return (
    <nav className={styles.navBar}>
      <h2>ONTime</h2>
      <div ref={navRef} className={styles.navDiv}>
        {data ? (
          <div className={styles.links}>
            <Link to="/agendamentos">Agendamentos</Link>
            <Link to="/perfil">{data.username}</Link>
            <button onClick={userLogout}>Logout</button>
          </div>
        ) : (
          <div className={styles.links}>
            <Link to="/">Home</Link>
            <Link to="/planos">Planos</Link>
            <Link to="/login">Login / Registro</Link>
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
