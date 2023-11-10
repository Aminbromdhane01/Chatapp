import React, { useState } from 'react'
import { Alert, Button, StyleSheet } from 'react-native';
import {ImageBackground,  Text, TextInput, View} from 'react-native';

const Login = () => 
{ 
  const [login , setlogin ] = useState('');
  const [pwd , setpwd ] = useState('');

  return (
    <View style={styles.container}>
    <ImageBackground source={require('../assets/background.jpg')} resizeMode="cover" style={styles.image}>
       <Text style={{
        marginBottom : 20 ,
        fontSize : 30,
        textAlign : 'center'
       }}>Authentification</Text>
      <TextInput
      onChange={(e) => {setlogin(e.target.value);}}
        style={styles.input}  
        placeholder="Email "
    
      />
      <TextInput
      onChangeText={(e) => {setpwd()}}
        style={styles.input}
        placeholder="Password "
      />
   <View style={{ flexDirection: 'row', justifyContent: 'space-between' , paddingTop:20}}>
      <View style={{ flex: 0.4 , paddingLeft:15 }}>
        <Button
          title="Button 1"
          onPress={() => {
            alert (`Email ${login} \n Password ${pwd}`);           
          }}
        />
      </View>
      <View style={{ flex: 0.4 , paddingRight : 15 }}>
        <Button
          title="Button 2"
          onPress={() => {
            // Add your button's functionality here
          }}
        />
      </View>
    </View>
     
    </ImageBackground>
  </View>
  )
        }
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
    btn :{
       
    }
  });
export default Login