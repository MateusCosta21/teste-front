import axios from 'axios';
const api = axios.create({
  baseURL: 'http://localhost:8167/api',
});
api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token');

    if (token && !config.url?.includes('/musicas')) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
