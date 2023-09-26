import React from 'react';
import styles from '../CSS/Servicos.module.css';
import Input from '../../../pages/components/Input';
import Btn from '../../../pages/components/ButtonComponent';
import UseForm from '../../../Hooks/UseForm';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { DELETE_SERVICE, SET_SERVICE } from '../../../api';

const ServList = ({
  services,
  getServices,
  setSelectedServiceId,
  setSwitchButton,
}) => {
  const localUserString = window.localStorage.getItem('tccuser');
  const localUser = JSON.parse(localUserString);
  const token = localUser.token;

  const serviceName = UseForm();
  const servicePrice = UseForm();
  const serviceDesc = UseForm();
  const [loading, setLoading] = React.useState(false);

  async function deleteService(id, name) {
    const confirm = window.confirm(
      `Tem certeza que deseja excluir o serviço ${name} ?`,
    );
    if (confirm) {
      const localUserString = window.localStorage.getItem('tccuser');
      const localUser = JSON.parse(localUserString);
      const token = localUser.token;

      const { url, options } = DELETE_SERVICE(token, {
        serviceId: id,
      });
      const response = await fetch(url, options);
      const json = await response.json();
      if (response.status === 202) {
        getServices();
        toast.warning(`Serviço ${name} deletado!`, {
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

  function editService(service) {
    setSwitchButton(1);
    setSelectedServiceId(service);
  }

  async function handleSubmitRegister(event) {
    event.preventDefault();
    const name = serviceName.value;
    if (name.length < 3)
      return alert('O serviço precisa conter pelo menos 3 caracteres!');

    if (
      serviceName.validate() &&
      servicePrice.validate() &&
      serviceDesc.validate()
    ) {
      const { url, options } = await SET_SERVICE(token, {
        name: serviceName.value,
        price: servicePrice.value,
        desc: serviceDesc.value,
      });
      const response = await fetch(url, options);
      const json = await response.json();
      if (response.status === 201) {
        serviceName.setValue('');
        serviceDesc.setValue('');
        servicePrice.setValue('');
        getServices();
        toast.info(`Serviço ${name} criado!`, {
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
    <div className={styles.divServicesCard}>
      <form onSubmit={handleSubmitRegister} autocomplete="off">
        <div className={styles.serviceForm}>
          <Input
            label="Nome do serviço"
            type="text"
            name="name"
            {...serviceName}
          />
          <Input label="Descrição" type="text" name="desc" {...serviceDesc} />
          <Input label="Preço" type="number" name="price" {...servicePrice} />
          <div>
            {loading ? (
              <Btn disabled>Cadastrar</Btn>
            ) : (
              <Btn type="submit">Cadastrar</Btn>
            )}
          </div>
        </div>
      </form>
      {services
        ? services.map((service, index) => (
            <motion.div
              key={index}
              className={styles.serviceCard}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
              initial={{ x: 150 + 150 * index }}
              animate={{ x: 0 }}
            >
              <h2>{service.name}</h2>

              <div className={styles.serviceCardActions}>
                <button onClick={() => editService(service.id)}>Editar</button>
                <button onClick={() => deleteService(service.id, service.name)}>
                  Excluir
                </button>
              </div>
            </motion.div>
          ))
        : 'Não há serviços para serem mostrados!'}
    </div>
  );
};

export default ServList;
