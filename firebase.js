import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA3Q_phvsGGBiJnvA-TkxasL1jeiYkOSDg",
  authDomain: "ai-health-record.firebaseapp.com",
  projectId: "ai-health-record",
  storageBucket: "ai-health-record.firebasestorage.app",
  messagingSenderId: "59398877966",
  appId: "1:59398877966:web:f433e2952de4d20b591d5f"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
