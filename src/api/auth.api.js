import axios from 'axios';
const baseURL = `${import.meta.env.VITE_RASPBERRY_STOCKS_API}/auth`;

export const signup = user => {
  return axios.post(`${baseURL}/signup`, user);
};
export const login = user => {
  return axios.post(`${baseURL}/login`, user);
};

export const changeUsername = updatedUser => {
  return axios.put(`${baseURL}/changeUsername`, updatedUser);
};

export const changeUserPassword = input => {
  return axios.put(`${baseURL}/changePassword`, input);
};

export const deleteUser = userToDelete => {
  return axios.delete(`${baseURL}/profile/${userToDelete._id}`);
};

// send the jwt in the authorization headers
export const verify = storedToken => {
  return axios.get(`${baseURL}/verify`, {
    headers: { Authorization: `Bearer ${storedToken}` },
  });
};
