import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { Button, ImageBackground, StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-paper';
import firebase from '../config';

const CreateUser = () => {
    const [login , setlogin ] = useState('');
    const [pwd , setpwd ] = useState('');
    const [cpwd , setcpwd ] = useState('');
    const navigation = useNavigation();
    const auth = firebase.auth();

  
    return (
      <View style={styles.container}>
      <ImageBackground source={require('../assets/background.jpg')} resizeMode="cover" style={styles.image}>
         <Text style={{
          marginBottom : 20 ,
          fontSize : 30,
          textAlign : 'center'
         }}>Create User</Text>
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
        <TextInput
         onChangeText={(text) => setcpwd(text)}
          style={styles.input}
          placeholder="Confirm Password "
          secureTextEntry={true}
        
        />
     <View style={{ flexDirection: 'row', justifyContent: 'space-between' , paddingTop:20}}>
        <View style={{ flex: 0.4 , paddingLeft:15 }}>
          <Button
            title="Create"
            onPress={()=>{

                if (pwd == cpwd ){
                    auth.createUserWithEmailAndPassword(login, pwd).then(() =>{
                        navigation.navigate("Acceuil")
                    }).catch((err)=>
                    {
                        alert(err);
                    })
                  }
            }
              

            }
            
          />
        </View>
        <View style={{ flex: 0.4 , paddingRight : 15 }}>
          <Button
            title="Back to Login"
            onPress={() => {
              navigation.navigate("Login");
              
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

export default CreateUser