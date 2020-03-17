import { getImgList } from '@/api/index.js';
import { GET_IMG } from './actionType.js';
export const actions = {
  getImg({ commit }, data) {
    getImgList(data).then(res => {
      commit({
        type: GET_IMG,
        data: res.data.data
      });
    });
  }
};
