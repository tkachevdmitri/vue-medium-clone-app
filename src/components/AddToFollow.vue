<template>
  <button
    class="btn btn-sm action-btn"
    :class="{
      'btn-secondary': isFollowingCustom,
      'btn-outline-secondary': !isFollowingCustom,
    }"
    :disabled="isDisabled"
    @click="handleFollow"
  >
    <i class="ion-plus-round"></i>&nbsp;
    <template v-if="isFollowingCustom">Отписаться от</template>
    <template v-else>Подписаться на</template>
    {{ username }}
  </button>
</template>

<script>
import { actionTypes } from '../store/follow'
import { getterTypes as authGetterTypes } from '../store/auth'
import { mapGetters } from 'vuex'

export default {
  name: 'AppAddToFollow',
  props: {
    username: {
      type: String,
      required: true,
    },
    isFollowing: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      isDisabled: false,
      isFollowingCustom: this.isFollowing,
    }
  },
  computed: {
    ...mapGetters({
      isAnonimus: authGetterTypes.isAnonimus,
    }),
  },
  methods: {
    handleFollow() {
      if (this.isAnonimus) {
        this.$router.push({ name: 'login' })
        return false
      }

      this.isDisabled = true
      this.$store
        .dispatch(actionTypes.follow, {
          username: this.username,
          isFollowing: this.isFollowingCustom,
        })
        .then(() => {
          this.isDisabled = false
          this.isFollowingCustom = !this.isFollowingCustom
        })
        .catch(() => {
          this.isDisabled = false
        })
    },
  },
}
</script>
