// Import the functions you need from the SDKs you need
import { initializeApp
} from "firebase/app";
import { getAnalytics
} from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAgWVmN1BCpxL32t1OHJRQElO9tNZXqGH0",
  authDomain: "datingappserver.firebaseapp.com",
  projectId: "datingappserver",
  storageBucket: "datingappserver.appspot.com",
  messagingSenderId: "427627729278",
  appId: "1:427627729278:web:2f001b8df441feb5c0232f",
  measurementId: "G-DR5J8M09KX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);