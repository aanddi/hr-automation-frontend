import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const axiosHhruInstance = axios.create({
  baseURL: 'https://api.hh.ru',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosHhruInstance.interceptors.request.use(
  (config) => {
    const accessToken = import.meta.env.VITE_ACCESS_TOKEN_HH;

    if (accessToken) {
      config.headers.set('Authorization', `Bearer ${accessToken}`);
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);


export { axiosInstance, axiosHhruInstance };