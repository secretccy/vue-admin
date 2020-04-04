import { getCommodityList, getDetailInfo } from '@/api/index.js';
import { GET_COMMODITY, GET_DETAIL } from './actionType.js';
export const actions = {
  getCommodity({ commit }, data) {
    getCommodityList(data).then((res) => {
      commit({
        type: GET_COMMODITY,
        data: res.data,
      });
    });
  },
  getDetail({ commit }, data) {
    getDetailInfo(data).then((res) => {
      commit({
        type: GET_DETAIL,
        data: res.data,
      });
    });
  },
};
