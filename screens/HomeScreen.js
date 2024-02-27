import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableHighlight, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreenStyles from '../styles/HomeScreenStyles';

const HomeScreen = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const checkLoggedInStatus = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        if (storedUsername) {
          setUsername(storedUsername);
          setLoggedIn(true);
        }
      } catch (error) {
        console.log('Error al verificar el estado de inicio de sesión:', error);
      }
    };

    // Verificar el estado de inicio de sesión al cargar la pantalla
    checkLoggedInStatus();
  }, []);

  useEffect(() => {
    const checkLoggedInStatus = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        if (storedUsername) {
          setUsername(storedUsername);
          setLoggedIn(true);
        }
      } catch (error) {
        console.log('Error al verificar el estado de inicio de sesión:', error);
      }
    };

    // Verificar el estado de inicio de sesión al volver a esta pantalla
    const unsubscribe = navigation.addListener('focus', () => {
      checkLoggedInStatus();
    });

    return unsubscribe;
  }, [navigation]);

  const handleSearch = () => {
    // Lógica para manejar la búsqueda
  };

  const handleOptionPress = (option) => {
    setSelectedOption(option);
    // Lógica para manejar la selección de opción
    if (option === 'Cerrar sesión') {
      handleLogout();
    } else {
      // Manejar la acción correspondiente a la opción seleccionada
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('username');
      setLoggedIn(false);
      setUsername('');
    } catch (error) {
      console.log('Error al cerrar sesión:', error);
    }
  };

  return (
    <View style={HomeScreenStyles.container}>
      <View style={HomeScreenStyles.header}>
        <Text style={HomeScreenStyles.title}>Bienvenidos a Nexahome</Text>
        <Image
          source={require('../assets/nexahome.png')}
          style={HomeScreenStyles.icon}
        />
        <View style={HomeScreenStyles.headerLinksContainer}>
          {loggedIn ? (
            <TouchableOpacity
              style={styles.dropdownContainer}
              onPress={() => setSelectedOption(selectedOption === 'profile' ? null : 'profile')}
            >

              <Text style={HomeScreenStyles.headerLink}>Bienvenido, {username}</Text>
              {selectedOption === 'profile' && (

                <View style={styles.dropdown}>
                <TouchableOpacity style={styles.dropdownItem} onPress={() => handleOptionPress('Perfil')}>
                                    <Text style={styles.dropdownText}>Perfil</Text>
                                  </TouchableOpacity>
                  <TouchableOpacity style={styles.dropdownItem} onPress={handleLogout}>
                    <Text style={styles.dropdownText}>Cerrar sesión</Text>
                  </TouchableOpacity>
                  {/* Aquí puedes agregar más opciones */}

                </View>
              )}
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity onPress={() => navigation.navigate('LoginRegistro', { action: 'Login' })}>
                <Text style={HomeScreenStyles.headerLink}>Iniciar sesión</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('LoginRegistro', { action: 'Registro' })}>
                <Text style={HomeScreenStyles.headerLink}>Registrarse</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
      <View style={HomeScreenStyles.content}>
        {/* Barra de búsqueda */}
        <View style={HomeScreenStyles.searchBar}>
          <Image
            source={require('../assets/lupa.png')}
            style={HomeScreenStyles.searchIcon}
          />
          <TextInput
            style={HomeScreenStyles.searchInput}
            placeholder="Buscar pisos..."
          />
          <TouchableHighlight
            style={HomeScreenStyles.searchButton}
            onPress={handleSearch}
            underlayColor="#0056b3"
          >
            <Text style={HomeScreenStyles.searchButtonText}>Buscar</Text>
          </TouchableHighlight>
        </View>
        {/* Opciones de compra y alquiler */}
        <View style={HomeScreenStyles.options}>
          <TouchableHighlight
            style={[
              HomeScreenStyles.optionButton,
              selectedOption === 'comprar' && HomeScreenStyles.selectedOption,
            ]}
            onPress={() => handleOptionPress('comprar')}
            underlayColor="#0056b3"
          >
            <Text style={HomeScreenStyles.optionText}>Comprar</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[
              HomeScreenStyles.optionButton,
              selectedOption === 'alquilar' && HomeScreenStyles.selectedOption,
            ]}
            onPress={() => handleOptionPress('alquilar')}
            underlayColor="#0056b3"
          >
            <Text style={HomeScreenStyles.optionText}>Alquilar</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    position: 'relative',
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  dropdownItem: {
    padding: 10,
  },
  dropdownText: {
    color: '#000',
  },
});

export default HomeScreen;
