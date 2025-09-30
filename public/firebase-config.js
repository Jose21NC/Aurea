// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Your web app's Firebase configuration
// IMPORTANTE: Reemplaza esto con la configuración de tu propio proyecto de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCLyc7GfXJ9h22blNKPUPyene1jd3HzT9g",
  authDomain: "aurea-marketplace.firebaseapp.com",
  projectId: "aurea-marketplace",
  storageBucket: "aurea-marketplace.firebasestorage.app",
  messagingSenderId: "387822057241",
  appId: "1:387822057241:web:bc0ac4dc8636775334b788",
  measurementId: "G-V60FDVYLF4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Export the instances for use in other files
export { app, auth, db };
