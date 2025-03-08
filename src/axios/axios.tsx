import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: 'https://frontend-take-home-service.fetch.com',
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get('fetch-access-token');
  if (token) {
    config.headers
      .Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;