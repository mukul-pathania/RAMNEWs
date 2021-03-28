import Axios from 'axios';

const api = Axios.create({
  baseURL: 'http://localhost:5000/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    // 'Access-Control-Allow-Origin': '*',
  },
});

export default api;
