import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import "firebase/storage"; 

var config = {
    apiKey: "XXXXXXXXX",
    authDomain: "XXXXXXX.firebaseapp.com",
    databaseURL: "https://XXXXXX.firebaseio.com",
    projectId: "XXXXXXXXX",
    storageBucket: "gs://XXXXXXX.appspot.com/",
    messagingSenderId: "XXXXXXX"
  };
  firebase.initializeApp(config);

  export default firebase