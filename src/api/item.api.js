import axios from 'axios';
const baseURL = `${import.meta.env.VITE_RASPBERRY_STOCKS_API}/api`;

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

export const getAllUserItems = userInput => {
  return axios.get(`${baseURL}/watchlist/${userInput._id}`, userInput);
};

export const addItem = input => {
  return axios.post(
    `${baseURL}/${input.typeOfAsset}/${input.tickerSymbol}`,
    input
  );
};

export const deleteItem = id => {
  return axios.delete(`${baseURL}/watchlist/${id}`);
};
