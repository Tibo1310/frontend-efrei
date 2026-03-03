import React from 'react';
import eventBus from 'shared/eventBus';
import './Catalog.css';

const PRODUCTS = [
  { id: 1, name: 'Skin Silver', price: 9.99, emoji: '🐉' },
  { id: 2, name: 'Skin Gold', price: 14.99, emoji: '🔥' },
  { id: 3, name: 'Pack Etoiles', price: 4.99, emoji: '⭐' },
  { id: 4, name: 'Boost XP x2', price: 2.99, emoji: '⚡' },
  { id: 5, name: 'Avatar Legendaire', price: 19.99, emoji: '👑' },
  { id: 6, name: 'Skin Legendaire', price: 7.99, emoji: '🎉' },
];

function ProductCard({ product }) {
  const handleAdd = () => {
    eventBus.emit('cart:add', { id: product.id, name: product.name, price: product.price });
  };

  return (
    <div className="product-card">
      <span className="product-emoji">{product.emoji}</span>
      <div className="product-info">
        <p className="product-name">{product.name}</p>
        <p className="product-price">{product.price} €</p>
      </div>
      <button onClick={handleAdd}>Ajouter</button>
    </div>
  );
}

function Catalog() {
  return (
    <div className="catalog">
      <div className="catalog-header">
        <h2>Boutique</h2>
        <span className="mfe-badge">MFE</span>
      </div>
      <div className="products-grid">
        {PRODUCTS.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Catalog;
