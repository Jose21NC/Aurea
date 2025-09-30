// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLyc7GfXJ9h22blNKPUPyene1jd3HzT9g",
  authDomain: "aurea-marketplace.firebaseapp.com",
  projectId: "aurea-marketplace",
  storageBucket: "aurea-marketplace.firebasestorage.app",
  messagingSenderId: "387822057241",
  appId: "1:387822057241:web:bc0ac4dc8636775334b788",
  measurementId: "G-V60FDVYLF4"
};


// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta los servicios que necesitas
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };

