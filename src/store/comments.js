import commentsApi from '../api/comments'

export const mutationTypes = {
  getCommentsStart: '[comments] getCommentsStart',
  getCommentsSuccess: '[comments] getCommentsSuccess',
  getCommentsFailure: '[comments] getCommentsFailure',
}

export const actionTypes = {
  getComments: '[comments] getComments',
}

export default {
  state: {
    data: null,
    isLoading: false,
  },
  mutations: {
    [mutationTypes.getCommentsStart](state) {
      state.isLoading = true
    },
    [mutationTypes.getCommentsSuccess](state, payload) {
      state.isLoading = false
      state.data = payload
    },
    [mutationTypes.getCommentsFailure](state) {
      state.isLoading = false
    },
  },
  actions: {
    async [actionTypes.getComments]({ commit }, { slug }) {
      commit(mutationTypes.getCommentsStart)
      try {
        const response = await commentsApi.getComments(slug)
        commit(mutationTypes.getCommentsSuccess, response.data.comments)
        return response.data.comments
      } catch (error) {
        console.log(mutationTypes.getCommentsFailure, error)
        commit(mutationTypes.getCommentsFailure)
      }
    },
  },
}
