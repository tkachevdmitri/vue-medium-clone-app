import commentsApi from '../api/comments'

export const mutationTypes = {
  // create
  createCommentStart: '[comment] createCommentStart',
  createCommentSuccess: '[comment] createCommentSuccess',
  createCommentFailure: '[comment] createCommentFailure',
  // delete
  deleteCommentStart: '[comment] deleteCommentStart',
  deleteCommentSuccess: '[comment] deleteCommentSuccess',
  deleteCommentFailure: '[comment] deleteCommentFailure',
}

export const actionTypes = {
  createComment: '[comment] createComment',
  deleteComment: '[comment] deleteComment',
}

export default {
  state: {
    isSubmitting: false,
    validationErrors: null,
  },
  mutations: {
    // create
    [mutationTypes.createCommentStart](state) {
      state.isSubmitting = true
      state.validationErrors = null
    },
    [mutationTypes.createCommentSuccess](state) {
      state.isSubmitting = false
    },
    [mutationTypes.createCommentFailure](state, payload) {
      state.isSubmitting = false
      state.validationErrors = payload
    },
    // delete
    [mutationTypes.deleteCommentStart]() {},
    [mutationTypes.deleteCommentSuccess](state) {
      state.data = null
    },
    [mutationTypes.deleteCommentFailure]() {},
  },
  actions: {
    // create
    async [actionTypes.createComment]({ commit }, { slug, commentInput }) {
      commit(mutationTypes.createCommentStart)
      try {
        const response = await commentsApi.createComment(slug, commentInput)
        commit(mutationTypes.createCommentSuccess)
        return response.data.comment
      } catch (error) {
        commit(mutationTypes.createCommentFailure, error.response.data.errors)
        throw error.response.data.errors
      }
    },
    // delete
    async [actionTypes.deleteComment]({ commit }, { slug, id }) {
      commit(mutationTypes.deleteCommentStart)
      try {
        await commentsApi.deleteComment(slug, id)
        commit(mutationTypes.deleteCommentSuccess)
      } catch (error) {
        console.log(mutationTypes.deleteCommentFailure, error.message)
        commit(mutationTypes.deleteCommentFailure)
        throw error.message
      }
    },
  },
}
