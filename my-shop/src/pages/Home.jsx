import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Home.css';

const categories = ['Все', 'Электроника', 'Одежда', 'Книги', 'Игрушки'];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Все');

  useEffect(() => {
    axios.get('http://localhost:3000/products')
      .then(response => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch(error => console.error('Ошибка загрузки товаров:', error));
  }, []);

  const addToCart = (product) => {
    axios.post('http://localhost:3000/cart', product)
      .then(() => alert('Товар добавлен в корзину'))
      .catch(error => console.error('Ошибка добавления в корзину:', error));
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    if (category === 'Все') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === category));
    }
  };

  return (
    <div className="home">
      <h1>Товары</h1>
      <div className="filter-container">
        <select name="category" value={selectedCategory} onChange={handleCategoryChange}>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </div>
      <div className="products">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <h2>{product.name}</h2>
            <p>{product.seller}</p>
            <p>{product.description}</p>
            <p><strong>{product.price} $</strong></p>
            <p><em>{product.category}</em></p>
            <button onClick={() => addToCart(product)}>Добавить в корзину</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
