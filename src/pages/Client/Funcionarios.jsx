import React from 'react';
import ClientNavBar from './Components/ClientNavBar';
import styles from './CSS/Funcionarios.module.css';
import { GET_WORKERS } from '../../api';
import FuncList from './Components/FuncList';
import { motion } from 'framer-motion';

const Funcionarios = () => {
  const [switchButton, setSwitchButton] = React.useState(0);
  const [workers, setWorkers] = React.useState([]);

  const motionAnimations = {
    initialPosition: { scale: 0 },
    variantStart: { scale: 1 },
    variantStart2: { x: 0, scale: 0.8 },
  };

  function switchButtonFun(option) {
    setSwitchButton(option);
  }

  React.useEffect(() => {
    getWorkers();
  }, [switchButton]);

  async function getWorkers() {
    const localUserString = window.localStorage.getItem('tccuser');
    const localUser = JSON.parse(localUserString);
    const token = localUser.token;

    const { url, options } = GET_WORKERS(token);

    const response = await fetch(url, options);
    const jsonRes = await response.json();
    setWorkers(jsonRes);
  }

  return (
    <div>
      <ClientNavBar />
      <div className={styles.divFunc}>
        <motion.div className={styles.switchFunc}>
          <motion.button
            onClick={() => switchButtonFun(0)}
            className={`${switchButton ? `${styles.disabledButton}` : ''}`}
            variants={motionAnimations}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            initial="initialPosition"
            animate={`${switchButton ? 'variantStart2' : 'variantStart'}`}
          >
            Listar
          </motion.button>
          <motion.button
            onClick={() => switchButtonFun(1)}
            className={`${switchButton ? '' : `${styles.disabledButton}`}`}
            variants={motionAnimations}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            initial="initialPosition"
            animate={`${switchButton ? 'variantStart' : 'variantStart2'}`}
          >
            Editar
          </motion.button>
        </motion.div>
        {!switchButton ? (
          <div className={styles.funcList}>
            <FuncList workers={workers} getWorkers={getWorkers} />
          </div>
        ) : (
          <>Editar</>
        )}
      </div>
    </div>
  );
};

export default Funcionarios;
