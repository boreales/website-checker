import React, {useState} from 'react';
import { View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { TextInput, Button, Card, Title, Paragraph, Text } from 'react-native-paper';

function LoginScreen({ navigation }) {
    const [inputText, setInputText] = useState('');
    const [inputPassword, setinputPassword] = useState('');

    const checkLogin = async () => {
        if (inputText.trim() && inputPassword.trim()) {
            console.log('inputText:', inputText);
            console.log('inputPassword:', inputPassword);
          try {
            axios.post('https://website-checker.boreales-creations.fr/auth', {
                "email": "test@example.com",
                "password": "test",
            }).then(async (response) => {
                console.log(response.data);
                if (response.data.token) {
                    await AsyncStorage.setItem('userToken', response.data.token);
                    navigation.navigate('Home');
                }
            }).catch((error) => {
                console.error('Failed to login', error);
            });
          } catch (error) {
            console.error('Failed to save item to AsyncStorage', error);
          }
        }
      };

    return (
    <View style={styles.container}>
          <Card style={styles.card}>
            <Card.Content>
              <Title style={styles.title}>Welcome Back</Title>
              <Paragraph>Please login to your account</Paragraph>
              <TextInput
                label="Email"
                value={inputText}
                onChangeText={text => setInputText(text)}
                style={styles.input}
                mode="outlined"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <TextInput
                label="Password"
                value={inputPassword}
                onChangeText={text => setinputPassword(text)}
                style={styles.input}
                mode="outlined"
                secureTextEntry
              />
              <Button mode="contained" onPress={checkLogin} style={styles.button}>
                Login
              </Button>
            </Card.Content>
          </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
      backgroundColor: '#f0f0f0',
    },
    card: {
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
    },
    input: {
      marginBottom: 20,
    },
    button: {
      marginTop: 10,
    },
  });

export default LoginScreen;