import React, { useState, useEffect } from 'react';
import eventBus from 'shared/eventBus';
import './Navbar.css';

function Navbar() {
  const [notifications, setNotifications] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // TODO 1 : s'abonner a game:joined => badge notifications +1
    const unsubGame = eventBus.on('game:joined', () => {
      setNotifications(n => n + 1);
    });

    // TODO 2 : s'abonner a cart:updated => badge panier = nombre d'articles
    const unsubCart = eventBus.on('cart:updated', (data) => {
      setCartCount(data.count);
    });

    // TODO 3 : retourner le cleanup des 2 abonnements
    return () => {
      unsubGame();
      unsubCart();
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="logo">PixelArena</span>
        <span className="mfe-badge">MFE</span>
      </div>

      <div className="navbar-menu">
        <button className="nav-button">Lobby</button>
        <button className="nav-button">Scores</button>
      </div>

      <div className="navbar-user">
        <span className="username">Joueur_42</span>
        <button className="nav-button notification-btn">
          🔔 {notifications > 0 && <span className="badge">{notifications}</span>}
        </button>
        <button className="nav-button notification-btn">
          🛒 {cartCount > 0 && <span className="badge">{cartCount}</span>}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
