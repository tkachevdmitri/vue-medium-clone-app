<template>
  <div class="profile-page" v-if="userProfile">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img
              :src="userProfile.image"
              :alt="userProfile.username"
              class="user-img"
            />
            <h4>{{ userProfile.username }}</h4>
            <p>{{ userProfile.bio }}</p>

            <app-add-to-follow
              v-if="!isCurrentUserProfile"
              :username="userProfileSlug"
              :isFollowing="userProfile.following"
            />

            <router-link
              class="btn btn-sm btn-outline-secondary action-btn"
              :to="{ name: 'settings' }"
              v-if="isCurrentUserProfile"
            >
              <i class="ion-gear-a"></i>&nbsp;Редактировать профиль
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  :to="{
                    name: 'userProfile',
                    params: { slug: userProfile.username },
                  }"
                  :class="{ active: this.routeName === 'userProfile' }"
                >
                  Статьи
                </router-link>
              </li>
              <li class="nav-item" v-if="isCurrentUserProfile">
                <router-link
                  class="nav-link"
                  :to="{
                    name: 'userProfileFavorites',
                    params: { slug: userProfile.username },
                  }"
                  :class="{ active: this.routeName === 'userProfileFavorites' }"
                >
                  Избранное
                </router-link>
              </li>
            </ul>

            <app-feed :apiUrl="apiUrl" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { actionTypes as userProfileActionTypes } from '../store/userProfile'
import { getterTypes as authGetterTypes } from '../store/auth'
import { mapState, mapGetters } from 'vuex'
import AppFeed from '../components/Feed.vue'
import AppAddToFollow from '../components/AddToFollow.vue'

export default {
  name: 'AppUserProfile',
  computed: {
    ...mapState({
      isLoading: (state) => state.userProfile.isLoading,
      erors: (state) => state.userProfile.erors,
      userProfile: (state) => state.userProfile.data,
    }),
    ...mapGetters({
      currentUser: authGetterTypes.currentUser,
    }),
    userProfileSlug() {
      return this.$route.params.slug
    },
    isCurrentUserProfile() {
      if (!this.currentUser || !this.userProfile) return false
      return this.currentUser.username === this.userProfile.username
    },
    apiUrl() {
      return this.$route.name === 'userProfileFavorites'
        ? `/articles?favorited=${this.userProfile.username}`
        : `/articles?author=${this.userProfile.username}`
    },
    routeName() {
      return this.$route.name
    },
  },
  watch: {
    userProfileSlug() {
      this.getUserProfile()
    },
  },
  methods: {
    getUserProfile() {
      this.$store.dispatch(userProfileActionTypes.getUserProfile, {
        slug: this.userProfileSlug,
      })
    },
  },
  mounted() {
    this.getUserProfile()
  },
  components: {
    AppFeed,
    AppAddToFollow,
  },
}
</script>
