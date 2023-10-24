import React from 'react';
import ClientNavBar from './Components/ClientNavBar';
import styles from './CSS/Dashboard.module.css';
import ClientDashboardSideBar from './Components/ClientDashboardSideBar';
import DashboardComponent from './Components/DashboardComponent';
import WorkerComponent from './Components/WorkerComponent';
import ServicesComponent from './Components/ServicesComponent';

const ClientDashboard = () => {
  const [section, setSection] = React.useState(0);
  return (
    <>
      <ClientNavBar />
      <div className={styles.dashboardSection}>
        <ClientDashboardSideBar section={section} setSection={setSection} />
        <div className={styles.dashboardInfo}>
          {section === 0 && <DashboardComponent />}
          {section === 1 && <WorkerComponent />}
          {section === 2 && <ServicesComponent />}
        </div>
      </div>
    </>
  );
};

export default ClientDashboard;
