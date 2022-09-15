import favoriteApi from '../api/favorite'

export const mutationTypes = {
  addToFavoriteStart: '[addToFavorite] addToFavoriteStart',
  addToFavoriteSuccess: '[addToFavorite] addToFavoriteSuccess',
  addToFavoriteFailure: '[addToFavorite] addToFavoriteFailure',
}

export const actionTypes = {
  addToFavorite: '[addToFavorite] addToFavorite',
}

export default {
  mutations: {
    [mutationTypes.addToFavoriteStart]() {},
    [mutationTypes.addToFavoriteSuccess]() {},
    [mutationTypes.addToFavoriteFailure]() {},
  },
  actions: {
    async [actionTypes.addToFavorite]({ commit }, { slug, isFavorited }) {
      commit(mutationTypes.addToFavoriteStart)
      try {
        const promise = isFavorited
          ? favoriteApi.deleteFromFavorite(slug)
          : favoriteApi.addToFavorite(slug)
        const response = await promise
        commit(mutationTypes.addToFavoriteSuccess, response.data.article)
        return response.data.article
      } catch (error) {
        console.log(mutationTypes.addToFavoriteFailure, error.message)
        commit(mutationTypes.addToFavoriteFailure)
        throw error.message
      }
    },
  },
}
