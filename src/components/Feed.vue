<template>
  <div>
    <app-loading v-if="isLoading" />

    <app-error-message v-if="errors" />

    <div v-if="feed">
      <div v-if="feed.articlesCount === 0">Нет постов</div>
      <div
        class="article-preview"
        v-for="(article, index) in feed.articles"
        :key="index"
      >
        <div class="article-meta">
          <router-link
            class="preview-link"
            :to="{
              name: 'userProfile',
              params: { slug: article.author.username },
            }"
          >
            <img :src="article.author.image" />
          </router-link>
          <div class="info">
            <router-link
              class="preview-link"
              :to="{
                name: 'userProfile',
                params: { slug: article.author.username },
              }"
            >
              {{ article.author.username }}
            </router-link>
            <span class="date">{{ article.createdAt }}</span>
          </div>
          <app-add-to-favorite
            :articleSlug="article.slug"
            :isFavorited="article.favorited"
            :favoritesCount="article.favoritesCount"
            class="pull-xs-right"
          />
        </div>
        <router-link
          class="preview-link"
          :to="{ name: 'article', params: { slug: article.slug } }"
        >
          <h2>{{ article.title }}</h2>
          <p>{{ article.description }}</p>
          <span>Читать далее</span>
          <app-tag-list :tags="article.tagList" />
        </router-link>
      </div>
      <app-pagination
        :currentPage="currentPage"
        :total="feed.articlesCount"
        :limit="limit"
        :baseUrl="baseUrl"
      />
    </div>
  </div>
</template>

<script>
import { actionTypes } from '../store/feed'
import { mapState } from 'vuex'
import AppPagination from '../components/Pagination.vue'
import { parseUrl, stringify } from 'query-string'
import AppLoading from '../components/Loading.vue'
import AppErrorMessage from '../components/ErrorMessage.vue'
import AppTagList from '../components/TagList.vue'
import AppAddToFavorite from './AddToFavorite.vue'

export default {
  name: 'AppFeed',
  props: {
    apiUrl: {
      required: true,
    },
  },
  data() {
    return {
      limit: 10,
    }
  },
  computed: {
    ...mapState({
      feed: (state) => state.feed.data,
      isLoading: (state) => state.feed.isLoading,
      errors: (state) => state.feed.errors,
    }),

    currentPage() {
      return Number(this.$route.query.page || '1')
    },
    baseUrl() {
      return this.$route.path
    },
    offset() {
      return this.currentPage * this.limit - this.limit
    },
  },
  watch: {
    // повторяем запрос при изменении активной страницы пагинации
    currentPage() {
      this.fetchFeed()
    },
    apiUrl() {
      this.fetchFeed()
    },
  },
  methods: {
    fetchFeed() {
      const parsedUrl = parseUrl(this.apiUrl)
      const stringifiedParams = stringify({
        limit: this.limit,
        offset: this.offset,
        ...parsedUrl.query,
      })
      const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`
      this.$store.dispatch(actionTypes.getFeed, { apiUrl: apiUrlWithParams })
    },
  },
  mounted() {
    this.fetchFeed()
  },
  components: {
    AppPagination,
    AppLoading,
    AppErrorMessage,
    AppTagList,
    AppAddToFavorite,
  },
}
</script>
