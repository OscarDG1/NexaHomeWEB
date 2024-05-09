import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from './NavigationBar'; // Suponiendo que el componente NavigationBar está en el archivo NavigationBar.js
import '../styles/password.css';

const API_BASE_URL = 'https://tu-servidor.com'; // Reemplaza 'tu-servidor.com' con la URL de tu servidor

function ChangePassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleChangePassword = async () => {
    try {
      if (password !== confirmPassword) {
        throw new Error('Las contraseñas no coinciden');
      }

      const token = localStorage.getItem('userToken'); // Obtener el token del usuario desde el almacenamiento local
      if (!token) {
        throw new Error('Usuario no autenticado');
      }

      const response = await fetch(`${API_BASE_URL}/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newPassword: password }),
      });

      if (!response.ok) {
        throw new Error('Error al cambiar la contraseña');
      }

      alert('Contraseña cambiada exitosamente');
      navigate('/perfil'); // Redirigir al usuario al perfil después de cambiar la contraseña
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error.message);
      alert(error.message);
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  return (
    <div>
      <NavigationBar />
      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <div className="flex-column">
          <label>Password </label>
        </div>
        <div className="inputForm">
          <div className="password-icon password-input-icon"></div>
          <input
            type="password"
            className="input"
            placeholder="Enter your Password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>

        <div className="flex-column">
          <label>Confirm Password </label>
        </div>
        <div className="inputForm">
          <div className="password-icon confirm-password-input-icon"></div>
          <input
            type="password"
            className="input"
            placeholder="Confirm your Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </div>

        <button className="btncustom" onClick={handleChangePassword}>
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}

export default ChangePassword;
