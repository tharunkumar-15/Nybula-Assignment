import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth';
import { initializeFirestore } from 'firebase/firestore'
import { getStorage} from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDuE79bi4-w_n397rB2je1WEFl57uIpz0Q",
  authDomain: "nybula-8ada9.firebaseapp.com",
  projectId: "nybula-8ada9",
  storageBucket: "nybula-8ada9.appspot.com",
  messagingSenderId: "68629750584",
  appId: "1:68629750584:web:9e56ea7bbf3b65be16d7cd"
};

// Initialize Firebase
const app=initializeApp(firebaseConfig)
export const auth=getAuth(app);
export const storage = getStorage(app);
export const db = initializeFirestore(app, {
  experimentalAutoDetectLongPolling: true
})
