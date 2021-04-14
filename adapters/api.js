import Axios from 'axios';
import Router from 'next/router';

let token;

const api = Axios.create({
  baseURL: 'http://localhost:5000/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    // 'Access-Control-Allow-Origin': '*',
  },
});

const getRefreshToken = async () => {
  try {
    const res = await Axios.get('http://localhost:5000/refresh_token', {
      withCredentials: true,
      crossDomain: true,
    });
    console.log('Response', res);
    token = res.data.token;
    if (token) {
      return token;
    }
  } catch (error) {
    console.log(error);
    Router.push('/');
  }
};

api.interceptors.response.use(
  async (response) => {
    console.log(response);
    if (response.data.token) {
      token = response.data.token;
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      console.log(api.defaults.headers);
    }
    return response;
  },
  async (error) => {
    const ogReq = error.config;
    if (error.response.status === 401 && !ogReq._retry) {
      ogReq._retry = true;
      console.log('retrying....');
      token = await getRefreshToken();
      if (token) {
        api.defaults.headers.common.Authorization = `Bearer ${token}`;
        return api(ogReq); // retry original request
      }
    }
  }
);

api.interceptors.request.use(
  (config) => {
    config.headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default api;
