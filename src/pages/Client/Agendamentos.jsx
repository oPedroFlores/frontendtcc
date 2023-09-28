import React from 'react';
import NavBar from './Components/ClientNavBar';
import styles from './CSS/Agendamentos.module.css';
import { GET_CALENDAR, UPDATE_CALENDAR } from '../../api';
import Input from '../components/Input';
import Btn from '../components/ButtonComponent';
import UseForm from '../../Hooks/UseForm';
import { toast } from 'react-toastify';

const Agendamentos = () => {
  const [schedule, setSchedule] = React.useState([]);
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

  let startTime = UseForm('');
  let endTime = UseForm('');
  let startBreakTime = UseForm('');
  let endBreakTime = UseForm('');

  function changeAdded(sentDay) {
    for (const day of schedule) {
      if (day.day === sentDay) {
        if (day.startTime > 0) {
          day.startTime = 0;
        } else {
          day.startTime = 1;
        }
        setRender(!render);
        console.log(schedule);
      }
    }
  }

  async function handleEditDays(event) {
    event.preventDefault();
    if (
      !startTime.value ||
      !endTime.value ||
      startTime.length === 0 ||
      endTime.length === 0
    ) {
      return alert(
        'Preencha um valor para "Começo do Expediente" e "Fim do Expediente"!',
      );
    }
    if (
      startTime.value > 24 ||
      startTime.value < 0 ||
      endTime.value > 24 ||
      endTime.value < 0
    ) {
      return alert('Os valores não podem ser maiores que 24 ou menores que 0!');
    }
    if (endTime.value < startTime.value) {
      return alert(
        'O "Fim do Expediente" não pode ser menor ou igual ao "Começo do Expediente"',
      );
    }
    if (
      startBreakTime.value > endTime.value ||
      endBreakTime.value > endTime.value
    ) {
      return alert('O almoço não pode começar ou acabar depois do expediente!');
    }

    for (const day of schedule) {
      if (day.startTime === 0 || day.startTime === '0') {
        day.endBreakTime = 0;
        day.startBreakTime = 0;
        day.startTime = 0;
        day.endTime = 0;
      } else {
        const timeStampMs = 60 * 60 * 1000;
        day.endBreakTime = endBreakTime.value * timeStampMs;
        day.startBreakTime = startBreakTime.value * timeStampMs;
        day.startTime = startTime.value * timeStampMs;
        day.endTime = endTime.value * timeStampMs;
      }
    }

    const localUserString = window.localStorage.getItem('tccuser');
    const localUser = JSON.parse(localUserString);
    const token = localUser.token;
    const { url, options } = UPDATE_CALENDAR(token, schedule);

    const response = await fetch(url, options);
    const json = await response.json();
    if (response.status === 200) {
      getSchedule();
      endBreakTime.setValue('');
      startBreakTime.setValue('');
      startTime.setValue('');
      endTime.setValue('');
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
            <div className={styles.days}>
              <div
                onClick={() => changeAdded('seg')}
                className={
                  schedule[0].startTime > 0
                    ? `${styles.addedDay}`
                    : `${styles.notAddedDay}`
                }
              >
                Segunda-Feira
              </div>
              <div
                onClick={() => changeAdded('ter')}
                className={
                  schedule[1].startTime > 0
                    ? `${styles.addedDay}`
                    : `${styles.notAddedDay}`
                }
              >
                Terça-Feira
              </div>
              <div
                onClick={() => changeAdded('qua')}
                className={
                  schedule[2].startTime > 0
                    ? `${styles.addedDay}`
                    : `${styles.notAddedDay}`
                }
              >
                Quarta-Feira
              </div>
              <div
                onClick={() => changeAdded('qui')}
                className={
                  schedule[3].startTime > 0
                    ? `${styles.addedDay}`
                    : `${styles.notAddedDay}`
                }
              >
                Quinta-Feira
              </div>
              <div
                onClick={() => changeAdded('sex')}
                className={
                  schedule[4].startTime > 0
                    ? `${styles.addedDay}`
                    : `${styles.notAddedDay}`
                }
              >
                Sexta-Feira
              </div>
              <div
                onClick={() => changeAdded('sab')}
                className={
                  schedule[5].startTime > 0
                    ? `${styles.addedDay}`
                    : `${styles.notAddedDay}`
                }
              >
                Sábado
              </div>
              <div
                onClick={() => changeAdded('dom')}
                className={
                  schedule[6].startTime > 0
                    ? `${styles.addedDay}`
                    : `${styles.notAddedDay}`
                }
              >
                Domingo
              </div>
            </div>
            <div className={styles.agendaTimeSet}>
              <Input
                label="Começo do Expediente"
                type="number"
                name="startTime"
                autocomplete="off"
                {...startTime}
              />
              <Input
                label="Fim do Expediente"
                type="number"
                name="endTime"
                autocomplete="off"
                {...endTime}
              />
              <Input
                label="Começo do almoço"
                type="number"
                name="startBreak"
                autocomplete="off"
                {...startBreakTime}
              />
              <Input
                label="Fim do almoço"
                type="number"
                name="endBreak"
                autocomplete="off"
                {...endBreakTime}
              />
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

export default Agendamentos;
