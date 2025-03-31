import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';

const Register = () => {
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

  const handleRegister = () => {
    axios.post('http://localhost:3000/users', { username, password })
      .then(() => {
        alert('Регистрация успешна');
        navigate('/login');
      })
      .catch(error => {
        console.error('Ошибка регистрации:', error);
      });
  };

  return (
    <div className="register">
      <h1>Регистрация</h1>
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
      <button onClick={handleRegister}>Зарегистрироваться</button>
    </div>
  );
};

export default Register;
