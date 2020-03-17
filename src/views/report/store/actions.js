import { getOrderList, getConsignList } from '@/api/index.js';
import { GET_ORDER, GET_CONSIGN } from './actionType.js';
export const actions = {
  getOrder({ commit }, data) {
    getOrderList(data).then(res => {
      commit({
        type: GET_ORDER,
        data: res.data
      });
    });
  },
  getConsign({ commit }, data) {
    getConsignList(data).then(res => {
      commit({
        type: GET_CONSIGN,
        data: res.data
      });
    });
  }
};
