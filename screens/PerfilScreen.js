import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PerfilScreen = ({ navigation }) => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    avatar: '', // Ruta de la imagen de perfil por defecto
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

  useEffect(() => {
    const saveUserData = async () => {
      try {
        await AsyncStorage.setItem('userData', JSON.stringify(userData));
        // Aquí podrías añadir lógica adicional, como mostrar una confirmación al usuario
      } catch (error) {
        console.log('Error al guardar cambios:', error);
      }
    };

    // Guardar los datos del usuario cada vez que se actualiza el estado
    saveUserData();
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil de Usuario</Text>
      <Image
        source={{ uri: userData.avatar }}
        style={styles.avatar}
      />
      <TouchableOpacity onPress={handleChooseAvatar}>
        <Text>Cambiar Imagen</Text>
      </TouchableOpacity>
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
      <Button title="Guardar Cambios" onPress={() => {}} />
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
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
});

export default PerfilScreen;
