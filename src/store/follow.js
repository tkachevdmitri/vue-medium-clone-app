import followApi from '../api/follow'

export const mutationTypes = {
  followStart: '[follow] followStart',
  followSuccess: '[follow] followSuccess',
  followFailure: '[follow] followFailure',
}

export const actionTypes = {
  follow: '[follow] follow',
}

export default {
  mutations: {
    [mutationTypes.followStart]() {},
    [mutationTypes.followSuccess]() {},
    [mutationTypes.followFailure]() {},
  },
  actions: {
    async [actionTypes.follow]({ commit }, { username, isFollowing }) {
      commit(mutationTypes.followStart)
      try {
        const promise = isFollowing
          ? followApi.unfollow(username)
          : followApi.follow(username)
        const response = await promise
        commit(mutationTypes.followSuccess, response.data.profile)
        return response.data.profile
      } catch (error) {
        console.log(mutationTypes.followFailure, error.message)
        commit(mutationTypes.followFailure)
        throw error.message
      }
    },
  },
}
