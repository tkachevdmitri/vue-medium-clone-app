<template>
  <div>
    <app-comment-item
      v-for="comment in comments"
      :key="comment.id"
      :comment="comment"
      @deleteComment="deleteComment"
    />
  </div>
</template>

<script>
import AppCommentItem from '../components/CommentItem.vue'
import { actionTypes } from '../store/comment'

export default {
  name: 'AppCommentsList',
  props: {
    comments: {
      type: Array,
      required: false,
    },
  },
  methods: {
    deleteComment(id) {
      this.$store
        .dispatch(actionTypes.deleteComment, {
          slug: this.$route.params.slug,
          id,
        })
        .then(() => {
          this.$emit('refreshComments')
        })
        .catch(() => {})
    },
  },
  components: {
    AppCommentItem,
  },
}
</script>
