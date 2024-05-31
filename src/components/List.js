import React, {useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const List = ({navigation, listItems, setListItems}) => {
 
    useEffect(() => {
      const loadItems = async () => {
        try {
          const storedItems = await AsyncStorage.getItem('listItems');
          if (storedItems) {
            setListItems(JSON.parse(storedItems));
          }
        } catch (error) {
          console.error('Failed to load items from AsyncStorage', error);
        }
      };
      loadItems();
    }, []);

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
                <Text>{item.text}</Text>
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
});

export default List;