import axios from 'axios'

const baseURL = import.meta.env.VITE_APP_API_URL // import.meta.env로 접근하여 변수 사용

const instance = axios.create({
  baseURL,
})

export function getPosts() {
  console.log(baseURL)
  return instance.get(`${baseURL}/posts`)
}

export function getPostsId(id) {
  return instance.get(`${baseURL}/posts:${id}`)
}

export function createPost(data) {
  return instance.post(`${baseURL}/posts`, data)
}

export function updatePost(id, data) {
  return instance.put(`${baseURL}/posts/${id}`, data)
}

export function deletePost(id) {
  return instance.delete(`${baseURL}/posts/${id}`)
}
