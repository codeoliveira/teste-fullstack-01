import Vue from 'vue'

import * as Bootstrap from 'bootstrap';

import './assets/fonts/icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/global.scss';
// Importamos instancia do axios 
import './plugins/axios';

import App from './App'
import router from './router'
import store from './store'

import './main.scss';

// Make BootstrapVue available throughout your project
// Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
// Vue.use(IconsPlugin)

// Vue.use($);
Vue.use(Bootstrap);

// VUE TOOLS
Vue.config.devtools = true

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
