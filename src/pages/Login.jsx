import React, { useState } from 'react';
import NavBar from './components/NavBar';
import styles from './CSS Components/Login.module.css';
import Input from './components/Input';
import Btn from './components/ButtonComponent';
import UseForm from '../Hooks/UseForm';
import { LOGIN_AUTHENTICATE, USER_REGISTER } from '../api';

const Login = () => {
  const userLogin = UseForm();
  const passwordLogin = UseForm();
  const emailReg = UseForm('email');
  const nameReg = UseForm();
  const usernameReg = UseForm('username');
  const passwordReg = UseForm('password');
  const [fetchError, setFetchError] = useState(null);
  const [login, setLogin] = useState(true);

  const handleChange = (param) => {
    setLogin(param);
  };

  async function handleSubmitLogin(event) {
    event.preventDefault();

    if (userLogin.validate() && passwordLogin.validate()) {
      const { url, options } = LOGIN_AUTHENTICATE({
        email: userLogin.value,
        password: passwordLogin.value,
      });
      const response = await fetch(url, options);
      const json = await response.json();
      if (response.status !== 200) {
        const message = json.message;
        setFetchError(message);
        return;
      } else {
        setFetchError(null);
        const userStorage = {
          username: json.username,
          email: json.email,
          token: json.acessToken,
          name: json.name,
        };
        localStorage.setItem('tccuser', JSON.stringify(userStorage));
        console.log('Certo!');
        return;
      }
    }
  }

  async function handleSubmitRegister(event) {
    event.preventDefault();

    if (
      emailReg.validate() &&
      nameReg.validate() &&
      usernameReg.validate() &&
      passwordReg.validate()
    ) {
      const { url, options } = USER_REGISTER({
        email: emailReg.value,
        name: nameReg.value,
        username: usernameReg.value,
        password: passwordReg.value,
      });
      const response = await fetch(url, options);
      const json = await response.json();
      console.log(json);
    }
  }

  return (
    <>
      <NavBar />
      <div className={styles.section}>
        <div className={styles.wrapper}>
          <div className={styles.wrraperbutons}>
            <button
              onClick={() => handleChange(1)}
              className={`${styles.button} ${
                login ? '' : styles.disabledbutton
              }`}
            >
              Login
            </button>
            <button
              onClick={() => handleChange(0)}
              className={`${styles.button} ${
                login ? styles.disabledbutton : ''
              }`}
            >
              Registro
            </button>
          </div>
          {login ? (
            <form onSubmit={handleSubmitLogin}>
              <div className={styles.formWrapper}>
                <Input
                  label="Email ou username"
                  type="text"
                  name="login"
                  {...userLogin}
                />
                <Input
                  label="Senha"
                  type="password"
                  name="password"
                  {...passwordLogin}
                />
                <Btn type="submit">Logar</Btn>
                {fetchError && (
                  <p className={styles.fetchError}>{fetchError}</p>
                )}
              </div>
            </form>
          ) : (
            <form onSubmit={handleSubmitRegister}>
              <div className={styles.formWrapper}>
                <Input label="Email" type="email" name="email" {...emailReg} />
                <Input label="Nome" type="text" name="name" {...nameReg} />
                <Input
                  label="Username"
                  type="text"
                  name="username"
                  {...usernameReg}
                />
                <Input
                  label="Senha"
                  type="password"
                  name="password"
                  {...passwordReg}
                />
                <Btn>Enviar</Btn>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
