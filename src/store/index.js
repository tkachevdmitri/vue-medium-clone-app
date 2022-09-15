import Vue from 'vue'
import Vuex from 'vuex'
import auth from '../store/auth'
import feed from '../store/feed'
import tags from '../store/tags'
import article from '../store/article'
import createArticle from '../store/createArticle'
import editArticle from '../store/editArticle'
import settings from '../store/settings'
import addToFavorite from '../store/addToFavorite'
import userProfile from '../store/userProfile'
import follow from '../store/follow'
import comment from '../store/comment'
import comments from '../store/comments'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    feed,
    tags,
    article,
    createArticle,
    editArticle,
    settings,
    addToFavorite,
    userProfile,
    follow,
    comment,
    comments,
  },
})
