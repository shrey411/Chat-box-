import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAzjxLou8WaHo93DcDX6Djz7xNc4BH4dzE",
    authDomain: "chat-box-website.firebaseapp.com",
    projectId: "chat-box-website",
    storageBucket: "chat-box-website.appspot.com",
    messagingSenderId: "563059502860",
    appId: "1:563059502860:web:6a178b41f54214ff1b2329",
    databaseURL: "https://chat-box-website-default-rtdb.firebaseio.com"
  };

  export const app = initializeApp(firebaseConfig)