import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet , Image } from 'react-native';
import firebase from '../config';
import md5 from 'md5';
import translateText from '../api/translateText';
import Icon from 'react-native-vector-icons/FontAwesome';


const Chat = ({ route }) => {
  const { contactEmail, contactName } = route.params;
  const currentUser = firebase.auth().currentUser;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setContactIsTyping] = useState(false);

  const sanitizeEmailForFirebaseKey = (email) => {
    return email.replace(/[.#$\/\[\]]/g, '_');
  };

  const generateChatId = (email1, email2) => {   
    const sortedEmails = [email1, email2].sort();
    const sanitizedEmails = sortedEmails.map(email => sanitizeEmailForFirebaseKey(email));
    return md5(`${sanitizedEmails[0]}_${sanitizedEmails[1]}`);
  };

  useEffect(() => {
    if (!currentUser) {
      console.log('User is not authenticated');
      return;
    }

    const chatId = generateChatId(currentUser.email, contactEmail);
    const messagesRef = firebase.database().ref(`chats/${chatId}/messages`);
    const userTypingRef = firebase.database().ref(`chats/${chatId}/usersTyping`);

    const onMessageAdded = (snapshot) => {
      const newMessage = snapshot.val();
      if (firebase.auth().currentUser) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      } else {
        messagesRef.off('child_added', onMessageAdded);
      }
    };

    const onTypingStatusChanged = (snapshot) => {
      const typingStatus = snapshot.val() || {};
      const isContactTyping = typingStatus[sanitizeEmailForFirebaseKey(contactEmail)] || false;
      setContactIsTyping(isContactTyping);
    };

    messagesRef.on('child_added', onMessageAdded);
    userTypingRef.on('value', onTypingStatusChanged);

    return () => {
      messagesRef.off('child_added', onMessageAdded);
      userTypingRef.off('value', onTypingStatusChanged);
    };
  }, [currentUser, contactEmail]);

  const sendMessage = () => {
    if (!currentUser) {
      console.log('User is not authenticated');
      return;
    }

    if (newMessage.trim() === '') {
      return;
    }

    const chatId = generateChatId(currentUser.email, contactEmail);

    const message = {
      senderEmail: currentUser.email,
      receiverEmail: contactEmail,
      text: newMessage,
      timestamp: Date.now(),
    };

    firebase.database().ref(`chats/${chatId}/messages`).push(message);
    setNewMessage('');

    // Stop typing after sending a message
    stopTyping();
  };

  const handleTranslation = async () => {
    try {
      const newText = await translateText(newMessage, 'fr');
      console.log(newText);
      setNewMessage(newText);
    } catch (error) {
      console.error('Error translating message:', error);
    } finally {
      stopTyping();
    }
  };

  const startTyping = () => {
    const chatId = generateChatId(currentUser.email, contactEmail);
    const userTypingRef = firebase.database().ref(`chats/${chatId}/usersTyping`);

    userTypingRef.update({
      [sanitizeEmailForFirebaseKey(currentUser.email)]: true,
    });
  };

  const stopTyping = () => {
    const chatId = generateChatId(currentUser.email, contactEmail);
    const userTypingRef = firebase.database().ref(`chats/${chatId}/usersTyping`);

    userTypingRef.update({
      [sanitizeEmailForFirebaseKey(currentUser.email)]: false,
    });
  };

  const renderMessage = ({ item }) => (
    <View style={item.senderEmail === currentUser.email ? styles.userMessage : styles.contactMessage}>
      <Text style={styles.messageText}>{item.text}</Text>

    </View>
  );
  const capitalizeWords = (str) => {
    return str
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <View style={styles.container}>
    <View style={styles.navabar}>
    <Icon name="phone" size={30} color="#FFF" style = {styles.icon}/>
      <Text style ={styles.sendButtonText} > {capitalizeWords(contactName) }</Text>
      

    </View>

      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.timestamp.toString()}
        style={styles.messageContainer}
      />
      {isTyping && <Text style={styles.typingText}>{contactName} is typing...</Text>}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={newMessage}
          onChangeText={(text) => {
            setNewMessage(text);
            if (text.length > 0) {
              startTyping();
            } else {
              stopTyping();
            }
          }}
        />
        <TouchableOpacity style={styles.sendButton} onPress={() => { sendMessage(); }}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sendButton} onPress={handleTranslation}>
          <Text style={styles.sendButtonText}>Translate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  navabar : {
    backgroundColor : '#0096FF',
    width : '100%',
    height : '5%',
    display : 'flex',
    flexDirection : 'row',
    justifyContent : 'flex-start',
    alignItems : 'center',
  },

  icon : {
   marginRight : 10,
   marginLeft : 10

  },
  
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  messageContainer: {
    flex: 1,
    padding: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  input: {
    flex: 1,
    marginRight: 10,
    padding: 8,
    borderWidth: 1,
    borderRadius: 5,
    fontFamily: 'Arial', 
  },
  sendButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    margin : 5
  },
  sendButtonText: {
    color: '#fff',
    fontFamily: 'Arial', 
  },
  userMessage: {
    backgroundColor: '#007BFF',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    alignSelf: 'flex-end',
    maxWidth: '70%',
  },
  contactMessage: {
    backgroundColor: '#eee',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    alignSelf: 'flex-start',
    maxWidth: '70%',
  },
  messageText: {
    color: '#000',
    fontFamily: 'Arial', // You can change the font family here
  },
  typingText: {
    marginLeft: 16,
    marginBottom: 8,
    color: '#555',
    fontStyle: 'italic',
  },
});

export default Chat;
