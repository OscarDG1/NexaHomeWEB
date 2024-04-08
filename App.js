import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginRegistro from './screens/LoginRegistro';
import MenuScreen from './screens/HomeScreen';
import PerfilScreen from './screens/PerfilScreen';
import PropiedadForm from './screens/PropiedadForm';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Propiedad">
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="LoginRegistro" component={LoginRegistro} />
        <Stack.Screen name="Perfil" component={PerfilScreen} options={{ presentation: 'modal' }} />
          <Stack.Screen name="Propiedad" component={PropiedadForm} />
</Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
