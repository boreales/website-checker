import * as React from 'react';
import { View, FlatList, StyleSheet, Text, Button } from 'react-native';
import ListHeader from '../components/ListHeader';
import ListFooter from '../components/ListFooter';
import { useState, useEffect } from 'react';

function HomeScreen({ navigation }) {

const data = [
    { id: '1', title: 'Élément 1' },
    { id: '2', title: 'Élément 2' },
    { id: '3', title: 'Élément 3' },
    { id: '4', title: 'Élément 4' },
    { id: '5', title: 'Élément 5' },
    { id: '6', title: 'Élément 6' },
    { id: '7', title: 'Élément 7' },
    { id: '8', title: 'Élément 8' },
    { id: '9', title: 'Élément 9' },
    { id: '10', title: 'Élément 10' },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.title}</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );

  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
      const timer = setInterval(() => {
        setCurrentTime(new Date().toLocaleTimeString());
      }, 1000);
  
      // Cleanup the interval on component unmount
      return () => clearInterval(timer);
    }, []);

  return (
    <View style={styles.container}>
      <ListHeader currentTime={currentTime} />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContentContainer}
      />
      <ListFooter />
    </View>
  );
}

const styles = StyleSheet.create({
    listContentContainer: {
      flexGrow: 1,
      justifyContent: 'space-between',
    },
    item: {
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    itemText: {
      fontSize: 18,
    }
  });


export default HomeScreen;