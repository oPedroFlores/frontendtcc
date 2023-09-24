import React, { useState } from 'react';
import NavBar from './components/NavBar';
import styles from './CSS/Login.module.css';
import Input from './components/Input';
import Btn from './components/ButtonComponent';
import UseForm from '../Hooks/UseForm';
import { USER_REGISTER } from '../api';
import { UserContext } from '../UserContext';
import { Navigate } from 'react-router-dom';

const Login = () => {
  const userLogin = UseForm();
  const passwordLogin = UseForm();
  const emailReg = UseForm('email');
  const nameReg = UseForm();
  const usernameReg = UseForm('username');
  const passwordReg = UseForm('password');
  const [fetchError, setFetchError] = useState(null);
  const [login, setLogin] = useState(true);

  const { userLoginFunc, loading, logged } = React.useContext(UserContext);
  if (logged) return <Navigate to="/perfil" />;
  const handleChange = (param) => {
    setLogin(param);
  };

  async function handleSubmitLogin(event) {
    event.preventDefault();
    if (userLogin.validate() && passwordLogin.validate()) {
      const responseFunc = await userLoginFunc(
        userLogin.value,
        passwordLogin.value,
      );
      if (responseFunc.response.status !== 200) {
        const message = responseFunc.json.message;
        window.localStorage.removeItem('tccuser');
        setFetchError(message);
      } else {
        setFetchError(null);
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
      fetch(url, options);
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
                {loading ? (
                  <Btn disabled>Logar</Btn>
                ) : (
                  <Btn type="submit">Logar</Btn>
                )}
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
