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
  const userPosts = await api.get('/user/profile', id)
  return userPosts.data._posts
}

//get all posts 
export const getPosts = async () => {
  const foundPosts = await api.get('/post/all')
  return foundPosts.data
}

//create new posts
export const createPost = async (postData, id) => {
  console.log(postData, id)
  const newPost = await api.post('/post/new', id, postData)
  return newPost
}

//get single post
export const retPost = async (id) => {
  const post = await api.get(`/post/single/hi/${id}`)
  return post.data
}

//Delete post
export const destroyPost = async (id) => {
  const deletedPost = await api.delete(`/post/${id}`)
  return deletedPost
}

//Edit post
export const editPost = async (id, values) => {
  console.log(id, values)
  const updatedPost = await api.delete(`/post/:id`, values)
  console.log(updatedPost)
}

//make comment 
export const makeComment = async (id, body) => {
  const createObject = {
    body: body
  }
  const newComment = await api.post(`/comment/${id}`, createObject)
  console.log(newComment.data)
  return newComment.data
}

//Delete COmment 
export const destroyComment = async (id) => {
  const deletedComment = await api.delete(`/comment/${id}`)
  console.log(deletedComment)
}

//Get post Replies
export const fetchReply = async (id) => {
  const allReplies = await api.get(`/comment/reply/${id}`)
  console.log(allReplies.data.reply)
  return allReplies.data.reply
}

//Create a reply
export const createReply = async (id, body) => {
  const createObject = {
    body: body
  }
  console.log('API HELPER RECIEVING', 'ID', id, 'AND BODY', createObject)
  const newReply = await api.post(`/reply/${id}`, createObject)
  console.log(newReply.data)
  return newReply.data.body
}

//delete reply
export const deleteReply = async (id) => {
  const deletedReply = await api.delete(`/reply/single/${id}`)
  console.log(deletedReply)
}
//Call gamespot
export const callGamespot = async () => {
  const allNews = await axios.get('https://cors-anywhere.herokuapp.com/https://www.gamespot.com/api/articles/?format=json&filter=publish_date:2020-07-15%7C2020-08-01&videos_api_url&site_detail_url&image&limit=50&deck&api_key=1d6138950310ca804812b2649e6d4a2c1ed2f7e2', { headers: { 'Mario-Project': 'YOUR-SERVICE-NAME' } })
  console.log(allNews.data.results);
  return allNews.data.results;
}