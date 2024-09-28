import {initializeApp} from 'firebase/app';
import { getAnalytics ,isSupported} from "firebase/analytics";
import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA2EUmmwufK-yNtko2UxrywzdDuOBiCJZk",
    authDomain: "courtiq-d9e17.firebaseapp.com",
    projectId: "courtiq-d9e17",
    storageBucket: "courtiq-d9e17.appspot.com",
    messagingSenderId: "248116414729",
    appId: "1:248116414729:web:3ed14926dcde4b65512bd8",
    measurementId: "G-NHBM2K1DG7"
};
let analytics;
async function initializeAnalytics() {
    if (typeof window !== 'undefined' && await isSupported()) {
        analytics = getAnalytics(app);
    }
}
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
initializeAnalytics();
export { auth,createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut };