
// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'
import axios from 'axios'

const app = createApp(App)

registerPlugins(app)
app.config.globalProperties.axios = axios

app.mount('#app')
