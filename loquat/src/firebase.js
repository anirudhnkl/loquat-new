import firebase from 'firebase'

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCRQp38lUAQqojL2GX7eNB_Gt2QkE8fHB0",
    authDomain: "loquat.firebaseapp.com",
    databaseURL: "https://loquat.firebaseio.com",
    projectId: "loquat",
    storageBucket: "loquat.appspot.com",
    messagingSenderId: "389439484288"
};

firebase.initializeApp(config);
export default firebase;