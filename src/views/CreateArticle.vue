<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <h1 class="text-xs-center">Создать новую статью</h1>
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
</template>

<script>
import AppArticleForm from '../components/ArticleForm.vue'
import { mapState } from 'vuex'
import { actionTypes } from '../store/createArticle'

export default {
  name: 'AppCreateArticle',
  data() {
    return {
      initialValues: {
        title: '',
        description: '',
        body: '',
        tagList: [],
      },
    }
  },
  computed: {
    ...mapState({
      isSubmitting: (state) => state.createArticle.isSubmitting,
      validationErrors: (state) => state.createArticle.validationErrors,
    }),
  },
  methods: {
    onSubmit(articleInput) {
      this.$store
        .dispatch(actionTypes.createArticle, articleInput)
        .then((article) => {
          this.$router.push({ name: 'article', params: { slug: article.slug } })
        })
        .catch(() => {})
    },
  },
  components: {
    AppArticleForm,
  },
}
</script>
