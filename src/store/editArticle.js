import articleApi from '../api/article'

export const mutationTypes = {
  editArticleStart: '[edit article] editArticleStart',
  editArticleSuccess: '[edit article] editArticleSuccess',
  editArticleFailure: '[edit article] editArticleFailure',

  getArticleStart: '[edit article] getArticleStart',
  getArticleSuccess: '[edit article] getArticleSuccess',
  getArticleFailure: '[edit article] getArticleFailure',
}

export const actionTypes = {
  editArticle: '[edit article] editArticle',
  getArticle: '[edit article] getArticle',
}

export default {
  state: {
    isSubmitting: false,
    validationErrors: null,
    isLoading: false,
    article: null,
  },
  mutations: {
    // get
    [mutationTypes.getArticleStart](state) {
      state.isLoading = true
      state.article = null
    },
    [mutationTypes.getArticleSuccess](state, payload) {
      state.isLoading = false
      state.article = payload
    },
    [mutationTypes.getArticleFailure](state) {
      state.isLoading = false
    },
    // update
    [mutationTypes.editArticleStart](state) {
      state.isSubmitting = true
      state.validationErrors = null
    },
    [mutationTypes.editArticleSuccess](state) {
      state.isSubmitting = false
    },
    [mutationTypes.editArticleFailure](state, payload) {
      state.isSubmitting = false
      state.validationErrors = payload
    },
  },
  actions: {
    async [actionTypes.getArticle]({ commit }, { slug }) {
      commit(mutationTypes.getArticleStart)
      try {
        const response = await articleApi.getArticle(slug)
        commit(mutationTypes.getArticleSuccess, response.data.article)
        return response.data.article
      } catch (error) {
        commit(mutationTypes.getArticleFailure)
        //throw error.response.data.errors
      }
    },
    async [actionTypes.editArticle]({ commit }, payload) {
      commit(mutationTypes.editArticleStart)
      try {
        const response = await articleApi.editArticle(payload)
        commit(mutationTypes.editArticleSuccess)
        return response.data.article
      } catch (error) {
        commit(mutationTypes.editArticleFailure, error.response.data.errors)
        throw error.response.data.errors
      }
    },
  },
}
