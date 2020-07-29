import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:4000' });
//Sign up new user
export const signUp = async (signUpData) => {
  console.log('passing in user input:', signUpData)
  const userData = await api.post('/auth/signup', signUpData);
  console.log(userData, signUpData);
  localStorage.setItem('authToken', userData.data.token);
  api.defaults.headers.common.authorization = `Bearer ${userData.data.token}`;
  console.log(userData);
  return userData;
};

//Sign in existing user
export const loginUser = async (loginData) => {
  const userData = await api.post('/auth/login', loginData);
  localStorage.setItem('authToken', userData.data.token);
  api.defaults.headers.common.authorization = `Bearer ${userData.data.token}`;
  console.log(userData.data.token)
  return userData.data.foundUser
}

//verify user
export const verifyUser = async () => {
  console.log('verify user running...')
  const token = localStorage.getItem('authToken');
  console.log(token)
  if (token) {
    api.defaults.headers.common.authorization = `Bearer ${token}`;
    console.log('sending token....')
    const userData = await api.get('/auth/verify');
    console.log('found user:', userData.data.foundUser)
    return userData.data.foundUser
  } else {
    return false
  }
}