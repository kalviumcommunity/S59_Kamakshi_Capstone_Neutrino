import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithRedirect, getRedirectResult } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB3z7t-z2ju0Tb5BBOecej3PfPL_ClVbXI",
  authDomain: "neutrino-131207.firebaseapp.com",
  projectId: "neutrino-131207",
  storageBucket: "neutrino-131207.appspot.com",
  messagingSenderId: "642200111736",
  appId: "1:642200111736:web:0f3ad4f5788167b88cbb8d",
  measurementId: "G-R3CBCJXKVS"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithRedirect, getRedirectResult };
