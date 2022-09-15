import articleApi from '../api/article'

export const mutationTypes = {
  getArticleStart: '[article] getArticleStart',
  getArticleSuccess: '[article] getArticleSuccess',
  getArticleFailure: '[article] getArticleFailure',

  deleteArticleStart: '[article] deleteArticleStart',
  deleteArticleSuccess: '[article] deleteArticleSuccess',
  deleteArticleFailure: '[article] deleteArticleFailure',
}

export const actionTypes = {
  getArticle: '[article] getArticle',
  deleteArticle: '[article] deleteArticle',
}

export default {
  state: {
    data: null,
    isLoading: false,
    errors: null,
  },
  mutations: {
    [mutationTypes.getArticleStart](state) {
      state.isLoading = true
      state.data = null
    },
    [mutationTypes.getArticleSuccess](state, payload) {
      state.isLoading = false
      state.data = payload
    },
    [mutationTypes.getArticleFailure](state) {
      state.isLoading = false
    },
    // delete
    [mutationTypes.deleteArticleStart]() {},
    [mutationTypes.deleteArticleSuccess](state) {
      state.data = null
    },
    [mutationTypes.deleteArticleFailure]() {},
  },
  actions: {
    async [actionTypes.getArticle]({ commit }, { slug }) {
      commit(mutationTypes.getArticleStart)
      try {
        const response = await articleApi.getArticle(slug)
        commit(mutationTypes.getArticleSuccess, response.data.article)
        return response.data.article
      } catch (error) {
        console.log(mutationTypes.getArticleFailure, error)
        commit(mutationTypes.getArticleFailure)
      }
    },

    async [actionTypes.deleteArticle]({ commit }, { slug }) {
      commit(mutationTypes.deleteArticleStart)
      try {
        await articleApi.deleteArticle(slug)
        commit(mutationTypes.deleteArticleSuccess)
      } catch (error) {
        console.log(mutationTypes.deleteArticleFailure, error.message)
        commit(mutationTypes.deleteArticleFailure)
      }
    },
  },
}
