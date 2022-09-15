import axios from '../api/axios'

const follow = (username) => {
  return axios.post(`/profiles/${username}/follow`)
}

const unfollow = (username) => {
  return axios.delete(`/profiles/${username}/follow`)
}

export default { follow, unfollow }
