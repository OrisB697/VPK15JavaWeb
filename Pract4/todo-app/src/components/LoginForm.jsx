import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/auth/authSlice';

function LoginForm() {
  const [username, setUsername] = useState('testuser');  // Предзаполнено для удобства
  const [password, setPassword] = useState('testpassword');  // Предзаполнено
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ username, password }));
  };

  return (
    <div className="login-container">
      <h2>Форма входа</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Логин</label>
          <input
            type="text"
            placeholder="Введите логин"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Пароль</label>
          <input
            type="password"
            placeholder="Введите пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Вход...' : 'Войти'}
        </button>
        {error && <p className="error"> {error}</p>}
      </form>
      <div className="hint">
        <p>Тестовый пользователь:</p>
        <p>Логин: <strong>testuser</strong></p>
        <p>Пароль: <strong>testpassword</strong></p>
      </div>
    </div>
  );
}

export default LoginForm;