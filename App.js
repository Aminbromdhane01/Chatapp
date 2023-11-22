import React from 'react';
import {ImageBackground, StyleSheet, Text, TextInput, View} from 'react-native';
import Login from './screens/login';
import { NavigationContainer, StackRouter } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Acceuil from './screens/acceuil';
import CreateUser from './screens/CreateUser';
import Home from './screens/Home';


const Stack = createNativeStackNavigator();
const App = () => { 
  return (
    <NavigationContainer >
    <Stack.Navigator initialRouteName='Home'>
    <Stack.Screen options={{headerShown: false}} name='Login' component={Login}/>
        <Stack.Screen options={{headerShown: false}} name='Acceuil' component={Acceuil}/>
        <Stack.Screen options={{headerShown: false}} name='CreateUser' component={CreateUser}/>
        <Stack.Screen options={{headerShown: false}} name = 'Home' component={Home}/>
      
    </Stack.Navigator>
    </NavigationContainer>

)};

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