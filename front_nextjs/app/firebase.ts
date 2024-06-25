import { getApp, getApps, initializeApp } from "firebase/app";
import {getAuth} from  "firebase/auth";
import { getFirestore, doc, setDoc ,collection, query, where, orderBy, addDoc, getDocs, Timestamp } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDs9NSYy9eI33NMpKZiBbsQGRV0MkEobbM",
  authDomain: "chat1-7f804.firebaseapp.com",
  projectId: "chat1-7f804",
  storageBucket: "chat1-7f804.appspot.com",
  messagingSenderId: "335839091282",
  appId: "1:335839091282:web:ac2f0a4c8968cd3e68dd8b"
};

// Initialize Firebase
const app = getApps().length? getApp() : initializeApp(firebaseConfig);
const auth = getAuth();
const firestore = getFirestore(app);

// export {auth , app , firestore ,doc, setDoc ,collection, query, where, orderBy, onSnapshot}
export {app,auth, firestore, doc, setDoc, collection, addDoc, query, where, orderBy, getDocs, Timestamp };

