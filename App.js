import React from 'react';
import { SafeAreaView, View, Text, FlatList, StyleSheet } from 'react-native';
import ListHeader from './src/components/ListHeader';
import ListFooter from './src/components/ListFooter';

const App = () => {
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
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListHeaderComponent={ListHeader}
        ListFooterComponent={ListFooter}
        contentContainerStyle={styles.listContentContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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

export default App;
