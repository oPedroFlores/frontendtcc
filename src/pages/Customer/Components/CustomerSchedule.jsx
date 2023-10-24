import React, { useState } from 'react';
import styles from '../Customer.module.css';
import { GET_SCHEDULE_DATES, SET_SCHEDULE } from '../../../api';
import Btn from '../../components/ButtonComponent';
import CustomerLoading from '../CustomerLoading';

const CustomerSchedule = ({
  stepForm,
  setStepForm,
  setInfo,
  loading,
  setLoading,
  info,
  schedules,
  setSchedules,
  user,
}) => {
  const [reload, setReload] = useState(false);
  const [selectedDay, setSelectedDay] = useState('');

  function backStep() {
    setReload(!reload);
    setStepForm(2);
  }

  async function handleSelectedDay(event) {
    // Definindo a schedule do dia
    const date = event.target.value;
    setSelectedDay(date);
    const { url, options } = GET_SCHEDULE_DATES({
      username: user,
      date: date,
    });
    const response = await fetch(url, options);
    const jsonRes = await response.json();
    if (response.status === 200) {
      setSchedules(jsonRes);
    } else {
      alert('ERRO!');
    }
  }

  const [selectedTime, setSelectedTime] = React.useState();

  function handleSelectedTime(time) {
    console.log(schedules);
    console.log(info.worker);
    setSelectedTime(time);
  }

  async function handleSubmitSchedule(event) {
    setLoading(true);
    event.preventDefault();
    const partes = selectedDay.split('-');
    const ano = partes[0];
    const mes = partes[1];
    const dia = partes[2];
    const timeStampDateStart = Date.UTC(ano, mes - 1, dia, selectedTime);
    const timeStampDateEnd = Date.UTC(ano, mes - 1, dia, selectedTime + 1);

    const { url, options } = SET_SCHEDULE(info.token, {
      username: user,
      startTimeStamp: timeStampDateStart,
      endTimeStamp: timeStampDateEnd,
      workerId: info.worker,
      serviceId: info.service,
    });
    try {
      const response = await fetch(url, options);
      const jsonRes = await response.json();
      if (response.status === 201) {
        setStepForm(4);
      } else {
        throw new Error(jsonRes);
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  }
  const dataAtual = new Date().toISOString().split('T')[0];

  return (
    <div>
      {!loading ? (
        <div className={styles.stepWrapper}>
          <div className={styles.scheduleWrapper}>
            <button onClick={backStep}>Voltar</button>
            <h3>Selecione o dia e horário desejado</h3>
            <input
              id="selectedDay"
              label="Dia"
              type="date"
              name="date"
              value={selectedDay}
              min={dataAtual}
              onChange={handleSelectedDay}
            />

            <div className={styles.scheduleAllDays}></div>
            <div className={styles.scheduleDates}>
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
                        horarioBreakFim =
                          dateDay.endBreakTime / (60 * 60 * 1000);
                      }
                    }
                    let horasMarcadas = [];
                    for (const time of schedules.schedules) {
                      if (time.workerId === info.worker) {
                        const dataHora = new Date(Number(time.startTimeStamp));
                        const horas = dataHora.getHours() + 3;
                        horasMarcadas = [...horasMarcadas, horas];
                      }
                    }

                    const elements = [];
                    if (horarioComeco === 0) {
                      elements.push(<p>Dia inválido!</p>);
                    }
                    for (let i = horarioComeco; i < horarioFim; i++) {
                      if (horasMarcadas.includes(i)) {
                        elements.push(
                          <div
                            key={i}
                            className={`${styles.timeCard} ${styles.notAllowedTime}`}
                          >
                            {i} Horas
                          </div>,
                        );
                      } else if (
                        i >= horarioBreakComeco &&
                        i < horarioBreakFim
                      ) {
                        elements.push(
                          <div
                            key={i}
                            className={`${styles.timeCard} ${styles.lunchTime}`}
                          >
                            {i} Horas
                          </div>,
                        );
                      } else {
                        elements.push(
                          <div
                            key={i}
                            className={`${styles.timeCard} ${
                              styles.allowedTime
                            } ${
                              selectedTime === i ? `${styles.selectedTime}` : ''
                            }`}
                            onClick={() => handleSelectedTime(i)}
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
            {selectedTime ? (
              <form onSubmit={handleSubmitSchedule}>
                <Btn>Registrar Horário</Btn>
              </form>
            ) : (
              ''
            )}
          </div>
        </div>
      ) : (
        <CustomerLoading />
      )}
    </div>
  );
};

export default CustomerSchedule;
