import { mutationTypes as authMutationTypes } from '../store/auth'

export default {
  state: {
    isSubmitting: false,
    validationErrors: null,
  },
  mutations: {
    [authMutationTypes.updateCurrentUserStart](state) {
      state.isSubmitting = true
      state.validationErrors = null
    },
    [authMutationTypes.updateCurrentUserSuccess](state) {
      state.isSubmitting = false
    },
    [authMutationTypes.updateCurrentUserFailure](state, payload) {
      console.log('error settings', payload)
      state.isSubmitting = false
      state.validationErrors = payload
    },
  },
}
