import React, {useEffect} from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import ListHeader from '../components/ListHeader';
import ListFooter from '../components/ListFooter';
import AsyncStorage from '@react-native-async-storage/async-storage';

function HomeScreen({ navigation }) {
  const [username, setUsername] = React.useState('');
  useEffect(() => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem('userToken');
      const userEmail = await AsyncStorage.getItem('userEmail');
      setUsername(userEmail);
      if (token) {
        console.log('userToken:', token);
        navigation.navigate('Home');
      } else {
        navigation.navigate('Login');
      }
    }
    getToken();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <ListHeader username={username} navigation={navigation}/>
        <ListFooter />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    listContentContainer: {
      flexGrow: 1,
      justifyContent: 'space-between',
    },
    item: {
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    itemText: {
      fontSize: 18,
    }
  });


export default HomeScreen;