import { createApp } from 'vue'
import App from './App.vue'
import router from './router'   // import the router

// create the app and tell it to use the router
createApp(App)
  .use(router)
  .mount('#app')
