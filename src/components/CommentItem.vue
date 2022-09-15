<template>
  <div class="card">
    <div class="card-block">
      <p class="card-text">{{ comment.body }}</p>
    </div>
    <div class="card-footer">
      <router-link
        class="comment-author"
        :to="{
          name: 'userProfile',
          params: { slug: comment.author.username },
        }"
      >
        <img
          :src="comment.author.image"
          :alt="comment.author.username"
          class="comment-author-img"
        />
      </router-link>
      &nbsp;
      <router-link
        class="comment-author"
        :to="{
          name: 'userProfile',
          params: { slug: comment.author.username },
        }"
        >{{ comment.author.username }}</router-link
      >
      <span class="date-posted">{{ comment.createdAt }}</span>
      <span class="mod-options" v-if="isAuthorComment" @click="deleteComment">
        <i class="ion-trash-a"></i>
      </span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getterTypes as authGetterTypes } from '../store/auth'

export default {
  name: 'AppCommentItem',
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      currentUser: authGetterTypes.currentUser,
    }),
    isAuthorComment() {
      if (!this.currentUser) return false
      return this.currentUser.username === this.comment.author.username
    },
  },
  methods: {
    deleteComment() {
      this.$emit('deleteComment', this.comment.id)
    },
  },
}
</script>
