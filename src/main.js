// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue/dist/vue.esm-bundler.js'

// Plugins
import { registerPlugins } from '@/plugins'
import axios from 'axios'

const app = createApp(App)


registerPlugins(app)
app.config.globalProperties.axios = axios

app.mount('#app')