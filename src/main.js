import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import HelloWorld from './components/HelloWorld';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import store from './store';
import axios from 'axios';

Vue.use(VueRouter);

axios.defaults.baseURL = process.env.VUE_APP_BASE_NODE_URL;

const routes = [
  { path: '/', component: HelloWorld },
  { path: '/signup', component: Signup },
  { path: '/login', component: Login },
  { path: '/home', component: Home }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
}).$mount('#app')
