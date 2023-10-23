import React from 'react';
import NavBar from './components/NavBar';
import { GET_USER_SCHEDULES } from '../api';
import styles from './CSS/Agendamentos.module.css';
import { Link } from 'react-router-dom';

const Agendamentos = () => {
  const [schedules, setSchedules] = React.useState([]);
  const [filteredSchedules, setFilteredSchedules] = React.useState([]);
  const [option, setOption] = React.useState(false);

  async function getSchedules() {
    const localUserString = window.localStorage.getItem('tccuser');
    const localUser = JSON.parse(localUserString);
    const token = localUser.token;
    const { url, options } = GET_USER_SCHEDULES(token);
    try {
      const response = await fetch(url, options);
      const jsonRes = await response.json();
      if (response.status === 200) {
        setSchedules(jsonRes);
        setFilteredSchedules(jsonRes);
      } else {
        throw new Error(jsonRes);
      }
    } catch (error) {
      alert(error);
    }
  }

  React.useEffect(() => {
    getSchedules();
  }, []);

  function switchOption(params) {
    if (params) {
      const dataDeHoje = new Date();
      dataDeHoje.setHours(0, 0, 0, 0);
      const timestampDeHoje = dataDeHoje.getTime();
      const updatedFilteredSchedules = [...schedules];

      for (let i = updatedFilteredSchedules.length - 1; i >= 0; i--) {
        const startTimeStamp = Number(
          updatedFilteredSchedules[i].startTimeStamp,
        );

        if (startTimeStamp < timestampDeHoje) {
          updatedFilteredSchedules.splice(i, 1);
        }
      }

      setFilteredSchedules(updatedFilteredSchedules);
    } else {
      setFilteredSchedules(schedules);
    }
    setOption(params);
  }

  return (
    <section>
      <NavBar />
      <div className={styles.userSchedulesSection}>
        {schedules.length > 0 && (
          <div className={styles.loadedUserSchedules}>
            <div className={styles.userSchedulesOptionsDiv}>
              <button
                className={
                  !option
                    ? `${styles.selectedOption}`
                    : `${styles.userOptionButton}`
                }
                onClick={() => switchOption(false)}
              >
                Todos
              </button>
              <button
                className={
                  option
                    ? `${styles.selectedOption}`
                    : `${styles.userOptionButton}`
                }
                onClick={() => switchOption(true)}
              >
                Próximos
              </button>
            </div>
            <div className={styles.userSchedulesCardDiv}>
              {filteredSchedules.map((schedule, index) => {
                const data = new Date(Number(schedule.startTimeStamp));
                const ano = data.getFullYear();
                const mes = (data.getMonth() + 1).toString().padStart(2, '0');
                const dia = data.getDate().toString().padStart(2, '0');
                const horas = data.getHours().toString().padStart(2, '0');

                return (
                  <div key={index} className={styles.userScheduleCard}>
                    <div>
                      <p>{`${ano}/${mes}/${dia}`}</p>
                      <p>{horas}:00</p>
                    </div>
                    <p>Serviço: {schedule.serviceName}</p>
                    <p>Funcionário: {schedule.workerName}</p>
                    <p>
                      Estabelecimento:{' '}
                      <Link
                        to={`/customer/${schedule.clientUsername}`}
                        className={styles.clientLink}
                      >
                        {schedule.clientUsername}
                      </Link>
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Agendamentos;
