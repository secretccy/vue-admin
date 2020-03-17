import { actions } from './actions.js';
import mutations from './mutations.js';
const state = {
  userList: [],
  list: [],
  flag: {
    drawer: false,
    loading: true
  },
  pageSum: 0
};

export default {
  actions,
  mutations,
  state
};
