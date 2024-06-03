import React, {useEffect} from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import ListHeader from '../components/ListHeader';
import ListFooter from '../components/ListFooter';
import RNSecureStorage from 'rn-secure-storage';

function HomeScreen({ navigation }) {
  useEffect(() => {
    const getToken = async () => {
      RNSecureStorage.getItem("userToken").then((res) => {
        navigation.navigate('Home');
      }).catch((err) => {
        navigation.navigate('Login');
      });
    }
    getToken();
  }, []);

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