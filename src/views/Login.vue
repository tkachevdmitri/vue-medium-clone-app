<template>
  <div class="auth-page">
    <div class="container">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Вход</h1>
          <p class="text-xs-center">
            <router-link :to="{ name: 'register' }"
              >Еще не зарегистрированы?</router-link
            >
          </p>

          <app-validation-errors
            v-if="validationErrors"
            :validationErrors="validationErrors"
          />

          <form @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Email"
                v-model="form.email"
              />
            </fieldset>

            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Пароль"
                v-model="form.password"
              />
            </fieldset>

            <button
              class="btn btn-lg btn-primary pull-xs-right"
              type="submit"
              :disabled="isSubmitting"
            >
              Войти
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppValidationErrors from '../components/ValidationErrors.vue'
import { actionTypes } from '../store/auth'
import { mapState } from 'vuex'

export default {
  name: 'AppLogin',
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
    }
  },
  computed: {
    ...mapState({
      isSubmitting: (state) => state.auth.isSubmitting,
      validationErrors: (state) => state.auth.validationErrors,
    }),
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch(actionTypes.login, this.form)
        .then(() => {
          this.$router.push({ name: 'home' })
        })
        .catch(() => {})
    },
  },
  components: {
    AppValidationErrors,
  },
}
</script>
