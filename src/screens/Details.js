import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function DetailsScreen({ route, navigation }) {
  const { website } = route.params; 
  const check = '✅';
  return (
    <View style={styles.container}>
      <Text style={styles.websiteTitle}>{website}</Text>
      <Text style={styles.check}>{check}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center',
    padding: 20,
  },
  websiteTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  check: {
    fontSize: 20,
  }
});

export default DetailsScreen;