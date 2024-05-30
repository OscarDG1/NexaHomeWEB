import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import '../styles/Perfil.css';

const API_BASE_URL = 'http://192.168.0.23:7770';

const ProfileScreen = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/myInfo`, {
          method: 'GET',
          headers: {
            'Authorization': token,
          },
        });

        if (!response.ok) {
          throw new Error('Error al obtener la información del usuario');
        }

        const data = await response.json();
        setUserInfo(data);
      } catch (error) {
        console.error('Error al obtener la información del usuario:', error);
        alert(`Error al obtener la información del usuario: ${error.message}`);
      }
    };

    fetchUserInfo();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div>
      <NavigationBar />
      <div className="profile-screen">
        <h1 className="bienvenido">Bienvenido {userInfo ? userInfo.name : 'Cargando...'}</h1>
        <div className="profile-card">
          <h2 className="profile-heading">Datos</h2>
          {userInfo ? (
            <div className="user-properties">
              <p>Email: {userInfo.email}</p>
              <p>Teléfono: {userInfo.telefono}</p>
              <p>Premium: {userInfo.premium ? 'Sí' : 'No'}</p>
            </div>
          ) : (
            <p>Cargando información del usuario...</p>
          )}
        </div>
        <div className="profile-options">
          <Link to="/MiPropiedad" className="profile-button">Tus propiedades</Link>
          <Link to="/change-password" className="profile-button">Cambiar contraseña</Link>
          <Link to="/socialMedia" className="profile-button">Redes sociales</Link>
          <Link to="" className="profile-button">Adquirir Premium</Link>
          <button onClick={handleLogout} className="profile-button">Cerrar sesión</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
