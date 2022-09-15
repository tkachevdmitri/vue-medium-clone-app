import feedApi from '../api/feed'

export const mutationTypes = {
  getFeedStart: '[feed] getFeedStart',
  getFeedSuccess: '[feed] getFeedSuccess',
  getFeedFailure: '[feed] getFeedFailure',
}

export const actionTypes = {
  getFeed: '[feed] getFeed',
}

export default {
  state: {
    data: null,
    isLoading: false,
    errors: null,
  },
  mutations: {
    [mutationTypes.getFeedStart](state) {
      state.isLoading = true
      state.data = null
    },
    [mutationTypes.getFeedSuccess](state, payload) {
      state.isLoading = false
      state.data = payload
    },
    [mutationTypes.getFeedFailure](state) {
      state.isLoading = false
    },
  },
  actions: {
    async [actionTypes.getFeed]({ commit }, { apiUrl }) {
      commit(mutationTypes.getFeedStart)
      try {
        const response = await feedApi.getFeed(apiUrl)
        commit(mutationTypes.getFeedSuccess, response.data)
        return response.data
      } catch (error) {
        console.log(mutationTypes.getFeedFailure, error)
        commit(mutationTypes.getFeedFailure)
      }
    },
  },
}
