import React, {useState} from 'react';
import { View, StyleSheet, TextInput, Button, Text } from 'react-native';
import axios from 'axios';
import RNSecureStorage, {ACCESSIBLE} from 'rn-secure-storage';

function LoginScreen({ navigation, setIsAuthenticated }) {
    const [inputText, setInputText] = useState('');
    const [inputPassword, setinputPassword] = useState('');

    const checkLogin = async () => {
        if (inputText.trim() && inputPassword.trim()) {
            console.log('inputText:', inputText);
            console.log('inputPassword:', inputPassword);
          try {
            axios.post('https://website-checker.boreales-creations.fr/auth', {
                "email": "boreales.creations@gmail.com",
                "password": "test",
            }).then(async (response) => {
                console.log(response.data);
                if (response.data.token) {
                    RNSecureStorage.setItem("userToken", response.data.token, {accessible: ACCESSIBLE.WHEN_UNLOCKED}).then((res) => {
                      console.log(res);
                    }).catch((err) => {
                      console.log(err);
                    });
                    setIsAuthenticated(true);
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
        <View style={styles.headerContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Website Checker</Text>
            </View>
            <Text style={styles.subtitle}>Login</Text>
            <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter your email"
                value={inputText}
                keyboardType='email-address'
                onChangeText={text => setInputText(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter your password"
                value={inputPassword}
                type='password'
                secureTextEntry={true}
                onChangeText={text => setinputPassword(text)}
            />
            <Button
                title="Sign in"
                onPress={checkLogin}
            />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      padding: 20,
    },
    headerContainer: {
        marginBottom: 20,
    },
    titleContainer: {
        backgroundColor: '#5AA2FA',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 20,
        color: '#fff',
    },
    subtitle: {
        fontSize: 24,
        marginBottom: 20,
        marginTop: 10,
        textAlign: 'center',
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

export default LoginScreen;