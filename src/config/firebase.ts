import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDemoKeyForTechInternPath123456789",
  authDomain: "techinternpath.firebaseapp.com",
  projectId: "techinternpath",
  storageBucket: "techinternpath.appspot.com",
  messagingSenderId: "987654321098",
  appId: "1:987654321098:web:abcdef123456789"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Configure Google provider
googleProvider.setCustomParameters({
  prompt: 'select_account',
  hd: undefined // Allow any domain
});

// Add additional scopes if needed
googleProvider.addScope('email');
googleProvider.addScope('profile');

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;