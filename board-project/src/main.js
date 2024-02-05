import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import mixins from './mixins.js'
import store from './store.js'

createApp(App)
    .use(router)
    .use(store)
    .mixin(mixins)
    .mount('#app')
