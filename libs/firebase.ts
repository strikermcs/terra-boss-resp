import { initializeApp } from 'firebase/app'
import { getAuth } from "firebase/auth"
import { getFirestore } from 'firebase/firestore'
    
    const firebaseConfig = {
        apiKey: "AIzaSyB08xTK-06RmB5rvYmILlZti1t31_wRMr8",
        authDomain: "boss-resp.firebaseapp.com",
        projectId: "boss-resp",
        storageBucket: "boss-resp.appspot.com",
        messagingSenderId: "924254872617",
        appId: "1:924254872617:web:287e02a8f5e2939e4fe838"
    };
  
    const app = initializeApp(firebaseConfig)

    const auth = getAuth(app)
    const db = getFirestore(app)

export {
    auth,
    db
}    