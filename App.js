import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/Home';
import DetailsScreen from './src/screens/Details';
import LoginScreen from './src/screens/Login';
import Geolocation from '@react-native-community/geolocation';
import RNSecureStorage from 'rn-secure-storage';

const Stack = createNativeStackNavigator();

function App() {
  Geolocation.getCurrentPosition(info => console.log(info));
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const exists = await RNSecureStorage.exist('userToken');
        if (exists) {
          const token = await RNSecureStorage.getItem('userToken');
          if (token) {
            setIsAuthenticated(true);
          }
        }
      } catch (e) {
        console.error(e);
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
      {isAuthenticated ? (
          <>
            <Stack.Screen name="Home" options={{"headerShown": false}}>
              {props => {
              console.log(props);
              return <HomeScreen {...props} setIsAuthenticated={setIsAuthenticated} />;}
              }
            </Stack.Screen>
            <Stack.Screen name="Details" component={DetailsScreen} />
          </>
        ) : (
          <Stack.Screen name="Login" options={{"headerShown": false}}>
            {props => <LoginScreen {...props} setIsAuthenticated={setIsAuthenticated} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;