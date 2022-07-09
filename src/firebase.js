// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
// import { firebaseConfig } from "./firebase.config";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyB9_3cFjNhPQsp5j6aohMoEWxgTU-E2_ps",
    authDomain: "quotable-a0bf3.firebaseapp.com",
    projectId: "quotable-a0bf3",
    storageBucket: "quotable-a0bf3.appspot.com",
    messagingSenderId: "712734492453",
    appId: "1:712734492453:web:72da11a7cc1faf2612fccc",
    measurementId: "G-ET998LDRNR"
  };  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);

export const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
}

export const logIn = (email, password) => {
    console.log(email, password)
    return signInWithEmailAndPassword(auth, email, password);
}

export const logOut = () => {
    return signOut(auth);
}

export const useAuth = () => {
    const [currentUser, setCurrentUser] = useState();
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => setCurrentUser(user));
        return unsubscribe;
    }, []);
    return currentUser;
}


export default app;
