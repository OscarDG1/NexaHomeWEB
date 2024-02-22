import React from 'react';
import { View, Text, Image } from 'react-native';
import HomeScreenStyles from '../styles/HomeScreenStyles';

const HomeScreen = () => {
  return (
    <View style={HomeScreenStyles.container}>
      <View style={HomeScreenStyles.header}>
        <Text style={HomeScreenStyles.title}>Bienvenidos a Nexahome</Text>
        <Image
          source={require('../assets/nexahome.png')}
          style={HomeScreenStyles.icon}
        />
      </View>
      <View style={HomeScreenStyles.content}>
        {/* Aquí puedes colocar el contenido adicional de tu pantalla */}
        <Text>¡Bienvenido a la pantalla de inicio!</Text>
      </View>
    </View>
  );
};

export default HomeScreen;
