import Axios from 'axios';

const api = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  crossDomain: true,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const getRefreshToken = async () => {
  try {
    const res = await Axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}refresh_token`, {
      withCredentials: true,
      crossDomain: true,
    });
    return res.data.token;
  } catch (error) {
    return null;
  }
};

api.interceptors.response.use(
  async (response) => response,
  async (error) => {
    const ogReq = error.config;
    if (
      ogReq.url !== 'login' &&
      ogReq.url !== 'signup' &&
      error.response.status === 401 &&
      !ogReq._retry
    ) {
      ogReq._retry = true;
      const token = await getRefreshToken();
      api.defaults.headers.Authorization = `Bearer ${token}`;
      if (token) {
        return api(ogReq); // retry original request
      }
    } else {
      return Promise.reject(error);
    }
  }
);

export default api;
