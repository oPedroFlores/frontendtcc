import React from 'react';
import styles from '../CSS/Funcionarios.module.css';
import Input from '../../../pages/components/Input';
import Btn from '../../../pages/components/ButtonComponent';
import UseForm from '../../../Hooks/UseForm';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

import { DELETE_WORKER, SET_WORKER } from '../../../api';
const FuncList = ({ workers, getWorkers, setSelectedServiceId }) => {
  const localUserString = window.localStorage.getItem('tccuser');
  const localUser = JSON.parse(localUserString);
  const token = localUser.token;

  const [loading, setLoading] = React.useState(false);
  const workerName = UseForm();

  async function deleteWorker(id, name) {
    const confirm = window.confirm(
      `Tem certeza que deseja excluir o funcionário ${name} ?`,
    );
    if (confirm) {
      const localUserString = window.localStorage.getItem('tccuser');
      const localUser = JSON.parse(localUserString);
      const token = localUser.token;

      const { url, options } = DELETE_WORKER(token, {
        workerId: id,
      });

      const response = await fetch(url, options);
      const json = await response.json();
      if (response.status === 202) {
        getWorkers();
        toast.warning(`Funcionário ${name} deletado!`, {
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
  }

  function editeWorker(worker) {
    console.log(worker);
  }

  async function handleSubmitRegister(event) {
    event.preventDefault();
    const name = workerName.value;
    if (name.length < 3)
      return alert('O nome precisa conter pelo menos 3 caracteres!');

    if (workerName.validate()) {
      const { url, options } = await SET_WORKER(token, {
        name: workerName.value,
      });
      const response = await fetch(url, options);
      const json = await response.json();
      if (response.status === 201) {
        getWorkers();
        toast.info(`Funcionário ${name} criado!`, {
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
  }

  return (
    <div className={styles.divWorkersCard}>
      <form onSubmit={handleSubmitRegister} autocomplete="off">
        <div className={styles.workerForm}>
          <Input
            label="Nome do funcionário"
            type="text"
            name="name"
            {...workerName}
          />
          <div>
            {loading ? (
              <Btn disabled>Cadastrar</Btn>
            ) : (
              <Btn type="submit">Cadastrar</Btn>
            )}
          </div>
        </div>
      </form>
      {workers
        ? workers.map((worker, index) => (
            <motion.div
              key={index}
              className={styles.workerCard}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
              initial={{ x: 150 + 150 * index }}
              animate={{ x: 0 }}
            >
              {worker.name}
              <div className={styles.workerCardActions}>
                <button onClick={() => editeWorker(worker.id)}>Editar</button>
                <button onClick={() => deleteWorker(worker.id, worker.name)}>
                  Excluir
                </button>
              </div>
            </motion.div>
          ))
        : 'Não há funcionários para serem mostrados!'}
    </div>
  );
};

export default FuncList;
