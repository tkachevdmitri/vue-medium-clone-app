<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12" v-if="currentUser">
          <h1 class="text-xs-center">Настройки</h1>
          <br />

          <app-settings-form
            :initialValues="initialValues"
            :isSubmitting="isSubmitting"
            :validationErrors="validationErrors"
            @settingsSubmit="onSubmit"
          />

          <hr />
          <button class="btn btn-outline-danger" @click="logout">Выйти</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppSettingsForm from '../components/SettingsForm.vue'
import { mapState, mapGetters } from 'vuex'
import {
  getterTypes as authGetterTypes,
  actionTypes as authActionTypes,
} from '../store/auth'

export default {
  name: 'AppSettings',
  computed: {
    ...mapState({
      isSubmitting: (state) => state.settings.isSubmitting,
      validationErrors: (state) => state.settings.validationErrors,
    }),
    ...mapGetters({
      currentUser: authGetterTypes.currentUser,
    }),
    initialValues() {
      return {
        image: this.currentUser.image,
        username: this.currentUser.username,
        bio: this.currentUser.bio,
        email: this.currentUser.email,
        password: '',
      }
    },
  },
  methods: {
    onSubmit(settingsInput) {
      this.$store.dispatch(authActionTypes.updateCurrentUser, {
        currentUserInput: settingsInput,
      })
    },
    logout() {
      this.$store.dispatch(authActionTypes.logout).then(() => {
        this.$router.push({ name: 'home' })
      })
    },
  },
  components: {
    AppSettingsForm,
  },
}
</script>
