import React, {useState, useEffect} from 'react';
import { View, TextInput, Button, TouchableOpacity, StyleSheet, Text, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Form = ({navigation}) => {
    const [inputText, setInputText] = useState('');
    const [inputUrl, setInputUrl] = useState('');
    const [listItems, setListItems] = useState([]);
  
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
  
    const handleAddItem = async () => {
      if (inputText.trim() && inputUrl.trim()) {
        const newItem = { text: inputText, url: inputUrl };
        const newListItems = [...listItems, newItem];
        setListItems(newListItems);
        setInputText('');
        setInputUrl('');
        try {
          await AsyncStorage.setItem('listItems', JSON.stringify(newListItems));
        } catch (error) {
          console.error('Failed to save item to AsyncStorage', error);
        }
      }
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
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter some text"
                value={inputText}
                onChangeText={text => setInputText(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter an URL"
                value={inputUrl}
                onChangeText={text => setInputUrl(text)}
            />
            <Button
                title="Add to List"
                onPress={handleAddItem}
            />
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
    container: {
      padding: 20,
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 20,
      paddingHorizontal: 10,
    },
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

export default Form;