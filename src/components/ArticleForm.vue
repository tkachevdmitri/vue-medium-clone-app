<template>
  <div>
    <app-validation-errors v-if="errors" :validationErrors="errors" />

    <form @submit.prevent="onSubmit">
      <fieldset class="form-group">
        <input
          class="form-control form-control-lg"
          type="text"
          placeholder="Заголовок"
          v-model="form.title"
        />
      </fieldset>

      <fieldset class="form-group">
        <input
          class="form-control form-control-lg"
          type="text"
          placeholder="Короткое описание"
          v-model="form.description"
        />
      </fieldset>

      <fieldset class="form-group">
        <textarea
          class="form-control form-control-lg"
          type="text"
          placeholder="Контент"
          v-model="form.body"
        ></textarea>
      </fieldset>

      <fieldset class="form-group">
        <input
          class="form-control form-control-lg"
          type="text"
          placeholder="Теги (укажите через запятую)"
          v-model="form.tagList"
        />
      </fieldset>

      <button
        class="btn btn-lg btn-primary pull-xs-right"
        type="submit"
        :disabled="isSubmitting"
      >
        Опубликовать
      </button>
    </form>
  </div>
</template>

<script>
import AppValidationErrors from '../components/ValidationErrors.vue'

export default {
  name: 'AppArticleForm',
  props: {
    initialValues: {
      type: Object,
      required: true,
    },
    errors: {
      type: Object,
      required: false,
    },
    isSubmitting: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      form: {
        title: this.initialValues.title,
        description: this.initialValues.description,
        body: this.initialValues.body,
        tagList: this.initialValues.tagList.join(','),
      },
    }
  },
  methods: {
    onSubmit() {
      this.$emit('articleSubmit', {
        ...this.form,
        tagList: this.form.tagList.split(','),
      })
    },
  },
  components: {
    AppValidationErrors,
  },
}
</script>
