import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Crack from './views/Crack.vue'

Vue.use(Router)

export default new Router({
    mode: "history",
    routes: [{
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/crack',
            name: 'crack',
            component: Crack
        }
    ]
})
