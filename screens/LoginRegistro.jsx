import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Platform, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import icono_usuario from '../assets/person.png';
import icono_email from '../assets/email.png';
import icono_password from '../assets/password.png';
import icono_telefono from '../assets/telefono.png'; //
import LoginRegistroStyles from '../styles/LoginRegistroStyles';

const API_BASE_URL = 'https://test.javi.local:7770';


const LoginRegistro = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState({ name: '', email: '', password: '', telefono: '' });
  const [action, setAction] = useState('Registro');
  const [username, setUsername] = useState('');

useEffect(() => {
  // Función para obtener el nombre de usuario guardado en el servidor
  const getUsername = async () => {
    try {
      // Hacer una solicitud para obtener el nombre de usuario
      const response = await axios.get(`${API_BASE_URL}/users`);
      setUsername(response.data.username);
    } catch (error) {
      console.log('Error al obtener el nombre de usuario desde el servidor:', error);
    }
  };

  getUsername();
}, []);


const handleRegistro = async () => {
  try {
    const { name, email, password, telefono } = user;
    await axios.post(`${API_BASE_URL}/register`, {
      name: name,
      email: email,
      password: password,
      telefono: telefono
    });
    Alert.alert('Registro exitoso');
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    Alert.alert('Error al realizar el registro. Por favor, inténtalo de nuevo.');
  }
};

const handleLogin = async () => {
  try {
    const { email, password } = user;
    const response = await axios.get(`${API_BASE_URL}/login`, {
      params: {
        email: email,
        passw: password
      }
    });

    if (response.data && response.data.token) {
      Alert.alert('Inicio de sesión exitoso');
      navigation.navigate('Menu');
    } else {
      Alert.alert('Credenciales incorrectas');
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    Alert.alert('Error al iniciar sesión. Por favor, inténtalo de nuevo.');
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
          {}
           {action === 'Registro' && (
             <View style={LoginRegistroStyles.input}>
               <Image source={icono_telefono} style={LoginRegistroStyles.icon} />
               <TextInput
                 style={LoginRegistroStyles.inputText}
                 placeholder='Teléfono'
                 keyboardType='phone-pad'
                 value={user.telefono}
                 onChangeText={(value) => handleChange('telefono', value)}
               />
             </View>
           )}
        </View>

        {action === 'Registro' ? (
          <TouchableOpacity style={LoginRegistroStyles.olvidarContraseña}></TouchableOpacity>
        ) : null}

       <View style={LoginRegistroStyles.submitContainer}>
         {/* Mostrar botón de registro solo en el formulario de registro */}
         {action === 'Registro' && (
           <TouchableOpacity style={LoginRegistroStyles.submit} onPress={handleRegistro}>
             <Text style={{ color: '#fff' }}>Registrar</Text>
           </TouchableOpacity>
         )}
         {/* Mostrar botón de cambio a registro solo en el formulario de inicio de sesión */}
         {action === 'Login' && (
           <TouchableOpacity style={LoginRegistroStyles.submit} onPress={switchToRegistro}>
             <Text style={{ color: '#fff' }}>Registro</Text>
           </TouchableOpacity>
         )}
         {/* Mostrar botón de entrar solo en el formulario de inicio de sesión */}
         {action === 'Login' && (
           <TouchableOpacity style={LoginRegistroStyles.submit} onPress={handleLogin}>
             <Text style={{ color: '#fff' }}>Entrar</Text>
           </TouchableOpacity>
         )}
         {/* Ocultar botón de login cuando ya estamos en el formulario de inicio de sesión */}
         {action !== 'Login' && (
           <TouchableOpacity style={LoginRegistroStyles.submit} onPress={switchToLogin}>
             <Text style={{ color: '#fff' }}>Login</Text>
           </TouchableOpacity>
         )}
       </View>


        {/* Mostrar el nombre de usuario si está disponible */}

      </View>
    </View>
  );
};

export default LoginRegistro;
