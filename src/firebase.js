import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyA0RSrAVHNcBe6B2Ob4hsrx_27yMxaVHXo",
    authDomain: "chat-firebase-app-18ed7.firebaseapp.com",
    databaseURL: "https://chat-firebase-app-18ed7.firebaseio.com",
    projectId: "chat-firebase-app-18ed7",
    storageBucket: "chat-firebase-app-18ed7.appspot.com",
    messagingSenderId: "135639613232"
  };
  firebase.initializeApp(config);

  export default firebase;