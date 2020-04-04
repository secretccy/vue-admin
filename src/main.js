import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';
import App from './App.vue';
import router from './router';
import store from './store/index';
import ElementUI from 'element-ui';
import VueLazyload from 'vue-lazyload';
import './style/reset.scss';
import 'element-ui/lib/theme-chalk/index.css';
import './router/defendrouter.js';
import VueClipboard from 'vue-clipboard2';
VueClipboard.config.autoSetContainer = true;
Vue.use(VueClipboard);
Vue.config.productionTip = false;
Vue.use(VueCompositionApi);
Vue.use(ElementUI);
Vue.use(VueLazyload);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
