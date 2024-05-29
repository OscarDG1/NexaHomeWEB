import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import NavigationBar from './NavigationBar';
import '../styles/password.css';

const API_BASE_URL = 'http://192.168.0.23:7770';

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleChangePassword = async () => {
    try {
      if (newPassword !== confirmPassword) {
        throw new Error('Las contraseñas nuevas no coinciden');
      }

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Usuario no autenticado');
      }

      const response = await fetch(`${API_BASE_URL}/user/changePass?oldPassword=${oldPassword}&newPassword=${newPassword}`, {
        method: 'GET',
        headers: {
          'Authorization': token,
        },
      });

      if (!response.ok) {
        throw new Error('Error al cambiar la contraseña');
      }

      alert('Contraseña cambiada exitosamente');
      navigate('/');
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error.message);
      alert(error.message);
    }
  };

  const handleOldPasswordChange = (event) => {
    setOldPassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  return (
    <div>
      <NavigationBar />
      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <div className="flex-column">
          <label>Contraseña Actual</label>
        </div>
        <div className="inputForm">
          <div className="password-icon password-input-icon"></div>
          <input
            type="password"
            className="input"
            placeholder="Ingresa tu contraseña actual"
            value={oldPassword}
            onChange={handleOldPasswordChange}
          />
        </div>

        <div className="flex-column">
          <label>Nueva Contraseña</label>
        </div>
        <div className="inputForm">
          <div className="password-icon password-input-icon"></div>
          <input
            type="password"
            className="input"
            placeholder="Ingresa tu nueva contraseña"
            value={newPassword}
            onChange={handleNewPasswordChange}
          />
        </div>

        <div className="flex-column">
          <label>Confirmar Nueva Contraseña</label>
        </div>
        <div className="inputForm">
          <div className="password-icon confirm-password-input-icon"></div>
          <input
            type="password"
            className="input"
            placeholder="Confirma tu nueva contraseña"
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