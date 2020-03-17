import { actions } from './actions.js';
import mutations from './mutations.js';
const state = {
  commodityList: [],
  loading: true,
  pageSum: 0,
  baseInfo: {}
};

export default {
  actions,
  mutations,
  state
};
