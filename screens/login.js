import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { Alert, Button, StyleSheet } from 'react-native';
import {ImageBackground,  Text, TextInput, View} from 'react-native';
import firebase from '../config';

const Login = () => 
{ 
  const [login , setlogin ] = useState('');
  const [pwd , setpwd ] = useState('');
  const navigation = useNavigation();
  const auth = firebase.auth();

  return (
    <View style={styles.container}>
    <ImageBackground source={require('../assets/background.jpg')} resizeMode="cover" style={styles.image}>
       <Text style={{
        marginBottom : 20 ,
        fontSize : 30,
        textAlign : 'center'
       }}>Authentification</Text>
      <TextInput
       onChangeText={(text) => setlogin(text)}
        style={styles.input}  
        placeholder="Email "
    
      />
      <TextInput
       onChangeText={(text) => setpwd(text)}
        style={styles.input}
        placeholder="Password "
        secureTextEntry={true}
      
      />
   <View style={{ flexDirection: 'row', justifyContent: 'space-between' , paddingTop:20}}>
      <View style={{ flex: 0.4 , paddingLeft:15 }}>
        <Button
          title="Login"
          onPress={() => {
            auth.signInWithEmailAndPassword(login, pwd).then((userCredential) =>{
                      const user = userCredential.user;
                      console.log("User signed in successfully:", user);
                      navigation.navigate("Home")}).catch((err)=>
                    {
                        alert("Invalid Password or Email ");
                    })
                      
          }}
        />
      </View>
      <View style={{ flex: 0.4 , paddingRight : 15 }}>
        <Button
          title="Create User"
          onPress={() => {
            navigation.navigate('CreateUser')
            
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