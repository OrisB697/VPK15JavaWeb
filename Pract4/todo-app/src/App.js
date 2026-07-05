import { useDispatch, useSelector } from 'react-redux';
import { logout } from './features/auth/authSlice';
import { clearTodos } from './features/todos/todosSlice';
import LoginForm from './components/LoginForm';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearTodos());
  };

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return (
    <div className="App">
      <header className="app-header">
        <h1>Todo List</h1>
        <div className="user-info">
          <span>Привет, {user?.username || 'Пользователь'}!</span>
          <button onClick={handleLogout} className="logout-btn">Выйти</button>
        </div>
      </header>
      <main>
        <TodoList />
      </main>
    </div>
  );
}

export default App;