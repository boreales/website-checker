import React, {useState} from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Form = ({listItems, setListItems}) => {
    const [inputText, setInputText] = useState('');
    const [inputUrl, setInputUrl] = useState('');
  
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