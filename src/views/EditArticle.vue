<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <app-loading v-if="isLoading" />

          <div v-if="article">
            <h1 class="text-xs-center">
              Редактирование статьи "{{ article.title }}"
            </h1>
            <br />

            <app-article-form
              :initialValues="initialValues"
              :isSubmitting="isSubmitting"
              :errors="validationErrors"
              @articleSubmit="onSubmit"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppArticleForm from '../components/ArticleForm.vue'
import AppLoading from '../components/Loading.vue'
import { mapState } from 'vuex'
import { actionTypes } from '../store/editArticle'

export default {
  name: 'AppEditArticle',
  computed: {
    ...mapState({
      isLoading: (state) => state.editArticle.isLoading,
      article: (state) => state.editArticle.article,
      isSubmitting: (state) => state.editArticle.isSubmitting,
      validationErrors: (state) => state.editArticle.validationErrors,
    }),
    initialValues() {
      if (!this.article) {
        return {
          title: '',
          description: '',
          body: '',
          tagList: [],
        }
      }
      return {
        title: this.article.title,
        description: this.article.description,
        body: this.article.body,
        tagList: this.article.tagList,
      }
    },
  },
  methods: {
    onSubmit(articleInput) {
      this.$store
        .dispatch(actionTypes.editArticle, {
          slug: this.$route.params.slug,
          articleInput,
        })
        .then((article) => {
          this.$router.push({ name: 'article', params: { slug: article.slug } })
        })
        .catch(() => {})
    },
  },
  mounted() {
    this.$store.dispatch(actionTypes.getArticle, {
      slug: this.$route.params.slug,
    })
  },
  components: {
    AppArticleForm,
    AppLoading,
  },
}
</script>
