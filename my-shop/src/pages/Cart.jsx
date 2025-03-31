import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser) {
      setUser(loggedInUser);
    }

    axios.get('http://localhost:3000/cart')
      .then(response => setCartItems(response.data))
      .catch(error => console.error('Ошибка загрузки корзины:', error));
  }, []);

  const removeFromCart = (id) => {
    axios.delete(`http://localhost:3000/cart/${id}`)
      .then(() => setCartItems(cartItems.filter(item => item.id !== id)))
      .catch(error => console.error('Ошибка удаления товара:', error));
  };

  const handleCheckout = () => {
    if (!user) {
      alert('Пожалуйста, войдите в систему для оформления заказа');
      return;
    }

    axios.post('http://localhost:3000/orders', { 
      userId: user.id, 
      items: cartItems 
    })
      .then(() => {
        alert('Заказ оформлен!');
        setCartItems([]);
      })
      .catch(error => console.error('Ошибка оформления заказа:', error));
  };

  return (
    <div className="cart">
      <h1>Корзина</h1>
      {cartItems.length === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <h2>{item.name}</h2>
              <p>{item.seller}</p>
              <p><strong>{item.price} $</strong></p>
              <button onClick={() => removeFromCart(item.id)}>Удалить</button>
            </div>
          ))}
        </div>
      )}
      {cartItems.length > 0 && (
        <button className="checkout-btn" onClick={handleCheckout}>Оформить заказ</button>
      )}
    </div>
  );
};

export default Cart;
