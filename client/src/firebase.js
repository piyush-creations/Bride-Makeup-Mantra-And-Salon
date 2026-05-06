import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCQO1qGnqJSYt0iXpjQD31cY5ti8iYRakU",
  authDomain: "bmmas-522ed.firebaseapp.com",
  projectId: "bmmas-522ed",

  // ✅ IMPORTANT FIX
  storageBucket: "bmmas-522ed.appspot.com",

  messagingSenderId: "1043312555484",
  appId: "1:1043312555484:web:aeebfb464558241f3d8b19",
};

const app = initializeApp(firebaseConfig);

// ✅ EXPORT STORAGE
export const storage = getStorage(app);