import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';

const ListHeader = () => {
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const timer = setInterval(() => {
          setCurrentTime(new Date().toLocaleTimeString());
        }, 1000);
    
        // Cleanup the interval on component unmount
        return () => clearInterval(timer);
      }, []);

    return (
        <View style={styles.headerContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Website Checker</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>
             Appli de monitoring pour sites web
          </Text>
          <Text>{currentTime}</Text>
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'lightgray',
        padding: 10,
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
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
    descriptionContainer: {
        paddingHorizontal: 20,
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: '#fff',
    },
    descriptionText: {
        fontSize: 16,
        textAlign: 'center',
    }
});

export default ListHeader;