import axios from 'axios';
import { Loading, Message } from 'element-ui';
import router from '@/router';
import { bus } from '@/utils/Bus';

// const env = process.env.NODE_ENV || 'development'
// export let url = 'https://boss-server.ingluxury.com/'
// export let staticUrl = 'https://static1.ingluxury.com/'
// export let wsUrl = 'ws://boss-server.ingluxury.com/'

// if (env === 'development') {

let baseurl = 'http://47.110.236.254:8100/';

// let staticUrl = 'https://static1.ingluxury.com/';
// let wsUrl = 'ws://47.110.236.254:8100/';
// url = 'http://192.168.10.126:8100/'
// url = 'http://localhost:3999/'
// url = 'http://47.110.236.254:8100/'
// }
// if (env === 'test') {
//   url = 'http://47.110.236.254:8100/'
//   staticUrl = 'https://static1.ingluxury.com/'
// }
// if (env === 'production') {
//   url = 'https://boss-server.ingluxury.com/'
// }

// axios.defaults.timeout = 20000;
// axios.defaults.withCredentials = true;

const instance = axios.create({
  // 请求超时
  timeout: 20000,
  //定义请求根目录
  baseURL: baseurl
});

let loadinginstace;
instance.interceptors.request.use(
  config => {
    let token = bus.get('token');
    config.headers.token = token;
    // element ui Loading方法
    // loadinginstace = Loading.service({
    //   fullscreen: true
    // });
    return config;
  },
  error => {
    // loadinginstace.close();
    Message.error({
      message: '加载超时'
    });
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  data => {
    // 响应成功关闭loading
    // console.log(data, 'data');
    // loadinginstace.close();
    return data;
  },
  error => {
    // loadinginstace.close();
    Message.error({
      message: '加载失败'
    });
    return Promise.reject(error);
  }
);

export function fetch(config) {
  return new Promise((resolve, reject) => {
    instance(config)
      .then(res => {
        if (res.data.code === 100002) {
          router.push({
            path: '/login'
          });
          bus.remove('token');
          bus.remove('user');
          Message.error({
            message: '登录失效'
          });
        }
        if (res.data.code !== 0) {
          Message.error({
            message: res.data.msg
          });
        }

        resolve(res.data);
        //失败后执行的函数
      })
      .catch(err => {
        Message.error({
          message: '服务器异常'
        });

        reject(err);
      });
  });
}
const getUrl = (url, data) => {
  if (
    url === '/login' ||
    url === '/goods/v4/shelf' ||
    url === '/goods/v4/logicDelete' ||
    url === '/goods/v4/unShelf' ||
    url === '/goods/v4/lockOrUnlock' ||
    url === '/goods/v4/sold' ||
    url === '/goods/v4/getDetail'
  ) {
    return url;
  } else {
    let newUrl = `${url}?`;
    for (let key in data) {
      if (data[key] === '') {
        continue;
      } else {
        newUrl += `${key}=${data[key]}&`;
      }
    }
    return newUrl;
  }
};

export function get(url, data) {
  let newUrl = getUrl(url, data);
  return fetch({
    url: newUrl,
    method: 'get'
  });
}
export function post(url, data) {
  let newUrl = getUrl(url, data);
  return fetch({
    url: newUrl,
    method: 'post',
    data: data
  });
}
