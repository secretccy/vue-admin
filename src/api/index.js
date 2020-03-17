import { get, post } from '@/utils/index.js';
import axios from 'axios';
export const login = data => post('/auth/login', data);
export const getUserList = data => get('/user/filter', data);
export const getAttentionList = data => get('/user/attention/attention', data);
export const getFansList = data => get('/user/attention/fans', data);
export const getCommodityList = data => post('/goods/v4/findPage', data);
export const putaway = data => post('/goods/v4/shelf', data);
export const deletegoods = data => post('/goods/v4/logicDelete', data);
export const unShelf = data => post('/goods/v4/unShelf', data);
export const lock = data => post('/goods/v4/lockOrUnlock', data);
export const sold = data => post('/goods/v4/sold', data);
export const getOrderList = data => get('/report/order', data);
export const getConsignList = data => get('report/consignment', data);
export const getDetailInfo = data => post('/goods/v4/getDetail', data);

export const getImgList = data => {
  let newUrl = '';
  for (let key in data) {
    if (data[key] === '') {
      continue;
    } else {
      newUrl += `${key}=${data[key]}&`;
    }
  }
  return axios.get(
    `https://boss-server.ingluxury.com/sys/sysFile/findPage?${newUrl}`
  );
};
