import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const history = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    history.push('/login');
  };

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li><Link to="/">Главная</Link></li>
        <li><Link to="/cart">Корзина</Link></li>
        <li><Link to="/profile">Профиль</Link></li>
        <li><Link to="/addProduct">Добавить товар</Link></li>

        {user ? (
          <li>
            <button onClick={handleLogout}>Выйти</button>
          </li>
        ) : (
          <>
            <li><Link to="/login">Войти</Link></li>
            <li><Link to="/register">Зарегистрироваться</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
