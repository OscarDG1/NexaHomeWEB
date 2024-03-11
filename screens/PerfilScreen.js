// PerfilScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PerfilScreen = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    avatar: '', // Puedes manejar el avatar como una URL o un identificador
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem('userData');
        if (storedUserData) {
          setUserData(JSON.parse(storedUserData));
        }
      } catch (error) {
        console.log('Error al obtener datos de usuario:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleUsernameChange = (newUsername) => {
    setUserData({ ...userData, username: newUsername });
  };

  const handleEmailChange = (newEmail) => {
    setUserData({ ...userData, email: newEmail });
  };

  const handlePasswordChange = (newPassword) => {
    setUserData({ ...userData, password: newPassword });
  };

  const handleSaveChanges = async () => {
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      // Aquí podrías añadir lógica adicional, como mostrar una confirmación al usuario
    } catch (error) {
      console.log('Error al guardar cambios:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil de Usuario</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
        value={userData.username}
        onChangeText={handleUsernameChange}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={userData.email}
        onChangeText={handleEmailChange}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={userData.password}
        onChangeText={handlePasswordChange}
      />
      <Button title="Guardar Cambios" onPress={handleSaveChanges} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default PerfilScreen;
