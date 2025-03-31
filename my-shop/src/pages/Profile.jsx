import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));

    if (loggedInUser) {
      setUser(loggedInUser);

      axios.get(`http://localhost:3000/users/${loggedInUser.id}`)
        .then(response => setUser(response.data))
        .catch(error => console.error('Ошибка загрузки профиля:', error));

      axios.get(`http://localhost:3000/orders?userId=${loggedInUser.id}`)
        .then(response => setOrders(response.data))
        .catch(error => console.error('Ошибка загрузки заказов:', error));
    }
  }, []);

  const handleOrderClick = (orderId) => {
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder(null);
    } else {
      const order = orders.find(order => order.id === orderId);
      setSelectedOrder(order);
    }
  };

  return (
    <div className="profile">
      <h1>Профиль</h1>
      {user ? (
        <div className="profile-info">
          <p><strong>Имя:</strong> {user.username}</p>
        </div>
      ) : <p>Вы не вошли в аккаунт</p>}
      
      <h2>Оформленные заказы</h2>
      {orders.length === 0 ? <p>У вас нет заказов</p> : (
        <ul>
          {orders.map(order => (
            <li key={order.id} onClick={() => handleOrderClick(order.id)} style={{ cursor: 'pointer' }}>
              Заказ #{order.id} - {order.total} $
            </li>
          ))}
        </ul>
      )}

      {selectedOrder && (
        <div className="order-details">
          <h3>Детали заказа #{selectedOrder.id}</h3>
          <p><strong>Товары:</strong></p>
          <ul>
            {selectedOrder.items.map((item, index) => (
              <li key={index}>{item.name} - {item.quantity} x {item.price} $</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Profile;
