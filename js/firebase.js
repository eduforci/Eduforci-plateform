// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-storage.js";

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD_9omHq9vzEsO0A7Owb2llJtDPYy3y2_8",
  authDomain: "eduforci-2ab40.firebaseapp.com",
  projectId: "eduforci-2ab40",
  storageBucket: "eduforci-2ab40.firebasestorage.app",
  messagingSenderId: "579205481786",
  appId: "1:579205481786:web:092b397daa505716bd7c03"
};

// Initialisation (doit être fait AVANT toute utilisation de "app")
const app = initializeApp(firebaseConfig);

// Services Firebase
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Log une fois que tout est prêt
console.log("Projet Firebase :", app.options.projectId);

// Export
export { auth, db, storage };
