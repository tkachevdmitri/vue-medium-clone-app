import articleApi from '../api/article'

export const mutationTypes = {
  createArticleStart: '[create article] createArticleStart',
  createArticleSuccess: '[create article] createArticleSuccess',
  createArticleFailure: '[create article] createArticleFailure',
}

export const actionTypes = {
  createArticle: '[create article] createArticle',
}

export default {
  state: {
    isSubmitting: false,
    validationErrors: null,
  },
  mutations: {
    [mutationTypes.createArticleStart](state) {
      state.isSubmitting = true
      state.validationErrors = null
    },
    [mutationTypes.createArticleSuccess](state) {
      state.isSubmitting = false
    },
    [mutationTypes.createArticleFailure](state, payload) {
      state.isSubmitting = false
      state.validationErrors = payload
    },
  },
  actions: {
    async [actionTypes.createArticle]({ commit }, payload) {
      commit(mutationTypes.createArticleStart)
      try {
        const response = await articleApi.createArticle(payload)
        commit(mutationTypes.createArticleSuccess)
        return response.data.article
      } catch (error) {
        commit(mutationTypes.createArticleFailure, error.response.data.errors)
        throw error.response.data.errors
      }
    },
  },
}
