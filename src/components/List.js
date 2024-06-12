import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text } from 'react-native-paper';
import axios from 'axios';

const List = ({navigation, listItems, setListItems}) => {
    useEffect(() => {
       pingUrl();

        //Set an interval to ping the urls every minute
        const interval = setInterval(() => { 
           pingUrl();
        }, 60000);

        return () => clearInterval(interval);
     }, []);

    const pingUrl = async () => {
      //Loop through the list of items and ping the url
      listItems.forEach(async (item) => {
        console.log('Pinging url: ', item.url);
        try {
          const response = await axios.get(item.url).then((response) => {
          console.log('Response status: ', response.status);
            return response;
          }).catch((error) => {
            console.error('Failed to ping url: ', item.url, error);
            return error.response;
          });
          //Save the response in a new property of the item
          item.response = response.status;
          //Update the list of items
          setListItems([...listItems]);
        } catch (error) {
          console.error('Failed to ping url: ', item.url, error);
        }
      });
    };

    const handleDeleteItem = async (index) => {
        const newListItems = listItems.filter((_, i) => i !== index);
        setListItems(newListItems);
        try {
          await AsyncStorage.setItem('listItems', JSON.stringify(newListItems));
        } catch (error) {
          console.error('Failed to delete item from AsyncStorage', error);
        }
    };

    return (
        <View>
            {listItems.map((item, index) => (
            <View key={index} style={styles.listItem}>
                <View>
                {item.response == 200 && <Text style={styles.ok}>OK</Text>}
                {item.response == 404 && <Text>Not Found</Text>}
                {item.response == 500 && <Text>Internal Server Error</Text>}
                <Text>{item.name}</Text>
                <TouchableOpacity onPress={() => 
                navigation.navigate('Details', {
                    website: item.text,
                })
                }>
                <Text style={styles.urlText}>{item.url}</Text>
                </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => handleDeleteItem(index)} style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
            </View>
            ))}
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
});

export default List;