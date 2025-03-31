import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    
    if (loggedInUser) {
      setUser(loggedInUser);
      navigate('/profile');
    }
  }, [navigate]);

  const handleLogin = () => {
    axios.get('http://localhost:3000/users')
      .then(response => {
        const user = response.data.find(user => user.username === username && user.password === password);
        if (user) {
          alert('Вход успешен');
          localStorage.setItem('user', JSON.stringify(user)); 
          navigate('/profile');
        } else {
          alert('Неверные данные');
        }
      })
      .catch(error => {
        console.error('Ошибка входа:', error);
      });
  };

  return (
    <div className="login">
      <h1>Вход</h1>
      <input
        type="text"
        placeholder="Имя пользователя"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Войти</button>
    </div>
  );
};

export default Login;