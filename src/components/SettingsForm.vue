<template>
  <div>
    <app-validation-errors
      v-if="validationErrors"
      :validationErrors="validationErrors"
    />

    <form @submit.prevent="onSubmit">
      <fieldset>
        <!-- <fieldset class="form-group">
          <input
            class="form-control form-control-lg"
            type="text"
            placeholder="URL of profile picture"
            v-model="form.image"
          />
        </fieldset> -->
        <fieldset class="form-group">
          <input
            class="form-control form-control-lg"
            type="text"
            placeholder="Имя пользователя"
            v-model="form.username"
          />
        </fieldset>
        <fieldset class="form-group">
          <textarea
            class="form-control form-control-lg"
            placeholder="Короткая информация"
            v-model="form.bio"
          ></textarea>
        </fieldset>
        <fieldset class="form-group">
          <input
            class="form-control form-control-lg"
            type="email"
            placeholder="Email"
            v-model="form.email"
          />
        </fieldset>
        <fieldset class="form-group">
          <input
            class="form-control form-control-lg"
            type="password"
            placeholder="Новый пароль"
            v-model="form.password"
          />
        </fieldset>

        <button
          class="btn btn-lg btn-primary pull-xs-right"
          type="submit"
          :disabled="isSubmitting"
        >
          Сохранить
        </button>
      </fieldset>
    </form>
  </div>
</template>

<script>
import AppValidationErrors from '../components/ValidationErrors.vue'

export default {
  name: 'AppSettingsForm',
  props: {
    initialValues: {
      type: Object,
      required: true,
    },
    isSubmitting: {
      type: Boolean,
      required: true,
    },
    validationErrors: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      form: {
        //image: this.initialValues.image,
        username: this.initialValues.username,
        bio: this.initialValues.bio,
        email: this.initialValues.email,
        password: '',
      },
    }
  },
  methods: {
    onSubmit() {
      this.$emit('settingsSubmit', this.form)
    },
  },
  components: {
    AppValidationErrors,
  },
}
</script>
