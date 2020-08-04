import axios from 'axios';
//Connects frontend to backend
const api = axios.create({ baseURL: 'http://localhost:4000' });

//Sign up new user
export const signUp = async (signUpData) => {
  const userData = await api.post('/auth/signup', signUpData);
  localStorage.setItem('authToken', userData.data.token);
  api.defaults.headers.common.authorization = `Bearer ${userData.data.token}`;
  return userData.data.user;
};

//Sign in existing user
export const loginUser = async (loginData) => {
  const userData = await api.post('/auth/login', loginData);
  localStorage.setItem('authToken', userData.data.token);
  api.defaults.headers.common.authorization = `Bearer ${userData.data.token}`;
  return userData.data.foundUser
}

//Verify user
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

//Edit user profile
export const putProfile = async (values) => {
  const updatedProfile = await api.put('/user/profile', values);
  return updatedProfile.data
}

//Delete user profile
export const deleteUser = async (_id) => {
  const deleteUser = await api.delete('/user/profile', _id)
  return deleteUser
}

//Get user posts
export const findPosts = async (id) => {
  const userPosts = await api.get('/user/profile', id)
  if (userPosts) {
    return userPosts.data._posts
  } else {
    return []
  }
}

//Get all posts 
export const getPosts = async () => {
  const foundPosts = await api.get('/post/all')
  return foundPosts.data
}

//Create new posts
export const createPost = async (postData, id) => {
  const newPost = await api.post('/post/new', id, postData)
  return newPost
}

//Get single post
export const retPost = async (id) => {
  const post = await api.get(`/post/single/hi/${id}`)
  return post.data
}

//Delete post
export const destroyPost = async (id) => {
  const deletedPost = await api.delete(`/post/${id}`)
  console.log(deletedPost)
  return deletedPost.data
}

//Edit post
export const editPost = async (id, values) => {
  const updatedPost = await api.delete(`/post/:id`, values)
}

//Make comment 
export const makeComment = async (id, body) => {
  const createObject = {
    body: body
  }
  const newComment = await api.post(`/comment/${id}`, createObject)
  return newComment.data
}

//Delete Comment 
export const destroyComment = async (id) => {
  const deletedComment = await api.delete(`/comment/${id}`)
}

//Get Comment Replies
export const fetchReply = async (id) => {
  const allReplies = await api.get(`/comment/all/reply/${id}`)
  console.log(allReplies.data)
  return allReplies.data
}

//Create a reply
export const createReply = async (id, body) => {
  const createObject = {
    body: body
  }
  const newReply = await api.post(`/reply/${id}`, createObject)
  return newReply.data.body
}

//Delete reply
export const deleteReply = async (id) => {
  const deletedReply = await api.delete(`/reply/single/${id}`)
}

//Call gamespot API - fetching daily news
export const callGamespot = async (yesterday, today) => {
  const allNews = await axios.get(`https://cors-anywhere.herokuapp.com/https://www.gamespot.com/api/articles/?format=json&filter=publish_date:${yesterday}%7C${today},categories:18&limit=24&api_key=1d6138950310ca804812b2649e6d4a2c1ed2f7e2`, { headers: { 'Mario-Project': 'YOUR-SERVICE-NAME' } })
  return allNews.data.results;
}