import React from 'react';
import styles from '../CSS/Dashboard.module.css';
import { GET_SCHEDULE, GET_SCHEDULE_DATES, GET_WORKERS } from '../../../api';

const DashboardComponent = () => {
  const [workers, setWorkers] = React.useState([]);
  const [selectedWorkerId, setSelectedWorkerId] = React.useState();
  const [selectedDay, setSelectedDay] = React.useState('');
  const [schedules, setSchedules] = React.useState([]); // Correção aqui

  React.useEffect(() => {
    getWorkers();
  }, []);
  const handleWorkerSelectChange = (event) => {
    const selectedId = Number(event.target.value);
    setSelectedWorkerId(selectedId);
  };

  const localUserString = window.localStorage.getItem('tccuser');
  const localUser = JSON.parse(localUserString);
  const token = localUser.token;
  const username = localUser.username;

  async function getWorkers() {
    const { url, options } = GET_WORKERS(token);

    const response = await fetch(url, options);
    const jsonRes = await response.json();
    setWorkers(jsonRes);
  }

  async function handleSelectedDay(event) {
    // Definindo a schedule do dia
    const date = event.target.value;
    setSelectedDay(date);
    setSchedule([]);
  }

  React.useEffect(() => {
    async function setAllSchedules() {
      const { url, options } = GET_SCHEDULE_DATES({
        username: username,
        date: selectedDay,
      });
      const response = await fetch(url, options);
      const jsonRes = await response.json();
      if (response.status === 200) {
        setSchedules(jsonRes);
      } else {
        alert('ERRO!');
      }
    }

    if (selectedDay && selectedWorkerId) {
      setAllSchedules();
    }
  }, [selectedDay, selectedWorkerId, username, setSchedules]);

  const [schedule, setSchedule] = React.useState([]);

  async function showTimeInfo(hour) {
    const date = selectedDay;
    const partes = date.split('-');
    const ano = partes[0];
    const mes = partes[1];
    const dia = partes[2];
    const dateRequest = new Date(Date.UTC(ano, mes - 1, dia, hour)); // Crie um objeto Date com base no timestamp
    const timeStampRequest = dateRequest.getTime();
    const { url, options } = GET_SCHEDULE(token, {
      worker: selectedWorkerId,
      timestamp: timeStampRequest,
    });
    const response = await fetch(url, options);
    const jsonRes = await response.json();
    const obj = {
      email: jsonRes.email,
      user: jsonRes.user,
      service: jsonRes.service,
      hour: hour,
    };
    if (response.status === 200) setSchedule(obj);
  }

  function disableInfo() {
    setSchedule([]);
  }

  return (
    <div className={styles.dashboardComponent}>
      <div className={styles.dashboardSelectOptions}>
        <select
          name="workerSelect"
          id="workerSelect"
          value={selectedWorkerId}
          onChange={handleWorkerSelectChange}
        >
          <option disabled selected>
            Selecione um funcionário
          </option>
          {workers.map((worker) => (
            <option key={worker.id} value={worker.id} nameValue={worker.name}>
              {worker.name}
            </option>
          ))}
        </select>
        <input
          id="selectedDay"
          label="Dia"
          type="date"
          name="date"
          onChange={handleSelectedDay}
        />
      </div>
      <div className={styles.dashboardDates}>
        {schedules.calendar
          ? (() => {
              const date = selectedDay;
              const partes = date.split('-');
              const ano = partes[0];
              const mes = partes[1];
              const dia = partes[2];
              const timeStampDate = new Date(Date.UTC(ano, mes - 1, dia)); // Crie um objeto Date com base no timestamp
              const diaDaSemanaNumero = timeStampDate.getDay();
              const diasDaSemanaTexto = [
                'seg',
                'ter',
                'qua',
                'qui',
                'sex',
                'sab',
                'dom',
              ];
              const diaDaSemana = diasDaSemanaTexto[diaDaSemanaNumero];

              // Definindo o horário de começo e o de fim
              let horarioComeco = 0; // Defina o número de elementos desejado
              let horarioFim = 0; // Defina o número de elementos desejado
              let horarioBreakComeco = 0; // Defina o número de elementos desejado
              let horarioBreakFim = 0; // Defina o número de elementos desejado

              for (const dateDay of schedules.calendar) {
                if (dateDay.day === diaDaSemana) {
                  horarioComeco = dateDay.startTime / (60 * 60 * 1000);
                  horarioFim = dateDay.endTime / (60 * 60 * 1000);
                  horarioBreakComeco =
                    dateDay.startBreakTime / (60 * 60 * 1000);
                  horarioBreakFim = dateDay.endBreakTime / (60 * 60 * 1000);
                }
              }
              let horasMarcadas = [];

              for (const time of schedules.schedules) {
                if (time.workerId === selectedWorkerId) {
                  const dataHora = new Date(Number(time.startTimeStamp));
                  const horas = dataHora.getHours() + 3;
                  horasMarcadas = [...horasMarcadas, horas];
                }
              }
              const elements = [];
              for (let i = horarioComeco; i < horarioFim; i++) {
                if (horasMarcadas.includes(i)) {
                  elements.push(
                    <div
                      key={i}
                      className={`${styles.timeCard} ${styles.notAllowedTime}`}
                      onClick={() => showTimeInfo(i)}
                    >
                      {i} Horas
                    </div>,
                  );
                } else if (i >= horarioBreakComeco && i < horarioBreakFim) {
                  elements.push(
                    <div
                      key={i}
                      className={`${styles.timeCard} ${styles.lunchTime}`}
                      onClick={() => disableInfo()}
                    >
                      {i} Horas
                    </div>,
                  );
                } else {
                  elements.push(
                    <div
                      key={i}
                      className={`${styles.timeCard} ${styles.allowedTime} `}
                      onClick={() => disableInfo()}
                    >
                      {i} Horas
                    </div>,
                  );
                }
              }
              return elements;
            })()
          : '...'}
      </div>
      {schedule.user && (
        <div className={styles.infoCard}>
          <p className={styles.infoP}>
            <b>Cliente:</b> {schedule.user}
          </p>
          <p className={styles.infoP}>
            <b>Email:</b> {schedule.email}
          </p>
          <p className={styles.infoP}>
            <b>Serviço:</b> {schedule.service}
          </p>
          <p className={styles.infoP}>
            <b>Horário:</b> {schedule.hour} Horas
          </p>
        </div>
      )}
    </div>
  );
};

export default DashboardComponent;
