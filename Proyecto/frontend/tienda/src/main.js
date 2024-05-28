import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

//comienza Firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRxz83HkkYy4zGGzUmpa4nzGcb8r7CWxs",
  authDomain: "programacion-web-9bbac.firebaseapp.com",
  projectId: "programacion-web-9bbac",
  storageBucket: "programacion-web-9bbac.appspot.com",
  messagingSenderId: "675778787490",
  appId: "1:675778787490:web:d0a3917341511e1e863ffb"
};

// Initialize Firebase
initializeApp(firebaseConfig);
//termina Firebase

const app = createApp(App)

app.use(router);

app.mount('#app')
 