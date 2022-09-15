<template>
  <div class="sidebar">
    <p>Популярные теги</p>

    <app-loading v-if="isLoading" />

    <app-error-message v-if="errors" />

    <div class="tag-list" v-if="tags">
      <router-link
        v-for="(tag, index) in tags"
        :key="index"
        :to="{ name: 'tag', params: { slug: tag } }"
        class="tag-default tag-pill"
      >
        {{ tag }}
      </router-link>
    </div>
  </div>
</template>

<script>
import { actionTypes } from '../store/tags'
import { mapState } from 'vuex'
import AppLoading from '../components/Loading.vue'
import AppErrorMessage from '../components/ErrorMessage.vue'

export default {
  name: 'AppPopularTags',
  computed: {
    ...mapState({
      tags: (state) => state.tags.data,
      isLoading: (state) => state.tags.isLoading,
      errors: (state) => state.tags.errors,
    }),
  },
  mounted() {
    this.$store.dispatch(actionTypes.getTags)
  },
  components: {
    AppLoading,
    AppErrorMessage,
  },
}
</script>
