import authApi from '../api/auth'
import { setItem } from '../helpers/helpersLocalStorage'

export const mutationTypes = {
  // register
  registerStart: '[auth] registerStart',
  registerSuccess: '[auth] registerSuccess',
  registerFailure: '[auth] registerFailure',
  // login
  loginStart: '[auth] loginStart',
  loginSuccess: '[auth] loginSuccess',
  loginFailure: '[auth] loginFailure',
  // getUser
  getCurrentUserStart: '[auth] getCurrentUserStart',
  getCurrentUserSuccess: '[auth] getCurrentUserSuccess',
  getCurrentUserFailure: '[auth] getCurrentUserFailure',
  // update
  updateCurrentUserStart: '[auth] updateCurrentUserStart',
  updateCurrentUserSuccess: '[auth] updateCurrentUserSuccess',
  updateCurrentUserFailure: '[auth] updateCurrentUserFailure',
  // logout
  logout: '[auth] logout',
}

export const actionTypes = {
  register: '[auth] register',
  login: '[auth] login',
  getCurrentUser: '[auth] getCurrentUser',
  updateCurrentUser: '[auth] updateCurrentUser',
  logout: '[auth] logout',
}

export const getterTypes = {
  currentUser: '[auth] currentUser',
  isLoggedIn: '[auth] isLoggedIn',
  isAnonimus: '[auth] isAnonimus',
}

export default {
  state: {
    isSubmitting: false,
    currentUser: null,
    validationErrors: null,
    isLoggedIn: null,
    isLoading: false,
  },
  getters: {
    [getterTypes.currentUser](state) {
      return state.currentUser
    },
    [getterTypes.isLoggedIn](state) {
      return Boolean(state.isLoggedIn)
    },
    [getterTypes.isAnonimus](state) {
      return state.isLoggedIn === false
    },
  },
  mutations: {
    // register
    [mutationTypes.registerStart](state) {
      state.isSubmitting = true
      state.validationErrors = null
    },
    [mutationTypes.registerSuccess](state, payload) {
      state.isSubmitting = true
      state.currentUser = payload
      state.isLoggedIn = true
    },
    [mutationTypes.registerFailure](state, payload) {
      state.isSubmitting = false
      state.validationErrors = payload
    },
    // login
    [mutationTypes.loginStart](state) {
      state.isSubmitting = true
      state.validationErrors = null
    },
    [mutationTypes.loginSuccess](state, payload) {
      state.isSubmitting = true
      state.currentUser = payload
      state.isLoggedIn = true
    },
    [mutationTypes.loginFailure](state, payload) {
      state.isSubmitting = false
      state.validationErrors = payload
    },
    // get current user
    [mutationTypes.getCurrentUserStart](state) {
      state.isLoading = true
    },
    [mutationTypes.getCurrentUserSuccess](state, payload) {
      state.isLoading = false
      state.currentUser = payload
      state.isLoggedIn = true
    },
    [mutationTypes.getCurrentUserFailure](state) {
      state.isLoading = false
      state.currentUser = null
      state.isLoggedIn = false
    },
    // update current user
    [mutationTypes.updateCurrentUserStart]() {},
    [mutationTypes.updateCurrentUserSuccess](state, payload) {
      state.currentUser = payload
    },
    [mutationTypes.updateCurrentUserFailure]() {},
    // logout
    [mutationTypes.logout](state) {
      state.currentUser = null
      state.isLoggedIn = false
    },
  },
  actions: {
    async [actionTypes.register]({ commit }, payload) {
      commit(mutationTypes.registerStart)
      try {
        const response = await authApi.register(payload)
        commit(mutationTypes.registerSuccess, response.data.user)

        // set localStorage token
        setItem('jwtToken', response.data.user.token)

        return response.data.user
      } catch (error) {
        commit(mutationTypes.registerFailure, error.response.data.errors)
        throw error.response.data.errors
      }
    },

    async [actionTypes.login]({ commit }, payload) {
      commit(mutationTypes.loginStart)
      try {
        const response = await authApi.login(payload)
        commit(mutationTypes.loginSuccess, response.data.user)

        // set localStorage token
        setItem('jwtToken', response.data.user.token)

        return response.data.user
      } catch (error) {
        commit(mutationTypes.loginFailure, error.response.data.errors)
        throw error.response.data.errors
      }
    },

    async [actionTypes.getCurrentUser]({ commit }) {
      commit(mutationTypes.getCurrentUserStart)
      try {
        const response = await authApi.getCurrentUser()
        //console.log(response.data.user)
        commit(mutationTypes.getCurrentUserSuccess, response.data.user)
        return response.data.user
      } catch (error) {
        commit(mutationTypes.getCurrentUserFailure)
      }
    },

    async [actionTypes.updateCurrentUser]({ commit }, { currentUserInput }) {
      commit(mutationTypes.updateCurrentUserStart)
      console.log(currentUserInput)
      try {
        const response = await authApi.updateCurrentUser(currentUserInput)
        commit(mutationTypes.updateCurrentUserSuccess, response.data.user)
        //console.log(response.data.user)
        return response.data.user
      } catch (error) {
        commit(mutationTypes.updateCurrentUserFailure, {
          error: [error.response.data],
        })
      }
    },

    [actionTypes.logout]({ commit }) {
      return new Promise((resolve) => {
        setItem('jwtToken', '')
        commit(mutationTypes.logout)
        resolve()
      })
    },
  },
}
