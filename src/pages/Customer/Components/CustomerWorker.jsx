import React from 'react';
import styles from '../Customer.module.css';

const CustomerWorker = ({ workers, stepForm, setStepForm, info, setInfo }) => {
  function backStep() {
    info.worker = undefined;
    setReload(!reload);

    setStepForm(1);
  }

  const [reload, setReload] = React.useState(false);

  function handleSelectedWorker(worker, hasService) {
    if (hasService) {
      setReload(!reload);
      info.worker = worker.id;
      setStepForm(3);
    }
  }

  return (
    <div className={styles.stepWrapper}>
      <div className={styles.customerWorkersWrapper}>
        <button onClick={backStep}>Voltar</button>
        <h3>Selecione o funcionário desejado</h3>
        <div className={styles.servicesDivs}>
          {workers
            ? workers.map((worker, index) => {
                const isSelectedWorker = info.worker === worker.id;
                let hasService = false;
                for (const service of worker.services) {
                  if (service.serviceID === info.service) {
                    hasService = true;
                  }
                }

                return (
                  <div
                    key={index}
                    className={`${styles.workerCard} ${
                      isSelectedWorker ? styles.selectedWorker : ''
                    } ${hasService ? styles.hasService : ''}`}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    initial={{ x: 25 * index }}
                    animate={{ x: 0 }}
                    onClick={() => handleSelectedWorker(worker, hasService)}
                  >
                    {worker.name}
                  </div>
                );
              })
            : 'Carregando...!'}
        </div>
      </div>
    </div>
  );
};

export default CustomerWorker;
