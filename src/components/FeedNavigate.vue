<template>
  <div class="feed-toggle">
    <ul class="nav nav-pills outline-active">
      <li class="nav-item" v-if="isLoggedIn">
        <router-link
          :to="{ name: 'yourFeed' }"
          class="nav-link"
          :class="{ active: this.routeName === 'yourFeed' }"
        >
          Ваши подписки
        </router-link>
      </li>

      <li class="nav-item">
        <router-link
          :to="{ name: 'home' }"
          class="nav-link"
          :class="{ active: this.routeName === 'home' }"
        >
          Все статьи
        </router-link>
      </li>

      <li class="nav-item" v-if="tagName">
        <router-link
          :to="{ name: 'tag', props: { slug: tagName } }"
          class="nav-link"
          :class="{ active: this.routeName === 'tag' }"
        >
          <i class="ion-pound"></i>
          {{ tagName }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getterTypes } from '../store/auth'

export default {
  name: 'AppFeedNavigate',
  props: {
    tagName: {
      type: String,
      required: false,
    },
  },
  computed: {
    ...mapGetters({
      isLoggedIn: getterTypes.isLoggedIn,
    }),
    routeName() {
      return this.$route.name
    },
  },
}
</script>
