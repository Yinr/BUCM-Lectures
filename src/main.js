import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import './registerServiceWorker'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import router from './router'

Vue.config.productionTip = false
Vue.use(iView);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
