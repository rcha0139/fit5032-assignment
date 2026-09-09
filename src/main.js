import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import { initializeApp } from 'firebase/app'
// TODO: add sdks for firebase products

const firebaseConfig = {
    apiKey: "AIzaSyDtB_cw81N846Io6SSCS7GNizIuiMPdyQo",
    authDomain: "fit5032-d3d97.firebaseapp.com",
    projectId: "fit5032-d3d97",
    storageBucket: "fit5032-d3d97.firebasestorage.app"
    // messagingSenderId: "314424208602",
    // appId: ""
}

initializeApp(firebaseConfig)

const app = createApp(App)
app.use(router)

app.mount('#app')