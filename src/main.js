import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

import { Layout, Row, Col, Card, Icon } from 'ant-design-vue';

Vue.use(Layout);
Vue.use(Row);
Vue.use(Col);
Vue.use(Card);
Vue.use(Icon);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
