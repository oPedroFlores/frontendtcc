import React from 'react';
import ClientNavBar from './Components/ClientNavBar';
import styles from './CSS/Funcionarios.module.css';
import { GET_WORKERS } from '../../api';
import FuncList from './Components/FuncList';
const Funcionarios = () => {
  const [switchButton, setSwitchButton] = React.useState(0);
  const [workers, setWorkers] = React.useState([]);

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
        <div className={styles.switchFunc}>
          <button
            onClick={() => switchButtonFun(0)}
            className={`${switchButton ? `${styles.disabledButton}` : ''}`}
          >
            Listar
          </button>
          <button
            onClick={() => switchButtonFun(1)}
            className={`${switchButton ? '' : `${styles.disabledButton}`}`}
          >
            Editar
          </button>
        </div>
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
