import React, { useEffect } from 'react';
import Input from '../../components/Input';
import Btn from '../../components/ButtonComponent';
import UseForm from '../../../Hooks/UseForm';
import styles from '../CSS/Funcionarios.module.css';
import { toast } from 'react-toastify';
import { GET_SERVICES } from '../../../api';

const EditWorker = ({ selectedWorkerId, workers, getWorkers }) => {
  let worker = workers.find((worker) => worker.id === selectedWorkerId);
  const [services, setServices] = React.useState([]);
  const [allServices, setAllServices] = React.useState([]);
  const [filteredServices, setFilteredServices] = React.useState([]);


  // Token
  const localUserString = window.localStorage.getItem('tccuser');
  const localUser = JSON.parse(localUserString);
  const token = localUser.token;

  // Definindo todos os serviços deste cliente
  async function getAllServices(){
    const { url, options } = GET_SERVICES(token);

    const response = await fetch(url, options);
    const jsonRes = await response.json();
    setAllServices(jsonRes)
  }

  React.useState(()=> {
    getAllServices();
    if (allServices && services) {
      // Filtrar os serviços que não estão em "services"
      const servicesNotInList = allServices.filter((service) => !services.includes(service.serviceID));
      setFilteredServices(servicesNotInList);
    } else {
      setFilteredServices(allServices);
    }
  },[allServices, services])

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

  function verificar() {
    console.log("Services")
    console.log(services)
    console.log("All services:")
    console.log(allServices)
    console.log(services)
    console.log("filteredServices:")
    console.log(filteredServices)
  }

  return (
    <div>
      
    <form
      onSubmit={handleEditWorker}
      autocomplete="off"
      className={styles.editWorkerForm}
    >
      <Input label="Nome" type="text" name="name" {...workerName} />
      <div>
      {allServices
        ? allServices.map((service) => 
        <div key={service.id} className={services.includes(service.id) ? `${styles.disabledAddService}` : ''}>
          <p>{service.name}</p>
            <button onClick={verificar}>Adicionar</button>
          </div>
        )
        : 'Sem serviços para adicionar'}
        </div>
      <Btn>Atualizar</Btn>
    </form>
    </div>
  );
};

export default EditWorker;
