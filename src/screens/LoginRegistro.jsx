import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import icono_usuario from '../assets/person.png';
import icono_email from '../assets/email.png';
import icono_password from '../assets/password.png';
import icono_telefono from '../assets/telefono.png';
import '../styles/LoginRegistro.css';
import videoFondo from '../assets/MenuLogin.mp4';

const API_BASE_URL = 'http://192.168.0.23:7770';

const LoginRegistro = () => {
  const [user, setUser] = useState({ name: '', email: '', password: '', telefono: '' });
  const [action, setAction] = useState('Registro');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const errors = {};
    if (password.length < 8) {
      errors.length = 'La contraseña debe tener al menos 8 caracteres';
    }
    if (!/[A-Z]/.test(password)) {
      errors.uppercase = 'La contraseña debe contener al menos una letra mayúscula';
    }
    if (!/[a-z]/.test(password)) {
      errors.lowercase = 'La contraseña debe contener al menos una letra minúscula';
    }
    if (!/[0-9]/.test(password)) {
      errors.number = 'La contraseña debe contener al menos un número';
    }
    if (!/[!@#$%^&*.,]/.test(password)) {
      errors.special = 'La contraseña debe contener al menos un carácter especial (!@#$%^&*.,)';
    }
    if (/\s/.test(password)) {
      errors.whitespace = 'La contraseña no debe contener espacios en blanco';
    }
    return errors;
  };

  const handleRegistro = async () => {
    const passwordErrors = validatePassword(user.password);
    if (Object.keys(passwordErrors).length > 0) {
      setErrors(passwordErrors);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          passw: user.password,
          phone: user.telefono,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al registrar el usuario');
      }
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      alert('Error al realizar el registro. Por favor, inténtalo de nuevo.');
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          passw: user.password,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al iniciar sesión');
      }

      const data = await response.json();

      if (data.token) {
        localStorage.setItem('token', data.token);
        navigate('/propiedades');
      } else {
        alert('Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Error al iniciar sesión. Por favor, inténtalo de nuevo.');
    }
  };

  const handleChange = (field, value) => {
    setUser({ ...user, [field]: value });
    if (field === 'password') {
      const passwordErrors = validatePassword(value);
      setErrors({ ...errors, password: passwordErrors });
    }
  };

  const switchToLogin = () => {
    setAction('Login');
  };

  const switchToRegistro = () => {
    setAction('Registro');
  };

      return (
        <div className="container">
          <video autoPlay muted loop className="video-background">
            <source src={videoFondo} type="video/mp4" />
          </video>
          <div className="content-container">
            <div className="header">
              <h2 className="text">{action}</h2>
              <div className="underline"></div>
            </div>

            <div className="inputs">
              {action === 'Login' ? null : (
                <div className="inputz">
                  <img src={icono_usuario} className="icon" alt="icono usuario" />
                  <input
                    type="text"
                    className="inputText"
                    placeholder="Nombre"
                    value={user.name}
                    onChange={(event) => handleChange('name', event.target.value)}
                  />
                </div>
              )}
              <div className="inputz">
                <img src={icono_email} className="icon" alt="icono email" />
                <input
                  type="email"
                  className="inputText"
                  placeholder="Email"
                  value={user.email}
                  onChange={(event) => handleChange('email', event.target.value)}
                />
              </div>
              <div className="inputz">
                <img src={icono_password} className="icon" alt="icono contraseña" />
                <input
                  type="password"
                  className="inputText"
                  placeholder="Contraseña"
                  value={user.password}
                  onChange={(event) => handleChange('password', event.target.value)}
                />
              </div>
              {action === 'Registro' && (
                <div className="inputz">
                  <img src={icono_telefono} className="icon" alt="icono teléfono" />
                  <input
                    type="tel"
                    className="inputText"
                    placeholder="Teléfono"
                    value={user.telefono}
                    onChange={(event) => handleChange('telefono', event.target.value)}
                  />
                </div>
              )}
            </div>

            {action === 'Registro' ? (
              <div className="olvidarContraseña"></div>
            ) : null}

            <div className="submitContainer">
              {action === 'Registro' && (
                <button className="btn" onClick={handleRegistro}>
                  Registrar
                </button>
              )}
              {action === 'Login' && (
                <button className="btn" onClick={switchToRegistro}>
                  Registro
                </button>
              )}
              {action === 'Login' && (
                <button className="btn" onClick={handleLogin}>
                  Entrar
                </button>
              )}
              {action !== 'Login' && (
                <button className="btn" onClick={switchToLogin}>
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      );
    };

    export default LoginRegistro;
