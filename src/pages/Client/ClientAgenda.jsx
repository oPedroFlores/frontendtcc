import React from 'react';
import NavBar from './Components/ClientNavBar';
import styles from './CSS/Agendamentos.module.css';
import { GET_CALENDAR, UPDATE_CALENDAR } from '../../api';
import Input from '../components/Input';
import Btn from '../components/ButtonComponent';
import UseForm from '../../Hooks/UseForm';
import { toast } from 'react-toastify';

export const ClientAgenda = () => {
  const [schedule, setSchedule] = React.useState([]);
  const [selectedDay, setSelectedDay] = React.useState('seg');
  const [render, setRender] = React.useState(false);

  async function getSchedule() {
    const localUserString = window.localStorage.getItem('tccuser');
    const localUser = JSON.parse(localUserString);
    const token = localUser.token;

    const { url, options } = GET_CALENDAR(token);

    const response = await fetch(url, options);
    const jsonRes = await response.json();
    if (jsonRes.length > 0) {
      setSchedule(jsonRes);
      for (const day of jsonRes) {
        if (day.day === 'seg') {
          startTime.setValue(day.startTime / (60 * 60 * 1000));
          endTime.setValue(day.endTime / (60 * 60 * 1000));
          startBreakTime.setValue(day.startBreakTime / (60 * 60 * 1000));
          endBreakTime.setValue(day.endBreakTime / (60 * 60 * 1000));
        }
      }
    } else {
      const temp = [
        {
          id: 1,
          clientID: 19,
          startTime: 0,
          endTime: 0,
          startBreakTime: 0,
          endBreakTime: 0,
          day: 'seg',
        },
        {
          id: 2,
          clientID: 19,
          startTime: 0,
          endTime: 0,
          startBreakTime: 0,
          endBreakTime: 0,
          day: 'ter',
        },
        {
          id: 3,
          clientID: 19,
          startTime: 0,
          endTime: 0,
          startBreakTime: 0,
          endBreakTime: 0,
          day: 'qua',
        },
        {
          id: 4,
          clientID: 19,
          startTime: 0,
          endTime: 0,
          startBreakTime: 0,
          endBreakTime: 0,
          day: 'qui',
        },
        {
          id: 5,
          clientID: 19,
          startTime: 0,
          endTime: 0,
          startBreakTime: 0,
          endBreakTime: 0,
          day: 'sex',
        },
        {
          id: 6,
          clientID: 19,
          startTime: 0,
          endTime: 0,
          startBreakTime: 0,
          endBreakTime: 0,
          day: 'sab',
        },
        {
          id: 7,
          clientID: 19,
          startTime: 0,
          endTime: 0,
          startBreakTime: 0,
          endBreakTime: 0,
          day: 'dom',
        },
      ];
      setSchedule(temp);
    }
  }

  React.useEffect(() => {
    getSchedule();
  }, []);

  let startTime = UseForm('agenda');
  let endTime = UseForm('agenda');
  let startBreakTime = UseForm('agenda');
  let endBreakTime = UseForm('agenda');

  function changeAdded(sentDay) {
    for (const day of schedule) {
      if (day.day === selectedDay) {
        if (
          startTime.value &&
          startTime.value !== '' &&
          startTime.value !== 0
        ) {
          day.startTime = startTime.value * (60 * 60 * 1000);
        } else {
          day.startTime = 0;
        }
        if (endTime.value && endTime.value !== '' && endTime.value !== 0) {
          day.endTime = endTime.value * (60 * 60 * 1000);
        } else {
          day.endTime = 0;
        }
        if (
          startBreakTime.value &&
          startBreakTime.value !== '' &&
          startBreakTime.value !== 0
        ) {
          day.startBreakTime = startBreakTime.value * (60 * 60 * 1000);
        } else {
          day.startBreakTime = 0;
        }
        if (
          endBreakTime.value &&
          endBreakTime.value !== '' &&
          endBreakTime.value !== 0
        ) {
          day.endBreakTime = endBreakTime.value * (60 * 60 * 1000);
        } else {
          day.endBreakTime = 0;
        }
      }
    }

    setSelectedDay(sentDay);
    for (const day of schedule) {
      if (day.day === sentDay) {
        startTime.setValue(day.startTime / (60 * 60 * 1000));
        endTime.setValue(day.endTime / (60 * 60 * 1000));
        startBreakTime.setValue(day.startBreakTime / (60 * 60 * 1000));
        endBreakTime.setValue(day.endBreakTime / (60 * 60 * 1000));
      }
    }
  }

  function checkError(day, message) {
    toast.error(`ERRO! ${message} Dia: ${day}`, {
      position: 'bottom-left',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
  }

  async function handleEditDays(event) {
    event.preventDefault();
    for (const day of schedule) {
      if (
        (day.startBreakTime !== 0 && day.endBreakTime === 0) ||
        (day.startBreakTime === 0 && day.endBreakTime !== 0)
      ) {
        return checkError(
          day.day,
          'Se existir almoço então é necessário dizer a sua duração!',
        );
      }
      if (
        day.startTime / (60 * 60 * 1000) > 24 ||
        day.startTime / (60 * 60 * 1000) < 0 ||
        day.endTime / (60 * 60 * 1000) > 24 ||
        day.endTime / (60 * 60 * 1000) < 0
      ) {
        return checkError(
          day.day,
          'Os valores não podem ser maiores que 24 ou menores que 0!',
        );
      }
      if (day.endTime < day.startTime) {
        return checkError(
          day.day,
          'O "Fim do Expediente" não pode ser menor ou igual ao "Começo do Expediente"',
        );
      }
      if (day.startBreakTime > day.endBreakTime) {
        return checkError(
          day.day,
          'O fim do almoço não pode ser antes do começo do almoço!',
        );
      }
      if (
        day.startBreakTime < day.startTime ||
        (day.startBreakTime > day.endTime &&
          day.startBreakTime !== 0 &&
          day.endBreakTime !== 0)
      ) {
        return checkError(
          day.day,
          'O almoço não pode começar ou acabar depois do expediente!',
        );
      }
    }
    for (const day of schedule) {
      if (day.day === selectedDay) {
        day.startTime = startTime.value * (60 * 60 * 1000);
        day.endTime = endTime.value * (60 * 60 * 1000);
        day.startBreakTime = startBreakTime.value * (60 * 60 * 1000);
        day.endBreakTime = endBreakTime.value * (60 * 60 * 1000);
      }
    }
    console.log(schedule);
    const localUserString = window.localStorage.getItem('tccuser');
    const localUser = JSON.parse(localUserString);
    const token = localUser.token;
    const { url, options } = UPDATE_CALENDAR(token, schedule);

    const response = await fetch(url, options);
    const json = await response.json();
    if (response.status === 200) {
      toast.info(`Calendário atualizado!!`, {
        position: 'bottom-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    } else {
      toast.error(`ERRO! ${json.message}`, {
        position: 'bottom-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    }
  }

  return (
    <>
      <NavBar />
      <section className={styles.agendamentosSection}>
        {schedule.length > 0 ? (
          <form onSubmit={handleEditDays} autocomplete="off">
            <h3 className={styles.h3Title}>
              Selecione os horários desejados por dia
            </h3>
            <div className={styles.days}>
              <div
                onClick={() => changeAdded('seg')}
                className={
                  selectedDay === 'seg'
                    ? `${styles.addedDay}`
                    : `${styles.notAddedDay}`
                }
              >
                Segunda-Feira
              </div>
              <div
                onClick={() => changeAdded('ter')}
                className={
                  selectedDay === 'ter'
                    ? `${styles.addedDay}`
                    : `${styles.notAddedDay}`
                }
              >
                Terça-Feira
              </div>
              <div
                onClick={() => changeAdded('qua')}
                className={
                  selectedDay === 'qua'
                    ? `${styles.addedDay}`
                    : `${styles.notAddedDay}`
                }
              >
                Quarta-Feira
              </div>
              <div
                onClick={() => changeAdded('qui')}
                className={
                  selectedDay === 'qui'
                    ? `${styles.addedDay}`
                    : `${styles.notAddedDay}`
                }
              >
                Quinta-Feira
              </div>
              <div
                onClick={() => changeAdded('sex')}
                className={
                  selectedDay === 'sex'
                    ? `${styles.addedDay}`
                    : `${styles.notAddedDay}`
                }
              >
                Sexta-Feira
              </div>
              <div
                onClick={() => changeAdded('sab')}
                className={
                  selectedDay === 'sab'
                    ? `${styles.addedDay}`
                    : `${styles.notAddedDay}`
                }
              >
                Sábado
              </div>
              <div
                onClick={() => changeAdded('dom')}
                className={
                  selectedDay === 'dom'
                    ? `${styles.addedDay}`
                    : `${styles.notAddedDay}`
                }
              >
                Domingo
              </div>
            </div>
            <div className={styles.agendaTimeSet}>
              <div className={styles.inputDiv}>
                <Input
                  label="Começo do Expediente"
                  type="number"
                  name="startTime"
                  max={24}
                  min={0}
                  autocomplete="off"
                  {...startTime}
                />
                <Input
                  label="Fim do Expediente"
                  type="number"
                  name="endTime"
                  max={24}
                  min={0}
                  autocomplete="off"
                  {...endTime}
                />
              </div>
              <div className={styles.inputDiv}>
                <Input
                  label="Começo do almoço"
                  type="number"
                  name="startBreak"
                  max={24}
                  min={0}
                  autocomplete="off"
                  {...startBreakTime}
                />
                <Input
                  label="Fim do almoço"
                  type="number"
                  max={24}
                  min={0}
                  name="endBreak"
                  autocomplete="off"
                  {...endBreakTime}
                />
              </div>
            </div>
            <Btn>Atualizar</Btn>
          </form>
        ) : (
          'Carregando...'
        )}

        <div></div>
      </section>
    </>
  );
};
