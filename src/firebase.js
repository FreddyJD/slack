import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import "firebase/storage";


var config = {
    apiKey: "XXXXXX",
    authDomain: "sXXXXX.XXXXXX.com",
    databaseURL: "https://XXXXXX.com",
    projectId: "sXXXXXXX",
    storageBucket: "xXXXXXX2XXXXappspXXot.com/",
    messagingSenderId: "XXXXXXXXXXX"
};
firebase.initializeApp(config);

export default firebase;