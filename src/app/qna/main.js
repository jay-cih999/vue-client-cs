import Vue from 'vue'
import App from './App.vue'
import router from '@/router/qna'
import http from '@/http'

Vue.config.productionTip = false

Vue.prototype.$http = http;

new Vue({
  http,
  router,  
  render: h => h(App)
}).$mount('#app')
