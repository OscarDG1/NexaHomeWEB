import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginRegistro from './screens/LoginRegistro';
import MenuScreen from './screens/HomeScreen';
import PerfilScreen from './screens/PerfilScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Menu">
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="LoginRegistro" component={LoginRegistro} />
        <Stack.Screen name="Perfil" component={PerfilScreen} options={{ presentation: 'modal' }} />
</Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
