import React from 'react';
import { SERVICES_INFO } from '../../../api';
import BarChart from './ChartComponents/BarChart';
import styles from './CSS/WorkerComponent.module.css';

const ServicesComponent = () => {
  const [servicesInfo, setServicesInfo] = React.useState([]);
  const [servicesData, setServicesData] = React.useState([]);
  const localUserString = window.localStorage.getItem('tccuser');
  const localUser = JSON.parse(localUserString);
  const token = localUser.token;

  async function getservicesInfo() {
    const { url, options } = SERVICES_INFO(token);
    const response = await fetch(url, options);
    const jsonRes = await response.json();
    setServicesInfo(jsonRes);
    setServicesData({
      labels: jsonRes.map((data) => data.name),
      datasets: [
        {
          label: 'Vezes registrado',
          data: jsonRes.map((data) => data.numberOfRegistrations),
          backgroundColor: ['#15191d'],
        },
      ],
    });

    console.log(jsonRes);
  }

  React.useEffect(() => {
    getservicesInfo();
  }, []);

  return (
    <section className={styles.workersInfoSection}>
      {servicesInfo.length > 0 ? (
        <div className={styles.workersInfoBar}>
          <div className={styles.barChartDiv}>
            <BarChart data={servicesData} pie={false} />
          </div>
          <div className={styles.pieChartDiv}>
            <BarChart
              data={servicesData}
              pie={true}
              className={styles.pieChart}
            />
          </div>
        </div>
      ) : (
        ''
      )}
    </section>
  );
};

export default ServicesComponent;
