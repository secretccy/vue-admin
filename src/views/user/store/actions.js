import { getUserList, getAttentionList, getFansList } from '@/api/index.js';
import { GET_USER, GET_ATTENTION, GET_FANS } from './actionType.js';
export const actions = {
  getUser({ commit }, data) {
    getUserList(data).then(res => {
      commit({
        type: GET_USER,
        data: res.data
      });
    });
  },
  getAttention({ commit }, data) {
    getAttentionList(data).then(res => {
      commit({
        type: GET_ATTENTION,
        data: res.data
      });
    });
  },
  getFans({ commit }, data) {
    getFansList(data).then(res => {
      commit({
        type: GET_FANS,
        data: res.data
      });
    });
  }
};
