import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './Customer.module.css';
import CustomerLoading from './CustomerLoading';
import UseForm from '../../Hooks/UseForm';
import CustomerLogin from './Components/CustomerLogin';
import CustomerService from './Components/CustomerService';
import { GET_SCHEDULE_SERVICES } from '../../api';

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
    timestamp: undefined,
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
    const { url, options } = GET_SCHEDULE_SERVICES();

    const response = await fetch(url, options);
    const jsonRes = await response.json();
    console.log(jsonRes);
  }

  React.useEffect(() => {
    getServices();
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
        />
      ) : (
        ''
      )}
      {/* {workers && services && schedules ? 'Nada' : <CustomerLoading />} */}
    </section>
  );
};

export default Customer;
