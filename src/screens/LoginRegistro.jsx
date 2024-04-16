import React, { useState } from 'react';
import icono_usuario from '../assets/person.png';
import icono_email from '../assets/email.png';
import icono_password from '../assets/password.png';
import icono_telefono from '../assets/telefono.png';
import LoginRegistroStyles from '../styles/LoginRegistro.css';
import nexahomeLogo from '../assets/nexahome.png';
import videoFondo from '../assets/MenuLogin.mp4';

// h

const API_BASE_URL = 'http://192.168.58.116:7770';

const LoginRegistro = () => {
  const [user, setUser] = useState({ name: '', email: '', password: '', telefono: '' });
  const [action, setAction] = useState('Registro');

 const handleRegistro = async () => {
   try {
     console.log('Datos enviados en la solicitud de registro:', {
       name: user.name,
       email: user.email,
       passw: user.password,
       phone: user.telefono
     });

     const response = await fetch(`${API_BASE_URL}/register`, {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         name: user.name,
         email: user.email,
         passw: user.password,
         phone: user.telefono
       }),
     });

     if (!response.ok) {
       throw new Error('Failed to register user');
     }

     alert('Registro exitoso');
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
          password: user.password
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to log in');
      }
      const data = await response.json();
      if (data.token) {
        alert('Inicio de sesión exitoso');

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
        Your browser does not support the video tag.
      </video>
      <div className="content-container">
        <div className="header">
          <h2 className="text">{action}</h2>
          <div className="underline"></div>
        </div>

        <div className="inputs">
          {action === 'Login' ? null : (
            <div className="input">
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
          <div className="input">
            <img src={icono_email} className="icon" alt="icono email" />
            <input
              type="email"
              className="inputText"
              placeholder="Email"
              value={user.email}
              onChange={(event) => handleChange('email', event.target.value)}
            />
          </div>
          <div className="input">
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
            <div className="input">
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
