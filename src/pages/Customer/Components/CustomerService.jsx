import React from 'react';
import { motion } from 'framer-motion';

import styles from '../Customer.module.css';
const CustomerService = ({
  services,
  stepForm,
  setStepForm,
  info,
  setInfo,
}) => {
  const [reload, setReload] = React.useState(false);

  function handleSelectedService(id) {
    info.service = id;
    setReload(!reload);
    setStepForm(2);
  }

  function backStep() {
    setStepForm(0);
  }

  return (
    <div className={styles.stepWrapper}>
      <div className={styles.servicesWrapper}>
        <button onClick={backStep}>Voltar</button>
        <h3>Selecione o serviço desejado</h3>
        <div className={styles.servicesDivs}>
          {services
            ? services.map((service, index) => (
                <motion.div
                  key={index}
                  className={`${styles.serviceCard} ${
                    info.service === service.id ? styles.selectedService : ''
                  }`}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  initial={{ x: 25 * index }}
                  animate={{ x: 0 }}
                  onClick={() => handleSelectedService(service.id)}
                >
                  {service.name}
                </motion.div>
              ))
            : 'Carregando...!'}
        </div>
      </div>
    </div>
  );
};

export default CustomerService;
