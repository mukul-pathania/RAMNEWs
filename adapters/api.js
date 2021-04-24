import Axios from 'axios';

const api = Axios.create({
  baseURL: 'http://localhost:5000/',
  crossDomain: true,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const getRefreshToken = async () => {
  try {
    const res = await Axios.get('http://localhost:5000/refresh_token', {
      withCredentials: true,
      crossDomain: true,
    });
    return res.data.token;
  } catch (error) {
    console.log(error);
  }
};

api.interceptors.response.use(
  async (response) => response,
  async (error) => {
    const ogReq = error.config;
    if (error.response.status === 401 && !ogReq._retry) {
      ogReq._retry = true;
      const token = await getRefreshToken();
      api.defaults.headers.Authorization = `Bearer ${token}`;
      if (token) {
        return api(ogReq); // retry original request
      }
    }
  }
);

export default api;
