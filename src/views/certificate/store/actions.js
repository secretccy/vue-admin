import { getCertificateList } from '@/api/index.js';
import { GET_CERTIFICATE } from './actionType.js';
export const actions = {
  getCertificate({ commit }, data) {
    getCertificateList(data).then((res) => {
      commit({
        type: GET_CERTIFICATE,
        data: res.data,
      });
    });
  },
};
