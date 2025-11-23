import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Validate minimal required config before initializing Firebase on the client.
const hasValidApiKey = typeof firebaseConfig.apiKey === "string" && firebaseConfig.apiKey.trim() !== "";

let app = null;
let auth = null;

if (!hasValidApiKey) {
  // Helpful warning for developers — avoid throwing at runtime in the client bundle.
  // Use NEXT_PUBLIC_FIREBASE_API_KEY in your .env.local for client-side Firebase.
  // If you intend to only use Firebase on the server, move initialization to the server.
  // This prevents the app crashing with `auth/invalid-api-key` when the env var is missing.
  // eslint-disable-next-line no-console
  console.warn("Firebase not initialized: missing NEXT_PUBLIC_FIREBASE_API_KEY. Authentication will be disabled on the client.");
} else {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
  } catch (err) {
    // Initialization can still fail if config is malformed; surface an informative message
    // eslint-disable-next-line no-console
    console.error("Firebase initialization error:", err);
    app = null;
    auth = null;
  }
}

export { app, auth };
