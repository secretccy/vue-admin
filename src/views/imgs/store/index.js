import { actions } from './actions.js';
import mutations from './mutations.js';
const state = {
  imgList: [],
  pageSum: 0,
  loading: {
    val: true
  }
};

export default {
  actions,
  mutations,
  state
};
