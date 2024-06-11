import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ListFooter = () => (
    <View style={styles.footer}>
      <Text style={styles.footerText}>Made with ❤️ & React Native © 2024</Text>
    </View>
);

const styles = StyleSheet.create({
    footer: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        alignItems: 'center',
        backgroundColor: '#6200ee',
      },
      footerText: {
        fontSize: 16,
        color: '#fff',
      },
});

export default ListFooter;