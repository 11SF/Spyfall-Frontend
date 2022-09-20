import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'

import App from './App.vue'
import router from './router'

// import socketio from 'socket.io-client';
// import VueSocketIO from 'vue-socket.io';
// export const SocketInstance = socketio('http://localhost:3000');
// app.use(VueSocketIO, SocketInstance)

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.mount('#app')
