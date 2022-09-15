<template>
  <div>
    <app-validation-errors v-if="errors" :validationErrors="errors" />

    <form class="card comment-form" @submit.prevent="onSubmit">
      <div class="card-block">
        <textarea
          class="form-control"
          placeholder="Напишите комментарий..."
          v-model="form.body"
        ></textarea>
      </div>
      <div class="card-footer">
        <!-- <img :src="authorImg" class="comment-author-img" /> -->
        <button class="btn btn-sm btn-primary" :disabled="isSubmitting">
          Опубликовать
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import AppValidationErrors from '../components/ValidationErrors.vue'
import { actionTypes } from '../store/comment'
import { mapState } from 'vuex'

export default {
  name: 'AppCommentForm',
  props: {
    authorImg: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      form: {
        body: '',
      },
    }
  },
  computed: {
    ...mapState({
      isSubmitting: (state) => state.comment.isSubmitting,
      errors: (state) => state.comment.validationErrors,
    }),
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch(actionTypes.createComment, {
          slug: this.slug,
          commentInput: this.form,
        })
        .then(() => {
          this.form.body = ''
          this.$emit('refreshComments')
        })
        .catch(() => {})
    },
  },
  components: {
    AppValidationErrors,
  },
}
</script>
