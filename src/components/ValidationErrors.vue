<template>
  <ul class="error-messages">
    <li v-for="error in errors" :key="error">
      {{ error }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'AppValidationErrors',
  props: {
    validationErrors: {
      type: Object,
      required: true,
    },
  },
  computed: {
    errors() {
      return Object.keys(this.validationErrors).map((key) => {
        const errorMessage = this.validationErrors[key].join(', ')
        return `${key}: ${errorMessage}`
      })
    },
  },
}
</script>
