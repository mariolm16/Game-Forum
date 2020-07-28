import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:4000' });

export const signUp = async (signUpData) => {
  const userData = await api.post('/auth/signup', signUpData);
  console.log(userData);
  localStorage.setItem('authToken', userData.data.token);
  api.defaults.headers.common.authorization = `Bearer ${userData.data.token}`;
  console.log(userData);
  return userData;
};
