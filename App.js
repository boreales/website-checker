import React from 'react';
import { SafeAreaView, View, Text, FlatList, StyleSheet } from 'react-native';

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

  const ListHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Website Checker</Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>
           Appli de monitoring pour sites web
        </Text>
      </View>
    </View>
  );

  const ListFooter = () => (
    <View style={styles.footer}>
      <Text style={styles.footerText}>Website Checker © 2024</Text>
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
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 18,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    alignItems: 'center',
    backgroundColor: '#5AA2FA',
  },
  footerText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default App;
