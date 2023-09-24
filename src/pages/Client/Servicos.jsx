import React from 'react';
import ClientNavBar from './Components/ClientNavBar';
import styles from './CSS/Servicos.module.css';
import { motion } from 'framer-motion';
import ServList from './Components/ServList';
import { GET_SERVICES } from '../../api';

const Servicos = () => {
  const [switchButton, setSwitchButton] = React.useState(0);
  const [services, setServices] = React.useState([]);

  function switchButtonFun(option) {
    setSwitchButton(option);
  }

  async function getServices() {
    const localUserString = window.localStorage.getItem('tccuser');
    const localUser = JSON.parse(localUserString);
    const token = localUser.token;

    const { url, options } = GET_SERVICES(token);

    const response = await fetch(url, options);
    const jsonRes = await response.json();
    setServices(jsonRes);
  }

  React.useState(() => {
    getServices();
  }, []);

  return (
    <>
      <ClientNavBar />
      <section className={styles.servicesSection}>
        <motion.div className={styles.switchServ}>
          <motion.button
            onClick={() => switchButtonFun(0)}
            className={`${switchButton ? `${styles.disabledButton}` : ''}`}
          >
            Listar
          </motion.button>
          <motion.button
            onClick={() => switchButtonFun(1)}
            className={`${switchButton ? '' : `${styles.disabledButton}`}`}
          >
            Editar
          </motion.button>
        </motion.div>
        {!switchButton ? (
          <div className={styles.servList}>
            <ServList services={services} getServices={getServices} />
          </div>
        ) : (
          <>Editar</>
        )}
      </section>
    </>
  );
};

export default Servicos;
