import * as React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import ListHeader from '../components/ListHeader';
import ListFooter from '../components/ListFooter';

function HomeScreen({ navigation }) {
  return (
    <ScrollView>
      <View style={styles.container}>
        <ListHeader navigation={navigation}/>
        <ListFooter />
      </View>
    </ScrollView>
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