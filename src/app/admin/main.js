import Vue from 'vue'
import App from './App.vue'
import router from '@/router/admin.js'
import store from '@/store/admin.js'
import http from '@/http'

Vue.config.productionTip = false

Vue.prototype.$http = http;

new Vue({  
  router: router,
  store: store,  
  render: h => h(App)
}).$mount('#app')
