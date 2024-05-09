import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from './NavigationBar'; // Suponiendo que el componente NavigationBar está en el archivo NavigationBar.js
import '../styles/password.css';
import avatarIcon from '../assets/avatar_default.png'; // Importa el icono de avatar
import emailIcon from '../assets/email.png'; // Importa el icono de correo electrónico

const API_BASE_URL = 'https://tu-servidor.com'; // Reemplaza 'tu-servidor.com' con la URL de tu servidor

function EditProfile() {
  const [name, setName] = useState(''); // Cambia el estado a 'name'
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleChangeUserInfo = async () => {
    try {
      const token = localStorage.getItem('userToken');
      if (!token) {
        throw new Error('Usuario no autenticado');
      }

      const response = await fetch(`${API_BASE_URL}/change-user-info`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({ name, email }), // Cambia 'username' a 'name'
      });

      if (!response.ok) {
        throw new Error('Error al cambiar la información del usuario');
      }

      alert('Información de usuario cambiada exitosamente');
      navigate('/perfil');
    } catch (error) {
      console.error('Error al cambiar la información del usuario:', error.message);
      alert(error.message);
    }
  };

  const handleNameChange = (event) => { // Cambia el manejador de eventos a 'handleNameChange'
    setName(event.target.value); // Cambia 'username' a 'name'
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <div>
      <NavigationBar />
      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <div className="flex-column">
          <label>Usuario </label>
        </div>
        <div className="inputForm">
          <div className="avatar-icon"></div>
          <input
            type="text"
            className="input"
            placeholder="Enter your username"
            value={name} // Cambia 'username' a 'name'
            onChange={handleNameChange} // Cambia el manejador de eventos a 'handleNameChange'
          />
        </div>

        <div className="flex-column">
          <label>Email </label>
        </div>
        <div className="inputForm">
          <div className="email-icon"></div>
          <input
            type="text"
            className="input"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>

        <button className="btncustom" onClick={handleChangeUserInfo}>
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}
export default EditProfile;
