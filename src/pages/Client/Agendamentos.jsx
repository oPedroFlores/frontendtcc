import React from 'react';
import NavBar from './Components/ClientNavBar';
import styles from './CSS/Agendamentos.module.css'
import { GET_CALENDAR } from '../../api';

const Agendamentos = () => {
  const [schedule, setSchedule] = React.useState([]);


  async function getSchedule(){
    const localUserString = window.localStorage.getItem('tccuser');
    const localUser = JSON.parse(localUserString);
    const token = localUser.token;

    const { url, options } = GET_CALENDAR(token);

    const response = await fetch(url, options);
    const jsonRes = await response.json();
    setSchedule(jsonRes);
  }

  React.useEffect(() => {
    getSchedule();
  }, [])
  return (
    <>
      <NavBar />
      <section className={styles.agendamentosSection}>
        <div>
          {schedule ? (
            schedule.map((day) => (
              <div key={day.id}>
                {day.id} {/* Renderiza o ID do dia */}
                {day.map((hour, index) => (
                  <div key={index}>
                    {hour.firstStartTime} - {hour.firstEndTime} {/* Renderiza o horário */}
                  </div>
                ))}
              </div>
            ))
          ) : (
            'Carregando...'
          )}
        </div>
      </section>
    </>
  );
}

export default Agendamentos;
