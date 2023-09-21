import React from 'react';
import { Link } from 'react-router-dom';
import stylesClientNavBar from './CSS/ClientNavBar.module.css';
import { FaBars, FaTimes } from 'react-icons/fa';
import { UserContext } from '../../../UserContext';
const NavBar = () => {
  const { data, userLogout } = React.useContext(UserContext) || {};
  const navRef = React.useRef();

  const showNavBar = () => {
    navRef.current.classList.toggle(`${stylesClientNavBar.responsive_nav}`);
  };
  return (
    <nav className={stylesClientNavBar.navBar}>
      <h2>ONTime</h2>
      <div ref={navRef} className={stylesClientNavBar.navDiv}>
        {data ? (
          <div className={stylesClientNavBar.links}>
            <Link to="/client/dashboard" className={stylesClientNavBar.navA}>Dashboard</Link>
            <Link to="/client/cadastrar/funcionario" className={stylesClientNavBar.navA}>Cadastrar Funcionário</Link>
            <Link to="/client/cadastrar/servico" className={stylesClientNavBar.navA}>Cadastrar Servico</Link>
            <Link to="/client/home" className={stylesClientNavBar.navA}>{data.username}</Link>
            <button onClick={userLogout}>Logout</button>
          </div>
        ) : 'erro'}
        <button
          className={`${stylesClientNavBar.navBtn} ${stylesClientNavBar.navCloseBtn}`}
          onClick={showNavBar}
        >
          <FaTimes />
        </button>
      </div>
      <button className={`${stylesClientNavBar.navBtn}`} onClick={showNavBar}>
        <FaBars />
      </button>
    </nav>
  );
};

export default NavBar;
