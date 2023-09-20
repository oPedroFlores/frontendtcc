import React from 'react';
import NavBar from './components/NavBar';
import axios from 'axios';

const Home = () => {
  const [users, setUsers] = React.useState([]);
  const getUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/users');
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getUsers();
  }, []);

  const handleButtonClick = () => {
    console.log(users);
  };

  return (
    <>
      <NavBar />
      <button onClick={handleButtonClick}>Users</button>
      {users
        ? users.map((user, index) => <p key={index}>{user.username}</p>)
        : ''}
    </>
  );
};

export default Home;
