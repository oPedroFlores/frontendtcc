import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './Customer.module.css';
import CustomerLoading from './CustomerLoading';
import UseForm from '../../Hooks/UseForm';
import CustomerLogin from './Components/CustomerLogin';
import CustomerService from './Components/CustomerService';
import { GET_SCHEDULE_SERVICES, GET_SCHEDULE_WORKERS } from '../../api';
import CustomerWorker from './Components/CustomerWorker';
import CustomerSchedule from './Components/CustomerSchedule';

const Customer = () => {
  // username do cliente desejado
  const { user } = useParams();

  const [loading, setLoading] = React.useState(false); // Correção aqui
  const [stepForm, setStepForm] = React.useState(0); // Correção aqui
  const [workers, setWorkers] = React.useState([]); // Correção aqui
  const [info, setInfo] = React.useState({
    token: undefined,
    service: undefined,
    worker: undefined,
  }); // Correção aqui
  const [services, setServices] = React.useState([]); // Correção aqui
  const [schedules, setSchedules] = React.useState([]); // Correção aqui

  const loginForm = UseForm('email');
  const passwordForm = UseForm('password');

  function teste(event) {
    event.preventDefault();
    console.log(info);
  }

  async function getServices() {
    const { url, options } = GET_SCHEDULE_SERVICES({
      username: user,
    });
    const response = await fetch(url, options);
    const jsonRes = await response.json();
    if (response.status === 200) {
      setServices(jsonRes);
    } else {
      alert('ERRO!');
    }
  }

  async function getWorkers() {
    const { url, options } = GET_SCHEDULE_WORKERS({
      username: user,
    });
    const response = await fetch(url, options);
    const jsonRes = await response.json();
    if (response.status === 200) {
      setWorkers(jsonRes);
    } else {
      alert('ERRO!');
    }
  }

  React.useEffect(() => {
    try {
      getServices();
      getWorkers();
    } catch (error) {
      alert(error);
    }
  }, []);

  return (
    <section className={styles.customerSection}>
      <button onClick={teste}>Click</button>
      {stepForm === 0 ? (
        <CustomerLogin
          loginForm={loginForm}
          passwordForm={passwordForm}
          stepForm={stepForm}
          setStepForm={setStepForm}
          setInfo={setInfo}
          info={info}
        />
      ) : (
        ''
      )}
      {stepForm === 1 ? (
        <CustomerService
          stepForm={stepForm}
          setStepForm={setStepForm}
          setInfo={setInfo}
          info={info}
          services={services}
          setServices={setServices}
        />
      ) : (
        ''
      )}
      {stepForm === 2 ? (
        <CustomerWorker
          stepForm={stepForm}
          setStepForm={setStepForm}
          setInfo={setInfo}
          info={info}
          workers={workers}
          setWorkers={setWorkers}
        />
      ) : (
        ''
      )}
      {stepForm === 3 ? (
        <CustomerSchedule
          stepForm={stepForm}
          setStepForm={setStepForm}
          setInfo={setInfo}
          info={info}
          schedules={schedules}
          setSchedules={setSchedules}
          user={user}
        />
      ) : (
        ''
      )}
      {/* {workers && services && schedules ? 'Nada' : <CustomerLoading />} */}
    </section>
  );
};

export default Customer;
