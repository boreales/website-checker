import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/Home';
import DetailsScreen from './src/screens/Details';
import LoginScreen from './src/screens/Login';
import Geolocation from '@react-native-community/geolocation';

const Stack = createNativeStackNavigator();

function App() {
  Geolocation.getCurrentPosition(info => console.log(info));
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" options={{"headerShown": false}} component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Login" options={{"headerShown": false}} component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;