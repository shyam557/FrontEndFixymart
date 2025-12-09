// firebase/firebase.js
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  // apiKey: "AIzaSyDMPgN4Vasx6I4iVCXNjyzZBE9pBTG8gYw",
  // authDomain: "fixymart-e2ad5.firebaseapp.com",
  // projectId: "fixymart-e2ad5",
  // storageBucket: "fixymart-e2ad5.firebasestorage.app",
  // messagingSenderId: "140656517664",
  // appId: "1:140656517664:web:12898b27611a9a5f01d245",
  // measurementId: "G-EJDK2BD0LP"

  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

const auth = getAuth(app);
auth.useDeviceLanguage();

export { app, auth };
