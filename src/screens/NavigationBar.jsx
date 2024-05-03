import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navigation.css';

const NavigationBar = () => {
  return (
    <div className="navigation-bar">
          <Link to="/" className="nav-link">Inicio</Link>
      <Link to="/PerfilScreen" className="nav-link">Perfil</Link>

    </div>
  );
};

export default NavigationBar;
