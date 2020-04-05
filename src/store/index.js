import Vue from 'vue';
import Vuex from 'vuex';
import user from '@/views/user/store/index.js';
import commodity from '@/views/commodity/store/index.js';
import report from '@/views/report/store/index.js';
import imgs from '@/views/imgs/store/index.js';
import certificate from '@/views/certificate/store/index.js';
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    commodity,
    report,
    imgs,
    certificate,
  },
});
