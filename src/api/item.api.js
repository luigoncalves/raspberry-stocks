import axios from 'axios';
const baseURL = `${import.meta.env.RASPBERRY_STOCKS_API}/api`;

const setAuthorizationHeaders = () => {
  axios.interceptors.request.use(config => {
    // retrieve the token from localStorage
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  });
};

setAuthorizationHeaders();

export const getAllItems = () => {
  return axios.get(`${baseURL}/watchlist`);
};
export const addItem = () => {
  return axios.post(`${baseURL}/watchlist`);
};
export const deleteItem = id => {
  return axios.delete(`${baseURL}/watchlist/${id}`);
};
