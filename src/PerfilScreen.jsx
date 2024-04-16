import React, { useState, useEffect } from 'react';

const PerfilScreen = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    // Lógica para obtener datos de usuario desde el servidor o almacenamiento local
  }, []);

  useEffect(() => {
    // Lógica para guardar datos de usuario en el servidor o almacenamiento local
  }, [userData]);

  const handleUsernameChange = (newUsername) => {
    setUserData({ ...userData, username: newUsername });
  };

  const handleEmailChange = (newEmail) => {
    setUserData({ ...userData, email: newEmail });
  };

  const handlePasswordChange = (newPassword) => {
    setUserData({ ...userData, password: newPassword });
  };

  const handleChooseAvatar = () => {
    // Lógica para permitir al usuario seleccionar una imagen de perfil
  };

  const handleSaveChanges = () => {
    // Lógica para guardar los cambios en los datos del usuario
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Perfil de Usuario</h1>
      <img
        src={userData.avatar}
        alt="Avatar"
        style={styles.avatar}
      />
      <button onClick={handleChooseAvatar}>Cambiar Imagen</button>
      <input
        type="text"
        placeholder="Nombre de usuario"
        value={userData.username}
        onChange={(e) => handleUsernameChange(e.target.value)}
        style={styles.input}
      />
      <input
        type="email"
        placeholder="Correo electrónico"
        value={userData.email}
        onChange={(e) => handleEmailChange(e.target.value)}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={userData.password}
        onChange={(e) => handlePasswordChange(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleSaveChanges}>Guardar Cambios</button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    border: '1px solid gray',
    marginBottom: 20,
    padding: '0 10px',
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
};

export default PerfilScreen;
