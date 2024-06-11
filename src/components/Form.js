import React, {useState} from 'react';
import { View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput, Button, Card, Title } from 'react-native-paper';
import axios from 'axios';

const Form = ({listItems, setListItems}) => {
    const [inputText, setInputText] = useState('');
    const [inputUrl, setInputUrl] = useState('');

    const postItem = async () => {
      axios.post('https://website-checker.boreales-creations.fr/api/websites', {
        "name": inputText,
        "url": inputUrl,
        }, {
          headers: {
          'Authorization': 'Bearer ' + await AsyncStorage.getItem('userToken'),
          'Content-Type': 'application/ld+json',
        },
      }).then((response) => {
        console.log(response.data);
        const newItem = { text: inputText, url: inputUrl };
        const newListItems = [...listItems, newItem];
        setListItems(newListItems);
        setInputText('');
        setInputUrl('');
      }
    ).catch((error) => {
      console.error('Failed to post website', error);
      })
    }

    return (
      <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Add New Website</Title>
          <TextInput
            label="Enter some text"
            value={inputText}
            onChangeText={text => setInputText(text)}
            style={styles.input}
            mode="outlined"
          />
          <TextInput
            label="Enter an URL"
            value={inputUrl}
            onChangeText={text => setInputUrl(text)}
            style={styles.input}
            mode="outlined"
            keyboardType="url"
          />
          <Button mode="contained" onPress={postItem} style={styles.button}>
            Add to List
          </Button>
        </Card.Content>
      </Card>
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 0,
      backgroundColor: '#f0f0f0',
      marginBottom: 40
    },
    card: {
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
    input: {
      marginBottom: 20,
    },
    button: {
      marginTop: 10,
    },
  });

export default Form;