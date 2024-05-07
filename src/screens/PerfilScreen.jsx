import React, { useState, useEffect } from 'react';
import '../styles/Perfil.css';

const API_BASE_URL = 'http://192.168.58.116:7770'; // URL base de tu API

const ProfileScreen = () => {
  const [userProperties, setUserProperties] = useState([]);
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleEditProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/user/edit`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newUsername, newEmail }),
      });

      if (!response.ok) {
        throw new Error('Error al editar el perfil');
      }

      // Actualizar el estado o mostrar un mensaje de éxito
    } catch (error) {
      console.error('Error al editar el perfil:', error);
      // Manejar errores aquí
    }
  };

  const handleChangePassword = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/user/change-password`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (!response.ok) {
        throw new Error('Error al cambiar la contraseña');
      }

      // Actualizar el estado o mostrar un mensaje de éxito
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
      // Manejar errores aquí
    }
  };

  return (
    <div className="profile-screen">
      <h2>Tus propiedades</h2>
      <div className="user-properties">
        {/* Renderizar propiedades aquí */}
      </div>

      <div className="edit-profile-form">
        <h3>Editar perfil</h3>
        <input type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} placeholder="Nuevo nombre de usuario" />
        <input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder="Nuevo correo electrónico" />
        <button onClick={handleEditProfile}>Guardar cambios</button>
      </div>

      <div className="change-password-form">
        <h3>Cambiar contraseña</h3>
        <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="Contraseña actual" />
        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Nueva contraseña" />
        <button onClick={handleChangePassword}>Cambiar contraseña</button>
      </div>
    </div>
  );
};

export default ProfileScreen;
