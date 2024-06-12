import React, {useEffect, useState} from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Title, Paragraph } from 'react-native-paper';
import Form from './Form';
import List from './List';
import RNSecureStorage from 'rn-secure-storage';
import axios from 'axios';

const ListHeader = ({navigation, setIsAuthenticated}) => {
    const [formVisible, setFormVisible] = useState(false);
    const [textForAddButton, setTextForAddButton] = useState('+ Add');
    const [listItems, setListItems] = useState([]);

    const signOut = async () => {
        await RNSecureStorage.removeItem('userToken');
        setIsAuthenticated(false);
    }

    const addWebsite = () => {
        setFormVisible(!formVisible);
        if (formVisible) {
            setTextForAddButton('+ Add');
        } else {
            setTextForAddButton('x Close');
        }
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
            {formVisible && <Form setFormVisible={setFormVisible} listItems={listItems} setListItems={setListItems} />}
            <List listItems={listItems} setListItems={setListItems} navigation={navigation} />
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