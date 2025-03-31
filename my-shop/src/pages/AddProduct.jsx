import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/AddProduct.css';

const categories = ['Электроника', 'Одежда', 'Книги', 'Игрушки'];

const AddProduct = () => {
  const [user, setUser] = useState(null);
  const [product, setProduct] = useState({
    name: '',
    seller: '',
    price: '',
    description: '',
    image: '',
    category: categories[0],
  });

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      alert('Пожалуйста, войдите в систему');
      return;
    }

    const updatedProduct = { ...product, seller: user.username };

    axios.post('http://localhost:3000/products', updatedProduct)
      .then(() => {
        alert('Товар добавлен');
        setProduct({
          name: '',
          seller: user.username,
          price: '',
          description: '',
          image: '',
          category: categories[0],
        });
      })
      .catch(error => console.error('Ошибка добавления товара:', error));
  };

  return (
    <div className="add-product">
      <h1>Добавить товар</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={product.name} onChange={handleInputChange} placeholder="Название" required />
        <input type="number" name="price" value={product.price} onChange={handleInputChange} placeholder="Цена" required />
        <input type="text" name="description" value={product.description} onChange={handleInputChange} placeholder="Описание" required />
        <select name="category" value={product.category} onChange={handleInputChange}>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <button type="submit">Добавить</button>
      </form>
    </div>
  );
};

export default AddProduct;
