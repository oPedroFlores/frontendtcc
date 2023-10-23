import React from 'react';

const types = {
  email: {
    regex:
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    message: 'Email inválido!',
  },
  username: {
    regex: /^[a-zA-Z\-]+$/,
    message: 'Username inválido!',
  },
  password: {
    regex: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/,
    message:
      'A senha precisa ter entre 7 a 15 caracteres, conter pelo menos um número e um caracter especial!',
  },
};

const UseForm = (type, selectedValue) => {
  const [value, setValue] = React.useState(selectedValue || '');
  const [error, setError] = React.useState(null);

  function validate(value) {
    if (type === 'agenda') {
      if (value.length === 0 || value === '' || value < 0) {
        setValue(0);
      }
      if (value > 24) {
        setValue(24);
      }
    }
    if (type === false) return true;
    if (value === undefined) {
      setError(null); // Campo vazio é considerado válido, então limpe o erro
      return true;
    }
    if (value.length === 0 && type !== 'agenda') {
      setError('Preencha um valor!');
      return false;
    } else if (types[type] && !types[type].regex.test(value)) {
      setError(types[type].message);
      return false;
    } else {
      setError(null);
      return true;
    }
  }

  function onChange({ target }) {
    if (error) validate(target.value);
    setValue(target.value);
  }
  return {
    value,
    setValue,
    onChange,
    error,
    validate: () => validate(value),
    onBlur: () => validate(value),
  };
};

export default UseForm;
