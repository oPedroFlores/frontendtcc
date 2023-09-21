import './App.css';
import { UserStorage } from './UserContext';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <UserStorage>
      <div className="App">
        <Outlet />
      </div>
    </UserStorage>
  );
}

export default App;
