import React, { useState, useEffect } from 'react';
import eventBus from 'shared/eventBus';
import './Cart.css';

function Cart() {
  const [items, setItems] = useState([]);

  // useEffect 1 : ecoute cart:add et ajoute le produit au state
  useEffect(() => {
    const unsub = eventBus.on('cart:add', (product) => {
      setItems(prev => [...prev, product]);
    });
    return unsub;
  }, []);

  // useEffect 2 : quand lezs items changent => notifie l'eventBus
  useEffect(() => {
    if (items.length === 0) return;
    const total = items.reduce((sum, item) => sum + item.price, 0);
    eventBus.emit('cart:updated', { count: items.length, total: parseFloat(total.toFixed(2)) });
  }, [items]);

  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cart">
      <div className="cart-header">
        <h2>Panier</h2>

        <span className="mfe-badge">MFE</span>
        {items.length > 0 && <span className="cart-count">{items.length} article(s)</span>}
      </div>


      {items.length === 0 ? (
        <p className="cart-empty">Le panier est vide</p>
      ) : (
        <>
          <ul className="cart-list">
            {items.map((item, index) => (
              <li key={index} className="cart-item">
                <span className="cart-item-name">{item.name}</span>
                <span className="cart-item-price">{item.price} €</span>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <strong>Total : {total.toFixed(2)} €</strong>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
