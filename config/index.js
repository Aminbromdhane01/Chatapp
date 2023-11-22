// Import the functions you need from the SDKs you need
import app from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/database"
import "firebase/compat/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoJIBwQO1hom3KOHW2BhD2NF2BzAsjdxM",
  authDomain: "chatapp-66a32.firebaseapp.com",
  projectId: "chatapp-66a32",
  storageBucket: "chatapp-66a32.appspot.com",
  messagingSenderId: "77522062429",
  appId: "1:77522062429:web:bd699421a9d021101991b4"
};

// Initialize Firebase
const firebase = app.initializeApp(firebaseConfig);
export default firebase;