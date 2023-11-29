import React, { useState } from 'react'
import { Image, ImageBackground, StyleSheet, Text, TextInput, View } from 'react-native'
import firebase from '../config';
import { Button } from 'react-native-paper';

const db = firebase.database();

function Myaccount() {
    const [login , setlogin ] = useState('Test@gmail.com');
    const [tel , settel ] = useState('222222222');
    
  
    return (
      <View style={styles.container}>
      <ImageBackground source={require('../assets/background.jpg')} resizeMode="cover" style={styles.image}>
      <Image source = {require('../assets/img_prof.png')} style={{
        width : '100%',
        height:'30%',
        marginBottom : 20
      }}></Image>
         <Text style={{
          marginBottom : 50 ,
          fontSize : 30,
          textAlign : 'center',
          color : 'white'
         }}>Profil Name</Text>
         <Text style ={{
            paddingLeft : 20,
            color : 'white',
            
         }} > Email</Text>
        <TextInput
        value={login}
          style={styles.input}  
          placeholder="Email "
          
      
        />
        <Text style ={{
            paddingLeft : 20,
            color : 'white',
            
         }} > Telephone</Text>
        <TextInput
         value={tel}
          style={styles.input}
          
       
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
export default Myaccount