import { actions } from './actions.js';
import mutations from './mutations.js';
const state = {
  orderList: [],
  pageSum: 0,
  loading: {
    val: true
  },
  consignList: []
};

export default {
  actions,
  mutations,
  state
};
