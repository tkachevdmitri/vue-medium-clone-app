<template>
  <div class="article-page">
    <div class="container">
      <app-loading v-if="isLoading" />

      <app-error-message v-if="errors" />
    </div>

    <div class="banner" v-if="article">
      <div class="container">
        <h1>{{ article.title }}</h1>
        <div class="article-meta">
          <router-link
            :to="{
              name: 'userProfile',
              params: { slug: article.author.username },
            }"
          >
            <img :src="article.author.image" :alt="article.author.username" />
          </router-link>
          <div class="info">
            <router-link
              :to="{
                name: 'userProfile',
                params: { slug: article.author.username },
              }"
              class="author"
            >
              {{ article.author.username }}
            </router-link>
            <span class="date">{{ article.createdAt }}</span>
          </div>

          <span v-if="!isAuthor">
            <app-add-to-follow
              :username="article.author.username"
              :isFollowing="article.author.following"
            />
            &nbsp;
            <app-add-to-favorite
              :articleSlug="article.slug"
              :isFavorited="article.favorited"
              :favoritesCount="article.favoritesCount"
              :templateType="'article'"
            />
          </span>

          <span v-if="isAuthor">
            <router-link
              class="btn btn-outline-secondary btn-sm"
              :to="{ name: 'editArticle', params: { slug: article.slug } }"
            >
              <i class="ion-edit"></i> Редактировать статью
            </router-link>
            &nbsp;
            <button
              class="btn btn-outline-danger btn-sm"
              @click="deleteArticle"
            >
              <i class="ion-trash-a"></i> Удалить статью
            </button>
          </span>
        </div>
      </div>
    </div>

    <div class="container page" v-if="article">
      <div class="row article-content">
        <div class="col-xs-12">
          <div>
            <p>{{ article.body }}</p>
          </div>

          <app-tag-list :tags="article.tagList" />
        </div>
      </div>

      <hr />
      <br />

      <!-- Comments -->
      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <app-comment-form
            v-if="!isAnonimus"
            :authorImg="currentUser.image"
            :slug="article.slug"
            @refreshComments="refreshComments"
          />
          <p v-else>
            <router-link :to="{ name: 'login' }">Войдите</router-link>
            or
            <router-link :to="{ name: 'register' }"
              >Зарегистрируйтесь</router-link
            >
            чтобы оставлять комментарии
          </p>

          <app-comments-list
            v-if="comments"
            :comments="comments"
            @refreshComments="refreshComments"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { actionTypes as articleActionTypes } from '../store/article'
import { actionTypes as commentsActionTypes } from '../store/comments'
import { getterTypes as authGetterTypes } from '../store/auth'
import { mapState, mapGetters } from 'vuex'
import AppTagList from '../components/TagList.vue'
import AppLoading from '../components/Loading.vue'
import AppErrorMessage from '../components/ErrorMessage'
import AppAddToFavorite from '../components/AddToFavorite.vue'
import AppAddToFollow from '../components/AddToFollow.vue'
import AppCommentForm from '../components/CommentForm.vue'
import AppCommentsList from '../components/CommentsList.vue'

export default {
  name: 'AppArticle',
  computed: {
    ...mapState({
      isLoading: (state) => state.article.isLoading,
      errors: (state) => state.article.errors,
      article: (state) => state.article.data,
      comments: (state) => state.comments.data,
    }),
    ...mapGetters({
      currentUser: authGetterTypes.currentUser,
      isAnonimus: authGetterTypes.isAnonimus,
    }),
    isAuthor() {
      if (!this.currentUser || !this.article) return false
      return this.currentUser.username === this.article.author.username
    },
  },
  methods: {
    deleteArticle() {
      this.$store
        .dispatch(articleActionTypes.deleteArticle, {
          slug: this.$route.params.slug,
        })
        .then(() => {
          this.$router.push({ name: 'home' })
        })
        .catch(() => {})
    },
    refreshComments() {
      this.getArticleComments()
    },
    getArticleComments() {
      this.$store.dispatch(commentsActionTypes.getComments, {
        slug: this.$route.params.slug,
      })
    },
  },
  mounted() {
    this.$store.dispatch(articleActionTypes.getArticle, {
      slug: this.$route.params.slug,
    })
    this.getArticleComments()
  },
  components: {
    AppTagList,
    AppLoading,
    AppErrorMessage,
    AppAddToFavorite,
    AppAddToFollow,
    AppCommentForm,
    AppCommentsList,
  },
}
</script>
