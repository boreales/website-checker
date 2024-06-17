import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Form from './Form';
import List from './List';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ListHeader = ({navigation, username}) => {
    const [listItems, setListItems] = useState([]);

    const signOut = async () => {
        await AsyncStorage.removeItem('userToken');
        navigation.navigate('Login');
    }

    return (
        <View style={styles.headerContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Website Checker</Text>
        </View>
        <View style={styles.logoutView}>
            <Text style={styles.text}>{username}</Text>
            <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
            <Text style={styles.logoutText}>Sign out</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>
             Website monitoring mobile app
          </Text>
        </View>
        <Form listItems={listItems} setListItems={setListItems} />
        <List navigation={navigation} listItems={listItems} setListItems={setListItems} />
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        marginRight:10
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
    logoutView: {
        alignItems: 'flex-end',
    },
    logoutButton: {
        backgroundColor: '#f00',
        padding: 5,
        margin: 10,
        width: 80,
        borderRadius: 5,
    },
    logoutText: {
        color: '#fff',
        textAlign: 'center',
    },
    descriptionContainer: {
        paddingHorizontal: 20,
        marginTop: 20,
        marginBottom: 20,
    },
    descriptionText: {
        fontSize: 16,
        textAlign: 'center',
    }
});

export default ListHeader;