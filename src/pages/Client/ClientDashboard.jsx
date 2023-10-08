import React from 'react';
import ClientNavBar from './Components/ClientNavBar';
import styles from './CSS/Dashboard.module.css';
import ClientDashboardSideBar from './Components/ClientDashboardSideBar';
import DashboardComponent from './Components/DashboardComponent';

const ClientDashboard = () => {
  const [section, setSection] = React.useState(0);
  return (
    <>
      <ClientNavBar />
      <div className={styles.dashboardSection}>
        <ClientDashboardSideBar section={section} setSection={setSection} />
        <div className={styles.dashboardInfo}>
          {section === 0 && <DashboardComponent />}
          {section === 1 && <p>Funcionários</p>}
          {section === 2 && <p>Serviços</p>}
        </div>
      </div>
    </>
  );
};

export default ClientDashboard;
