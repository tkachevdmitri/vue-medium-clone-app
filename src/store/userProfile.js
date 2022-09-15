import userProfileApi from '../api/userProfile'

export const mutationTypes = {
  getUserProfileStart: '[userProfile] getUserProfileStart',
  getUserProfileSuccess: '[userProfile] getUserProfileSuccess',
  getUserProfileFailure: '[userProfile] getUserProfileFailure',
}

export const actionTypes = {
  getUserProfile: '[userProfile] getUserProfile',
}

export default {
  state: {
    isLoading: false,
    erors: null,
    data: null,
  },
  mutations: {
    [mutationTypes.getUserProfileStart](state) {
      state.isLoading = true
      state.data = null
    },
    [mutationTypes.getUserProfileSuccess](state, payload) {
      state.isLoading = false
      state.data = payload
    },
    [mutationTypes.getUserProfileFailure](state) {
      state.isLoading = false
    },
  },
  actions: {
    async [actionTypes.getUserProfile]({ commit }, { slug }) {
      commit(mutationTypes.getUserProfileStart)
      try {
        const response = await userProfileApi.getUserProfile(slug)
        commit(mutationTypes.getUserProfileSuccess, response.data.profile)
        return response.data.profile
      } catch (error) {
        console.log(mutationTypes.getUserProfileFailure, error.response.data)
        commit(mutationTypes.getUserProfileFailure)
      }
    },
  },
}
