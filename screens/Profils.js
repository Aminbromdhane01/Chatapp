import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  ImageBackground,
} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import firebase from '../config/index';

const Profils = () => {
  const auth = firebase.auth();

  const database = firebase.database();
  

  const [Name, setFullName] = useState("");
  const [Surname, setSurname] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [email , setEmail] = useState(null);
  
   

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
       const user = auth.currentUser;
    if (user) {
      setUserEmail(user.email);
    }
    })();
  }, []);

  const handleValidation = () => {
    if (!Name || !Surname || !PhoneNumber) {
      alert('Please fill out all fields');
      return;
    }
    addContact();
  };

  const addContact = async () => {
    const refContacts = firebase.database().ref('contacts');
    const newContactRef = refContacts.push();

    try {
      await newContactRef.set({
        Name: Name,
        Surname: Surname,
        PhoneNumber: PhoneNumber,
        ProfileImage: profileImage,
        Email:userEmail,
        UserEmail : email
      });

      setFullName('');
      setSurname('');
      setPhoneNumber('');
      setProfileImage(null);
      alert('Contact added successfully!');
    } catch (error) {
      console.error('Error adding contact:', error.message);
      alert('Failed to add contact. Please try again.');
    }
  };

  const selectImage = async () => {
    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    };

    const result = await ImagePicker.launchImageLibraryAsync(options);

    if (!result.cancelled) {
      setProfileImage(result.uri);
    }
  };

  const takePhoto = async () => {
    const options = {
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    };

    const result = await ImagePicker.launchCameraAsync(options);

    if (!result.cancelled) {
      setProfileImage(result.uri);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/background.jpg")}
      style={styles.backgroundImage}
    >
    <View style={styles.container}>
    
      <Text style={{ marginBottom: 25 }}>Profile</Text>

      <TouchableOpacity onPress={selectImage}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <Image source={require("../assets/profile.jpg")} style={styles.profileImage} />
        )}
      </TouchableOpacity>
  
      <TouchableOpacity onPress={takePhoto}>
        <Text style={{ marginTop: 10, color: 'blue' }}>Take Photo</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder=" Name"
        onChangeText={(text) => setFullName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder=" Surname"
        onChangeText={(text) => setSurname(text)}
      />
      <TextInput
        style={styles.input}
        placeholder=" Phone Number"
        onChangeText={(text) => setPhoneNumber(text)}
      />
      <TextInput
        style={styles.input}
        placeholder=" Email Address"
        onChangeText={(text) => setEmail(text)}
      />

      <TouchableHighlight style={styles.loginBtn} onPress={handleValidation}>
        <Text style={styles.loginText}>Add Contact</Text>
      </TouchableHighlight>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  loginText: {
    color: "white",
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    marginTop: 5,
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: '#7de5f6',
  },
});

export default Profils;