import React from 'react';
import styles from '../CSS/Dashboard.module.css';
import {
  FaBars,
  FaTimes,
  FaCalendarAlt,
  FaPeopleArrows,
  FaClipboardList,
} from 'react-icons/fa';

const ClientDashboardSideBar = ({ section, setSection }) => {
  const [sidebar, setSidebar] = React.useState(false);
  const toggleSideBar = () => {
    setSidebar(!sidebar);
  };

  function handleSection(id) {
    if (id !== section) {
      setSection(id);
    }
  }

  return (
    <div
      className={
        !sidebar
          ? `${styles.closedDashboardSideBar}`
          : `${styles.dashboardSideBar}`
      }
    >
      {!sidebar ? (
        <FaBars onClick={toggleSideBar} />
      ) : (
        <FaTimes onClick={toggleSideBar} />
      )}
      <div className={styles.sidebarContentInfo}>
        <div
          className={`${
            section === 0 ? styles.activedSidebarIcon : styles.sidebarIcon
          }`}
          onClick={() => handleSection(0)}
        >
          <FaCalendarAlt />
          <p>Agendamentos</p>
        </div>
        <div
          className={`${
            section === 1 ? styles.activedSidebarIcon : styles.sidebarIcon
          }`}
          onClick={() => handleSection(1)}
        >
          <FaPeopleArrows />
          <p>Funcionários</p>
        </div>
        <div
          className={`${
            section === 2 ? styles.activedSidebarIcon : styles.sidebarIcon
          }`}
          onClick={() => handleSection(2)}
        >
          <FaClipboardList />
          <p>Serviços</p>
        </div>
        <p>Test</p>
      </div>
    </div>
  );
};

export default ClientDashboardSideBar;
