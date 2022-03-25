import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// 1

// const firebaseConfig = {
//   apiKey: 'AIzaSyCCb6xMfjRRRIM0v7LpYkU1vKO-Q59kBhQ',
//   authDomain: 'chat-app-8ad09.firebaseapp.com',
//   projectId: 'chat-app-8ad09',
//   storageBucket: 'chat-app-8ad09.appspot.com',
//   messagingSenderId: '216304882675',
//   appId: '1:216304882675:web:f27313ef23be8ce7ec7886',
// };

// 2

// const firebaseConfig = {
//   apiKey: "AIzaSyDS1rufXwKv2F44VMA2_F4QRuPTnl7Invg",
//   authDomain: "chat-e1f71.firebaseapp.com",
//   projectId: "chat-e1f71",
//   storageBucket: "chat-e1f71.appspot.com",
//   messagingSenderId: "626799476327",
//   appId: "1:626799476327:web:8d6ff822baae3020ef5ec2"
// };

// 3

// const firebaseConfig = {
//   apiKey: "AIzaSyBZt_JM7DvWKwe7kXqTFhhDYIf3qa78-M8",
//   authDomain: "chat-3-a7c1e.firebaseapp.com",
//   projectId: "chat-3-a7c1e",
//   storageBucket: "chat-3-a7c1e.appspot.com",
//   messagingSenderId: "883100025028",
//   appId: "1:883100025028:web:21705df102beb021624991"
// };

// 4

const firebaseConfig = {
  apiKey: "AIzaSyCToyrfauBQqeULNlYDbPK1BMlb01jMpuo",
  authDomain: "chat-4-e5126.firebaseapp.com",
  projectId: "chat-4-e5126",
  storageBucket: "chat-4-e5126.appspot.com",
  messagingSenderId: "118434194218",
  appId: "1:118434194218:web:306362696f7688b3943453"
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };
