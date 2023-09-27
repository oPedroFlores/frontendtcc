import React, { useEffect } from 'react';
import Input from '../../components/Input';
import Btn from '../../components/ButtonComponent';
import UseForm from '../../../Hooks/UseForm';
import styles from '../CSS/Funcionarios.module.css';
import { toast } from 'react-toastify';

const EditWorker = ({ selectedWorkerId, workers, getWorkers }) => {
  let worker = workers.find((worker) => worker.id === selectedWorkerId);
  const [services, setServices] = React.useState([]);

  // Use o UseForm com o valor inicial
  let workerName = UseForm('');

  useEffect(() => {
    // Atualize os valores dos campos do formulário quando selectedWorkerId mudar
    workerName.setValue(worker ? worker.name : '');
    setServices(worker ? worker.services : []);
  }, [selectedWorkerId]);

  async function handleEditWorker(event) {
    event.preventDefault();
    const confirm = window.confirm(
      `Tem certeza que deseja excluir o funcionário ${workerName.value} ?`,
    );
    if (confirm) {
      const localUserString = window.localStorage.getItem('tccuser');
      const localUser = JSON.parse(localUserString);
      const token = localUser.token;

      // const { url, options } = UPDATE_SERVICE(token, {
      //   id: worker.id,
      //   name: workerName.value,
      // });

      // const response = await fetch(url, options);
      // const json = await response.json();
      // if (response.status === 200) {
      //   getServices();
      //   toast.info(`Funcionário ${servName.value} atualizado!`, {
      //     position: 'bottom-left',
      //     autoClose: 5000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: 'dark',
      //   });
      // } else {
      //   toast.error(`ERRO! ${json.message}`, {
      //     position: 'bottom-left',
      //     autoClose: 5000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: 'dark',
      //   });
      // }
    }
  }

  return (
    <form
      onSubmit={handleEditWorker}
      autocomplete="off"
      className={styles.editWorkerForm}
    >
      <Input label="Nome" type="text" name="name" {...workerName} />
      {services
        ? services.map((service) => <p key={service.id}>{service.id}</p>)
        : 'Sem serviços'}
      <Btn>Atualizar</Btn>
    </form>
  );
};

export default EditWorker;
