import React from 'react';
import {ImageBackground, StyleSheet, Text, TextInput, View} from 'react-native';
import Login from './screens/login';



const App = () => (
 <Login/>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 42,
   
    fontWeight: 'bold',
    textAlign: 'center',
    
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default App;