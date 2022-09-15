import axios from '../api/axios'

const createComment = (slug, commentInput) => {
  return axios.post(`/articles/${slug}/comments`, { comment: commentInput })
}

const deleteComment = (slug, id) => {
  return axios.delete(`/articles/${slug}/comments/${id}`)
}

const getComments = (slug) => {
  return axios.get(`/articles/${slug}/comments`)
}

export default { createComment, getComments, deleteComment }
