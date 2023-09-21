import React from 'react';
import styles from '../CSS/Funcionarios.module.css';
import Input from '../../../pages/components/Input';
import Btn from '../../../pages/components/ButtonComponent';
import UseForm from '../../../Hooks/UseForm';
import { SET_WORKER } from '../../../api';
const FuncList = ({ workers, getWorkers }) => {
  const localUserString = window.localStorage.getItem('tccuser');
  const localUser = JSON.parse(localUserString);
  const token = localUser.token;

  const [loading, setLoading] = React.useState(false);
  const workerName = UseForm();

  function deleteWorker(id, name) {
    const confirm = window.confirm(
      `Tem certeza que deseja excluir o funcionário ${name} ?`,
    );
    console.log(confirm);
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
      if (response.status !== 201) {
        return alert(`Erro: ${json}`);
      } else {
        alert(`O funcionário ${workerName.value} foi inserido com sucesso!`);
        getWorkers();
      }
    }
  }

  return (
    <div className={styles.divWorkersCard}>
      <form onSubmit={handleSubmitRegister}>
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
            <div key={index} className={styles.workerCard}>
              {worker.name}
              <div className={styles.workerCardActions}>
                <button onClick={() => editeWorker(worker)}>Editar</button>
                <button onClick={() => deleteWorker(worker.id, worker.name)}>
                  Excluir
                </button>
              </div>
            </div>
          ))
        : 'Não há funcionários para serem mostrados!'}
    </div>
  );
};

export default FuncList;
