import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import './registerServiceWorker'

Vue.use(Buefy)
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
