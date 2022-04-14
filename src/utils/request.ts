import axios from 'axios';
const request = axios.create({
  timeout: 5000,
});
request.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem('USERTOKEN');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
//响应式拦截器
request.interceptors.response.use(
  (response) => {
    if (response.data.ErrorCode === 401) {
      window.localStorage.remove('USERTOKEN');
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default request;
