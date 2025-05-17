import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBexI_OMBQiG25hWecLbLgj_m-7W5T0zeI",
  authDomain: "lab-4-924b3.firebaseapp.com",
  projectId: "lab-4-924b3",
  storageBucket: "lab-4-924b3.firebasestorage.app",
  messagingSenderId: "789007215932",
  appId: "1:789007215932:web:b0387b019585b7f791c239",
  measurementId: "G-P6XLNXYGY0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app; 