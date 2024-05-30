import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ListFooter = () => (
    <View style={styles.footer}>
      <Text style={styles.footerText}>Website Checker © 2024</Text>
    </View>
);

const styles = StyleSheet.create({
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

export default ListFooter;