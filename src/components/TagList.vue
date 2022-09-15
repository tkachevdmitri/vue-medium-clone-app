<template>
  <ul class="tag-list">
    <li class="tag-default tag-pill tag-outline" v-for="(tag, index) in tags" :key="index">
      <router-link :to="{ name: 'tag', params: { slug: tag } }">{{ tag }}</router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'AppTagList',
  props: {
    tags: {
      type: Array,
      required: true,
    },
  },
}
</script>
