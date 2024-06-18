import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text } from 'react-native-paper';
import axios from 'axios';
import RNSecureStorage from 'rn-secure-storage';

const List = ({ navigation, listItems, setListItems, signOut }) => {
  const [token, setToken] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await RNSecureStorage.getItem('userToken');
        if (token) {
          console.log('userToken:', token);
          setToken(token);
          await getWebsitesFromAPI();
          setIsInitialized(true);
        } else {
          navigation.navigate('Login');
        }
      } catch (error) {
        console.error('Failed to get token', error);
      }
    };

    getToken();
  }, []);


  useEffect(() => {
    if (isInitialized) {
      pingUrl();

      // Set an interval to ping the URLs every minute
      const interval = setInterval(() => {
        pingUrl();
      }, 10000);

      // Cleanup interval on component unmount
      return () => clearInterval(interval);
    }
  }, [isInitialized]);

  const getWebsitesFromAPI = async () => {
    try {
      const response = await axios.get('https://website-checker.boreales-creations.fr/api/websites', {
        headers: {
          'Authorization': 'Bearer ' + await RNSecureStorage.getItem('userToken'),
        },
      });
      console.log(response.data['hydra:member']);
      setListItems(response.data['hydra:member']);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        await refreshToken();
        await getWebsitesFromAPI();
      }
    }
  };

  const refreshToken = async () => {
    try {
      const response = await axios.post('https://website-checker.boreales-creations.fr/api/token/refresh', {
        token: await RNSecureStorage.getItem('userToken'),
      });
      console.log(response.data);
      if (response.data.token) {
        await RNSecureStorage.setItem('userToken', response.data.token);
      }
    } catch (error) {
      console.error('Failed to refresh token', error);
      signOut();
      navigation.navigate('Login');
    }
  };

  const pingUrl = async () => {
    const updatedListItems = await Promise.all(
      listItems.map(async (item) => {
        console.log('Pinging url: ', item.url);
        try {
          const response = await axios.get(item.url);
          console.log('Response status: ', response.status);
          return { ...item, response: response.status };
        } catch (error) {
          const status = error.response ? error.response.status : 'Error';
          console.log(status);
          console.log('Failed to ping url: ', item.url, error);
          return { ...item, response: status };
        }
      })
    );
    setListItems(updatedListItems);
  };

  const handleDeleteItem = async (index) => {
    const newListItems = listItems.filter((_, i) => i !== index);
    setListItems(newListItems);
    try {
      axios.delete(`https://website-checker.boreales-creations.fr/api/websites/${listItems[index].id}`, {
        headers: {
          'Authorization': 'Bearer ' + await RNSecureStorage.getItem('userToken'),
        },
      });
      await AsyncStorage.setItem('listItems', JSON.stringify(newListItems));
    } catch (error) {
      console.error('Failed to delete item from AsyncStorage', error);
    }
  };

  return (
    <View>
      {isInitialized && listItems.map((item, index) => (
        <View key={index} style={styles.listItem}>
          <View>
            {item.response === 200 && <Text style={styles.ok}>OK</Text>}
            {item.response === 404 && <Text style={styles.warning}>Not Found</Text>}
            {item.response === 500 && <Text style={styles.error}>Internal Server Error</Text>}
            <Text>{item.name}</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Details', {
                  website: item.text,
                })
              }
            >
              <Text style={styles.urlText}>{item.url}</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => handleDeleteItem(index)} style={styles.deleteButton}>
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      ))}
      {!isInitialized && <Text>Loading...</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  urlText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  ok: {
    color: 'green',
    fontWeight: 'bold',
  },
  warning: {
    color: 'orange',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
  },
});

export default List;
