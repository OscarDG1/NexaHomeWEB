import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Platform, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import icono_usuario from '../assets/person.png';
import icono_email from '../assets/email.png';
import icono_password from '../assets/password.png';
import LoginRegistroStyles from '../styles/LoginRegistroStyles';

const LoginRegistro = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState({ name: '', email: '', password: '' });
  const [action, setAction] = useState('Registro');

  const handleLogin = async () => {
    if (action === 'Registro') {
      try {
        await AsyncStorage.setItem('user', JSON.stringify(user));
        Alert.alert('Registro exitoso');
      } catch (error) {
        console.error('Error al registrar el usuario', error);
      }
    } else {
      const storedUser = await AsyncStorage.getItem('user');
      const validUser = JSON.parse(storedUser);

      if (validUser && user.email === validUser.email && user.password === validUser.password) {
        Alert.alert('Inicio de sesión exitoso');
        navigation.navigate('Menu');
      } else {
        Alert.alert('Credenciales incorrectas');
      }
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

  useEffect(() => {
    // Limpiar reproductor de video en desmontaje
    return () => {
      // Código de limpieza del reproductor de video
    };
  }, []);

  const renderVideoBackground = () => {
    if (Platform.OS === 'web') {
      return (
        <video autoPlay loop muted style={LoginRegistroStyles.backgroundVideo}>
          <source src={require('../assets/MenuLogin.mp4')} type="video/mp4" />
        </video>
      );
    } else {
      // Para dispositivos móviles, no es necesario renderizar un video de fondo
      return null;
    }
  };

  return (
    <View style={LoginRegistroStyles.container}>
      {renderVideoBackground()}
      <View style={LoginRegistroStyles.contentContainer}>
        <View style={LoginRegistroStyles.header}>
          <Text style={LoginRegistroStyles.text}>{action}</Text>
          <View style={LoginRegistroStyles.underline}></View>
        </View>

        <View style={LoginRegistroStyles.inputs}>
          {action === 'Login' ? null : (
            <View style={LoginRegistroStyles.input}>
              <Image source={icono_usuario} style={LoginRegistroStyles.icon} />
              <TextInput
                style={LoginRegistroStyles.inputText}
                placeholder='Nombre'
                value={user.name}
                onChangeText={(value) => handleChange('name', value)}
              />
            </View>
          )}
          <View style={LoginRegistroStyles.input}>
            <Image source={icono_email} style={LoginRegistroStyles.icon} />
            <TextInput
              style={LoginRegistroStyles.inputText}
              placeholder='Email'
              value={user.email}
              onChangeText={(value) => handleChange('email', value)}
            />
          </View>
          <View style={LoginRegistroStyles.input}>
            <Image source={icono_password} style={LoginRegistroStyles.icon} />
            <TextInput
              style={LoginRegistroStyles.inputText}
              placeholder='Contraseña'
              secureTextEntry
              value={user.password}
              onChangeText={(value) => handleChange('password', value)}
            />
          </View>
        </View>

        {action === 'Registro' ? (
          <TouchableOpacity style={LoginRegistroStyles.olvidarContraseña}></TouchableOpacity>
        ) : null}

        <View style={LoginRegistroStyles.submitContainer}>
          {action === 'Registro' && (
            <TouchableOpacity style={LoginRegistroStyles.submit} onPress={handleLogin}>
              <Text style={{ color: '#fff' }}>Registrar</Text>
            </TouchableOpacity>
          )}
          {action === 'Login' && (
            <TouchableOpacity style={LoginRegistroStyles.submit} onPress={switchToRegistro}>
              <Text style={{ color: '#fff' }}>Registro</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={LoginRegistroStyles.submit} onPress={switchToLogin}>
            <Text style={{ color: '#fff' }}>Login</Text>
          </TouchableOpacity>
        </View>

        {action === 'Login' && (
          <View style={LoginRegistroStyles.entrarContainer}>
            <TouchableOpacity style={LoginRegistroStyles.entrarButton} onPress={handleLogin}>
              <Text style={{ color: '#fff' }}>Entrar</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default LoginRegistro;
