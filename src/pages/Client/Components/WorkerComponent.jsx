import React from 'react';
import { WORKERS_INFO } from '../../../api';
import BarChart from './ChartComponents/BarChart';
import styles from './CSS/WorkerComponent.module.css';

const WorkerComponent = () => {
  const [workersInfo, setWorkersInfo] = React.useState([]);
  const [workersData, setWorkersData] = React.useState([]);
  const localUserString = window.localStorage.getItem('tccuser');
  const localUser = JSON.parse(localUserString);
  const token = localUser.token;

  async function getWorkersInfo() {
    const { url, options } = WORKERS_INFO(token);
    const response = await fetch(url, options);
    const jsonRes = await response.json();
    setWorkersInfo(jsonRes);
    setWorkersData({
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
    getWorkersInfo();
  }, []);

  return (
    <section className={styles.workersInfoSection}>
      {workersInfo.length > 0 ? (
        <div className={styles.workersInfoBar}>
          <div className={styles.barChartDiv}>
            <BarChart data={workersData} pie={false} />
          </div>
          <div className={styles.pieChartDiv}>
            <BarChart
              data={workersData}
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

export default WorkerComponent;
