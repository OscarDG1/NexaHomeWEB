import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navigation.css';
import propiedadIcon from '../assets/propiedad.png';
import nexahome from '../assets/nexahome.png';
import lupa from '../assets/lupa.png';
import avatar from '../assets/avatar_default.png';

const NavigationBar = () => {
  return (
    <div className="navigation-bar">
      <div className="logo-container">
        <Link to="/Propiedades">
          <img src={nexahome} alt="Nexahome" className="logo" />
        </Link>
      </div>
      <Link to="/PropiedadForm" className="nav-link">
        <div className="icon-text-container">
          <img src={propiedadIcon} alt="Add Property" className="icon" />
          Añadir Propiedad
        </div>
      </Link>
      <Link to="/Buscar" className="nav-link">
        <div className="icon-text-container">
          <img src={lupa} alt="Search" className="icon" />
          Buscar
        </div>
      </Link>
      <Link to="/Perfil" className="nav-link">
        <div className="icon-text-container">
          <img src={avatar} alt="perfil" className="icon" />
          Perfil
        </div>
      </Link>
    </div>
  );
};

export default NavigationBar;
