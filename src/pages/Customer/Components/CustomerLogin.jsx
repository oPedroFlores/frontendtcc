import React from 'react';
import styles from '../Customer.module.css';
import Input from '../../components/Input';
import { LOGIN_AUTHENTICATE } from '../../../api';
import Btn from '../../components/ButtonComponent';
import { toast } from 'react-toastify';

const CustomerLogin = ({
  loginForm,
  passwordForm,
  stepForm,
  setStepForm,
  setInfo,
  info,
}) => {
  const [fetchError, setFetchError] = React.useState(null);

  async function handleSubmitLogin(event) {
    event.preventDefault();
    if (loginForm.validate() && passwordForm.validate()) {
      const { url, options } = LOGIN_AUTHENTICATE({
        email: loginForm.value,
        password: passwordForm.value,
      });
      const response = await fetch(url, options);
      const json = await response.json();
      if (response.status === 200) {
        setFetchError(null);
        setInfo({ ...info, token: json.acessToken });
        setStepForm(1);
      } else {
        toast.warning(`Erro! ${json.message}`, {
          position: 'bottom-left',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
        setFetchError(json.message);
      }
    }
  }

  return (
    <div className={styles.stepWrapper}>
      <div className={styles.customerLoginWrapper}>
        <h6>Login</h6>
        <form onSubmit={handleSubmitLogin}>
          <Input label="Email" type="text" name="login" {...loginForm} />
          <Input
            label="Senha"
            type="password"
            name="password"
            {...passwordForm}
          />
          <Btn>Logar</Btn>
        </form>
        {fetchError && <p className={styles.fetchError}>{fetchError}</p>}
      </div>
    </div>
  );
};

export default CustomerLogin;
