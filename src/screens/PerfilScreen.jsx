import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import '../styles/Perfil.css';

const ProfileScreen = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div>
      <NavigationBar />
      <div className="profile-screen">
        <h1>Perfil</h1>
        <div className="user-properties">
        </div>

        <div className="profile-options">
          <Link to="/MiPropiedad" className="profile-button">Tus propiedades</Link>
          <Link to="/edit-profile" className="profile-button">Editar perfil</Link>
          <Link to="/change-password" className="profile-button">Cambiar contraseña</Link>
          <Link to="/socialMedia" className="profile-button">Redes sociales</Link>
          <button onClick={handleLogout} className="profile-button">Cerrar sesión</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
