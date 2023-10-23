import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import stylesClientNavBar from './CSS/ClientNavBar.module.css';
import { FaBars, FaTimes } from 'react-icons/fa';
import { UserContext } from '../../../UserContext';

const NavBar = () => {
  const { data, userLogout } = React.useContext(UserContext) || {};
  const navRef = React.useRef();
  const showNavBar = () => {
    navRef.current.classList.toggle(`${stylesClientNavBar.responsive_nav}`);
  };

  const location = useLocation();

  return (
    <nav className={stylesClientNavBar.navBar}>
      <div className={stylesClientNavBar.infoNamesNav}>
        <h2>ONTime</h2>
        {data ? (
          <p className={stylesClientNavBar.pUsername}>{data.username}</p>
        ) : (
          ''
        )}
      </div>

      <div ref={navRef} className={stylesClientNavBar.navDiv}>
        {data ? (
          <div className={stylesClientNavBar.links}>
            <Link
              to="/client/dashboard"
              className={`${stylesClientNavBar.navA} ${
                location.pathname === '/client/dashboard'
                  ? stylesClientNavBar.activedLink
                  : ''
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/client/agenda"
              className={`${stylesClientNavBar.navA} ${
                location.pathname === '/client/agenda'
                  ? stylesClientNavBar.activedLink
                  : ''
              }`}
            >
              Agenda
            </Link>
            <Link
              to="/client/cadastrar/funcionario"
              className={`${stylesClientNavBar.navA} ${
                location.pathname === '/client/cadastrar/funcionario'
                  ? stylesClientNavBar.activedLink
                  : ''
              }`}
            >
              Funcionários
            </Link>
            <Link
              to="/client/cadastrar/servico"
              className={`${stylesClientNavBar.navA} ${
                location.pathname === '/client/cadastrar/servico'
                  ? stylesClientNavBar.activedLink
                  : ''
              }`}
            >
              Serviços
            </Link>
            <button onClick={userLogout}>Logout</button>
          </div>
        ) : (
          'erro'
        )}
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
