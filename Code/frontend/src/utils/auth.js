import React, { useEffect, useState } from 'react';
import firebase from 'firebase';

export const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
});

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            await app.auth().onAuthStateChanged((user) => {
                setCurrentUser(user);
                setIsLoading(false);
            });
        })();

    },[]);

    return (
        <AuthContext.Provider value={{currentUser, isLoading}}>
            { children }
        </AuthContext.Provider>
    );

}

export async function getToken() {
    try {
        return await app.auth().currentUser.getIdToken(true);
    } catch (e) {
        return false;
    }
}
