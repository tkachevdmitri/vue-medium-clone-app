<template>
  <div id="app">
    <app-topbar />
    <router-view></router-view>
  </div>
</template>

<script>
import AppTopbar from './components/Topbar.vue'
import { actionTypes } from './store/auth'

export default {
  name: 'App',
  components: {
    AppTopbar,
  },
  mounted() {
    this.$store.dispatch(actionTypes.getCurrentUser)
  },
}
</script>
