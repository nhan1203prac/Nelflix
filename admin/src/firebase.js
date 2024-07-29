import firebase from "firebase/compat/app"
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCbYtlXiu5RNwXcaFKYZu4FsKlVAnUBTB4",
  authDomain: "netflix-c6275.firebaseapp.com",
  projectId: "netflix-c6275",
  storageBucket: "netflix-c6275.appspot.com",
  messagingSenderId: "913193606005",
  appId: "1:913193606005:web:36d66a87927a20ef45113c",
  measurementId: "G-Y3GV7K2NNS",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
export default storage;