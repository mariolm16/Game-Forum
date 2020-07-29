import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:4000' });
//Sign up new user
export const signUp = async (signUpData) => {
  console.log('passing in user input:', signUpData)
  const userData = await api.post('/auth/signup', signUpData);
  console.log(userData, signUpData);
  localStorage.setItem('authToken', userData.data.token);
  api.defaults.headers.common.authorization = `Bearer ${userData.data.token}`;
  console.log(userData.data.user);
  return userData.data.user;
};

//Sign in existing user
export const loginUser = async (loginData) => {
  const userData = await api.post('/auth/login', loginData);
  localStorage.setItem('authToken', userData.data.token);
  api.defaults.headers.common.authorization = `Bearer ${userData.data.token}`;
  return userData.data.foundUser
}

//verify user
export const verifyUser = async () => {
  const token = localStorage.getItem('authToken');
  if (token) {
    api.defaults.headers.common.authorization = `Bearer ${token}`;
    const userData = await api.get('/auth/verify');
    return userData.data
  } else {
    return false
  }
}

//edit user profile
export const putProfile = async (values) => {
  const updatedProfile = await api.put('/user/profile', values);
  return updatedProfile.data
}

//delete user profile
export const deleteUser = async (_id) => {
  console.log(_id)
  const deleteUser = await api.delete('/user/profile', _id)
  return deleteUser
}

//get user posts

export const findPosts = async (id) => {
  console.log(id)
  const userPosts = await api.get('/user/profile', id)
  return userPosts.data._posts
}