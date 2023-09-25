import React from 'react';
import { AUTO_LOGIN, LOGIN_AUTHENTICATE } from './api';
import { useNavigate } from 'react-router-dom';
export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [logged, setLogged] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const navigate = useNavigate();

  async function userLoginFunc(email, password) {
    setError(null);
    setLoading(true);
    const { url, options } = LOGIN_AUTHENTICATE({
      email: email,
      password: password,
    });
    const response = await fetch(url, options);
    const json = await response.json();
    const resStatus = response.status;
    if (resStatus === 200) {
      const userStorage = {
        username: json.username,
        email: json.email,
        token: json.acessToken,
        role: json.role,
        name: json.name,
      };
      localStorage.setItem('tccuser', JSON.stringify(userStorage));
      switch (Number(userStorage.role)) {
        case 0:
          navigate('/perfil');
          break;
        case 1:
          navigate('/client/dashboard');
          break;
        case 2:
          navigate('/client/dashboard');
          break;

        default:
          console.log(userStorage.role);
          navigate('/perfil');
          break;
      }
      setData(userStorage);
      setLogged(true);
    } else {
      setData(null);
      setLogged(false);
    }
    setLoading(false);
    return { response, json };
  }

  async function userLogout() {
    setData(null);
    setError(null);
    setLoading(false);
    setLogged(false);
    window.localStorage.removeItem('tccuser');
    navigate('/login');
  }

  React.useEffect(() => {
    async function handleLogin() {
      const localUserString = window.localStorage.getItem('tccuser');
      const localUser = JSON.parse(localUserString);
      if (localUser && localUser.token) {
        try {
          setError(null);
          setLoading(true);
          const token = localUser.token;
          const { url, options } = AUTO_LOGIN(token);
          const response = await fetch(url, options);
          const json = await response.json();
          if (response.status === 201) {
            const userStorage = {
              username: json.username,
              email: json.email,
              token: json.acessToken,
              role: json.role,
              name: json.name,
            };
            setData(userStorage);
            console.log(json.role);
            switch (Number(userStorage.role)) {
              case 0:
                navigate('/perfil');
                break;
              case 1:
                navigate('/client/dashboard');
                break;
              case 2:
                navigate('/client/dashboard');
                break;

              default:
                console.log(userStorage.role);
                navigate('/perfil');
                break;
            }
          } else {
            throw new Error('Erro na autenticação!');
          }
        } catch (error) {
          userLogout();
        } finally {
          setLoading(false);
        }
      }
    }
    handleLogin();
  }, []);

  return (
    <UserContext.Provider
      value={{ userLoginFunc, data, userLogout, loading, logged }}
    >
      {children}
    </UserContext.Provider>
  );
};
