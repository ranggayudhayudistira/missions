import { createApp } from 'vue'
import App from './App.vue'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
import AppRouter from './routes/index.js'

createApp(App).use(Quasar, quasarUserOptions).use(AppRouter).mount('#app')
