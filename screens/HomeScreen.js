import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableHighlight, TouchableOpacity } from 'react-native';
import HomeScreenStyles from '../styles/HomeScreenStyles';
import LoginRegistro from './LoginRegistro';

const HomeScreen = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSearch = () => {
    // Aquí puedes agregar la lógica para manejar la búsqueda
  };

  const handleOptionPress = (option) => {
    setSelectedOption(option);
    // Aquí puedes agregar la lógica para manejar la selección de opción
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
       <TouchableOpacity onPress={() => navigation.navigate('LoginRegistro', { action: 'Login' })}>
         <Text style={HomeScreenStyles.headerLink}>Iniciar sesión</Text>
       </TouchableOpacity>

       <TouchableOpacity onPress={() => navigation.navigate('LoginRegistro', { action: 'Registro' })}>
         <Text style={HomeScreenStyles.headerLink}>Registrarse</Text>
       </TouchableOpacity>
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

export default HomeScreen;
