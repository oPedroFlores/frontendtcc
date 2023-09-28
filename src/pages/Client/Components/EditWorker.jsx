import React, { useEffect } from 'react';
import Input from '../../components/Input';
import Btn from '../../components/ButtonComponent';
import UseForm from '../../../Hooks/UseForm';
import styles from '../CSS/Funcionarios.module.css';
import { toast } from 'react-toastify';
import { UPDATE_WORKER, WORKER_SERVICES } from '../../../api';

const EditWorker = ({ selectedWorkerId, workers, getWorkers, switchButtonFun }) => {
  let worker = null;
  if(workers) worker = workers.find((worker) => worker.id === selectedWorkerId) || [];
  const [services, setServices] = React.useState([]);
  const [workerServices, setWorkerServices] = React.useState();
  // Token
  const localUserString = window.localStorage.getItem('tccuser');
  const localUser = JSON.parse(localUserString);
  const token = localUser.token;

  // Use o UseForm com o valor inicial
  let workerName = UseForm('');

  // Definindo todos os serviços deste cliente
  async function getAllServices() {
    if (!worker) return;
    const { url, options } = WORKER_SERVICES(token, {
      workerId: worker.id,
    });
    const response = await fetch(url, options);
    let jsonRes = await response.json();
    if(jsonRes.length > 0){
      setWorkerServices(jsonRes);

    }
  }

  useEffect(() => {
    getAllServices();
    // Atualize os valores dos campos do formulário quando selectedWorkerId mudar
    if (!worker) return;
    workerName.setValue(worker ? worker.name : '');
    if (worker) {
      setServices(worker.services);
    } else {
      setServices([]);
    }
  }, [selectedWorkerId, services, worker]);

  async function handleEditWorker(event) {
    event.preventDefault();
    const confirm = window.confirm(
      `Tem certeza que deseja alterar o funcionário ${worker.name} ?`,
    );
    if (confirm) {
      const localUserString = window.localStorage.getItem('tccuser');
      const localUser = JSON.parse(localUserString);
      const token = localUser.token;

      for (const serv of workerServices) {
        serv.workerID = worker.id;
        serv.serviceID = serv.id;
      }

      const { url, options } = UPDATE_WORKER(token, {
        name: workerName.value,
        id: worker.id,
        services: [workerServices],
      });
      const response = await fetch(url, options);
      const json = await response.json();
      if(response.status === 202){
        getWorkers();
        switchButtonFun(0);
          toast.info(`Funcionário ${worker.name} atualizado!`, {
            position: 'bottom-left',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
          });
      }else{
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

  const [serviceAddedChanged, setServiceAddedChanged] = React.useState(false);

  function changeAdded(id) {
    for (const workerService of workerServices) {
      if (workerService.id === id) {
        if (workerService.added === 'true') {
          workerService.added = 'false';
          setServiceAddedChanged(!serviceAddedChanged);
        } else {
          workerService.added = 'true';
          setServiceAddedChanged(!serviceAddedChanged);
        }
      }
    }
  }

  return (
    <form
      onSubmit={handleEditWorker}
      autocomplete="off"
      className={styles.editWorkerForm}
    >
      <Input label="Nome" type="text" name="name" {...workerName} />
      <p>Serviços</p>
      <div className={styles.workerServicesDiv}>
        {workerServices !== undefined
          ? workerServices.map((service, index) => (
              <div
                className={
                  service.added === 'true'
                    ? `${styles.addedDiv}`
                    : `${styles.notAddedDiv}`
                }
                onClick={() => changeAdded(service.id)}
              >
                {service.name}
              </div>
            ))
          : 'Carregando...'}
      </div>
     
      <Btn>Atualizar</Btn>
    </form>
  );
};

export default EditWorker;
