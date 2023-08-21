import firebase from "firebase/compat/app";
import "firebase/compat/database";

const firebaseConfig = {
    apiKey: "AIzaSyCYTnNVak7VTqHDZCrctLcpvlFgL9MSOdw",
    authDomain: "crud-app-b270b.firebaseapp.com",
    projectId: "crud-app-b270b",
    storageBucket: "crud-app-b270b.appspot.com",
    messagingSenderId: "911624678742",
    appId: "1:911624678742:web:9c258cee9c71fcdd60baf7"
  };

  const fireDb = firebase.initializeApp(firebaseConfig)
  export default fireDb.database().ref()