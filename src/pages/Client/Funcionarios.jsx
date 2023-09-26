import React from 'react';
import ClientNavBar from './Components/ClientNavBar';
import styles from './CSS/Funcionarios.module.css';
import { GET_WORKERS } from '../../api';
import FuncList from './Components/FuncList';
import { motion } from 'framer-motion';
import EditWorker from './Components/EditWorker';

const Funcionarios = () => {
  const [switchButton, setSwitchButton] = React.useState(0);
  const [workers, setWorkers] = React.useState([]);

  // Edit form
  const [selectedWorkerId, setSelectedWorkerId] = React.useState();

  const handleWorkerSelectChange = (event) => {
    const selectedId = Number(event.target.value);
    setSelectedWorkerId(selectedId);
  };

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
            <FuncList
              workers={workers}
              getWorkers={getWorkers}
              setSelectedWorkerId={setSelectedWorkerId}
              setSwitchButton={setSwitchButton}
            />
          </div>
        ) : (
          // Editar
          <div className={styles.editFunc}>
            <select
              name="workerSelect"
              id="workerSelect"
              value={selectedWorkerId}
              onChange={handleWorkerSelectChange}
            >
              <option value="" selected="selected" disabled>
                Selecione um trabalhador
              </option>
              {workers.map((worker) => (
                <option
                  key={worker.id}
                  value={worker.id}
                  nameValue={worker.name}
                >
                  {worker.name}
                </option>
              ))}
            </select>
            <EditWorker
              selectedWorkerId={selectedWorkerId}
              workers={workers}
              getWorkers={getWorkers}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Funcionarios;
