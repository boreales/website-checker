import React, {useEffect, useState} from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Title, Paragraph } from 'react-native-paper';
import Form from './Form';
import List from './List';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const ListHeader = ({navigation}) => {
    const [listItems, setListItems] = useState([]);
    const [token, setToken] = useState('');
    const [formVisible, setFormVisible] = useState(false);
    const [textForAddButton, setTextForAddButton] = useState('+ Add');

    useEffect(() => {
        const getToken = async () => {
            const token = await AsyncStorage.getItem('userToken');
            if (token) {
                console.log('userToken:', token);
                setToken(token);
                getWebsitesFromAPI();
            } else {
                navigation.navigate('Login');
            }
        }
        getToken();
    }, []);

    const signOut = async () => {
        await AsyncStorage.removeItem('userToken');
        navigation.navigate('Login');
    }

    const addWebsite = () => {
        setFormVisible(!formVisible);
        if (formVisible) {
            setTextForAddButton('+ Add');
        } else {
            setTextForAddButton('x Close');
        }
    }

    const getWebsitesFromAPI = async () => {
        axios.get('https://website-checker.boreales-creations.fr/api/websites', {
          headers: {
            'Authorization': 'Bearer ' + await AsyncStorage.getItem('userToken'),
          },
        }).then((response) => {
          console.log(response.data['hydra:member']);
          setListItems(response.data['hydra:member']);
        }).catch((error) => {
          console.error('Failed to fetch websites', error);
          //Get error status code
            if (error.response.status === 401) {
                refreshToken();
                getWebsitesFromAPI();
            }
        });
      }

    const refreshToken = async () => {
        axios.post('https://website-checker.boreales-creations.fr/api/token/refresh', {
          token: await AsyncStorage.getItem('userToken'),
        }).then((response) => {
          console.log(response.data);
          if (response.data.token) {
            AsyncStorage.setItem('userToken', response.data.token);
          }
        }).catch((error) => {
          console.error('Failed to refresh token', error);
          //Logout 
            signOut();
            //Redirect to login
            navigation.navigate('Login');
        });
      }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.titleContainer}>
                    <Title style={styles.title}>Website Checker</Title>
                </View>
                <View style={styles.descriptionContainer}>
                    <Paragraph style={styles.descriptionText}>
                    Website monitoring mobile app
                    </Paragraph>
                </View>
                <View style={styles.buttonsContainer}>
                    <View style={styles.addView}>
                        <TouchableOpacity style={styles.button} onPress={addWebsite}>
                        <Text style={styles.buttonText}>{textForAddButton}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.logoutView}>
                        <TouchableOpacity style={styles.button} onPress={signOut}>
                        <Text style={styles.buttonText}>Sign out</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {listItems !== undefined ? (
              <>
                {formVisible && <Form listItems={listItems} setListItems={setListItems} />}
                <List navigation={navigation} listItems={listItems} setListItems={setListItems} />
              </>
            ): (
              <Text style={{color:"black", fontSize:40}}>Loading...</Text>
            )}
      </View>
    );
};

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
      headerContainer: {
        marginBottom: 20,
      },
      titleContainer: {
        alignItems: 'center',
        marginBottom: 10,
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
      },
      addView: {
        alignItems: 'flex-start',
        flex:1
      },
      logoutView: {
        alignItems: 'flex-end',
        marginBottom: 10,
        flex:1
      },
      descriptionContainer: {
        alignItems: 'center',
        marginBottom: 20,
      },
      descriptionText: {
        textAlign: 'center',
      },
      buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        backgroundColor: '#f0f0f0',
      },
      addView: {
        flex: 1,
        alignItems: 'flex-start',
      },
      logoutView: {
        flex: 1,
        alignItems: 'flex-end',
      },
      button: {
        backgroundColor: '#6200ee',
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 15,
      },
      buttonText: {
        color: '#fff',
        fontWeight: 'bold',
      },
});

export default ListHeader;