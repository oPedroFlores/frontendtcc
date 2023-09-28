import React, { useEffect } from 'react';
import Input from '../../components/Input';
import Btn from '../../components/ButtonComponent';
import UseForm from '../../../Hooks/UseForm';
import { UPDATE_SERVICE } from '../../../api';
import { toast } from 'react-toastify';

const EditServ = ({ selectedServiceId, services, getServices }) => {
  let service = null;
  if(services){
    service = services.find((service) => service.id === selectedServiceId) || [];
  }

  // Use o UseForm com o valor inicial
  let servName = UseForm('');
  let servPrice = UseForm('');
  let servDescription = UseForm('');

  useEffect(() => {
    // Atualize os valores dos campos do formulário quando selectedServiceId mudar
    servName.setValue(service ? service.name : '');
    servPrice.setValue(service ? service.price : '');
    servDescription.setValue(service ? service.description : '');
  }, [selectedServiceId]);

  async function handleEditServ(event) {
    event.preventDefault();
    const confirm = window.confirm(
      `Tem certeza que deseja excluir o serviço ${servName.value} ?`,
    );
    if (confirm) {
      const localUserString = window.localStorage.getItem('tccuser');
      const localUser = JSON.parse(localUserString);
      const token = localUser.token;
      if(!service) return;
      const { url, options } = UPDATE_SERVICE(token, {
        id: service.id,
        name: servName.value,
        price: servPrice.value,
        desc: servDescription.value,
      });

      const response = await fetch(url, options);
      const json = await response.json();
      if (response.status === 200) {
        getServices();
        toast.info(`Funcionário ${servName.value} atualizado!`, {
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
    <form onSubmit={handleEditServ} autocomplete="off">
      <Input label="Nome" type="text" name="name" {...servName} />
      <Input
        label="Preço"
        type="number"
        name="price"
        autocomplete="off"
        {...servPrice}
      />
      <Input
        label="Descrição"
        type="textarea"
        name="description"
        {...servDescription}
      />
      <Btn>Atualizar</Btn>
    </form>
  );
};

export default EditServ;
