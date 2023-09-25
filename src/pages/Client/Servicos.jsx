import React from 'react';
import ClientNavBar from './Components/ClientNavBar';
import styles from './CSS/Servicos.module.css';
import { motion } from 'framer-motion';
import ServList from './Components/ServList';
import { GET_SERVICES } from '../../api';
import EditServ from './Components/EditServ';

const Servicos = () => {
  const [switchButton, setSwitchButton] = React.useState(0);
  const [services, setServices] = React.useState([]);
  // Edit form
  const [selectedServiceId, setSelectedServiceId] = React.useState();

  const handleServiceSelectChange = (event) => {
    const selectedId = Number(event.target.value);
    setSelectedServiceId(selectedId);
  };

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
    setSelectedServiceId(jsonRes[0].id);
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
            <ServList
              services={services}
              getServices={getServices}
              setSelectedServiceId={setSelectedServiceId}
              setSwitchButton={setSwitchButton}
            />
          </div>
        ) : (
          <div className={styles.editServ}>
            <select
              name="serviceSelect"
              id="serviceSelect"
              value={selectedServiceId}
              onChange={handleServiceSelectChange}
            >
              <option value="" selected="selected" disabled>
                Selecione um serviço
              </option>
              {services.map((service) => (
                <option
                  key={service.id}
                  value={service.id}
                  priceValue={service.price}
                  nameValue={service.name}
                  descriptionValue={service.description}
                >
                  {service.name}
                </option>
              ))}
            </select>
            <EditServ
              selectedServiceId={selectedServiceId}
              services={services}
              getServices={getServices}
            />
          </div>
        )}
      </section>
    </>
  );
};

export default Servicos;
