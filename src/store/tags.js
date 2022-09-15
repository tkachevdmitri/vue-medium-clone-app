import tagsApi from '../api/tags'

export const mutationTypes = {
  getTagsStart: '[tags] getTagsStart',
  getTagsSuccess: '[tags] getTagsSuccess',
  getTagsFailure: '[tags] getTagsFailure',
}

export const actionTypes = {
  getTags: '[tags] getTags',
}

export default {
  state: {
    data: null,
    isLoading: false,
    errors: null,
  },
  mutations: {
    [mutationTypes.getTagsStart](state) {
      state.isLoading = true
      state.data = null
    },
    [mutationTypes.getTagsSuccess](state, payload) {
      state.isLoading = false
      state.data = payload
    },
    [mutationTypes.getTagsFailure](state) {
      state.isLoading = false
    },
  },
  actions: {
    async [actionTypes.getTags]({ commit }) {
      commit(mutationTypes.getTagsStart)
      try {
        const response = await tagsApi.getTags()
        commit(mutationTypes.getTagsSuccess, response.data.tags)
        return response.data
      } catch (error) {
        console.log(mutationTypes.getTagsFailure, error)
        commit(mutationTypes.getTagsFailure)
      }
    },
  },
}
