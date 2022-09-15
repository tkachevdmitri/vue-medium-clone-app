<template>
  <div class="home-page">
    <app-banner />

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <app-feed-navigate />

          <app-feed :apiUrl="apiUrl" />
        </div>
        <div class="col-md-3">
          <app-popular-tags />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppFeed from '../components/Feed.vue'
import AppPopularTags from '../components/PopularTags.vue'
import AppBanner from '../components/Banner.vue'
import AppFeedNavigate from '../components/FeedNavigate'

export default {
  name: 'AppGlobalFeed',
  data() {
    return {
      apiUrl: '/articles/feed',
    }
  },
  components: {
    AppFeed,
    AppPopularTags,
    AppBanner,
    AppFeedNavigate,
  },
}
</script>
