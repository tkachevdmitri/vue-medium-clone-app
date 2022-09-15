<template>
  <ul class="pagination" v-if="pages.length > 1">
    <li
      v-for="page in pages"
      :key="page"
      class="page-item"
      :class="{ active: currentPage === page }"
    >
      <router-link
        :to="{ path: baseUrl, query: { page: page } }"
        class="page-link"
        >{{ page }}</router-link
      >
    </li>
  </ul>
</template>

<script>
import { range } from '../helpers/utils'

export default {
  name: 'AppPagination',
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    limit: {
      type: Number,
      required: true,
    },
    baseUrl: {
      type: String,
      required: true,
    },
  },
  computed: {
    pages() {
      const pagesCount = Math.ceil(this.total / this.limit)
      return range(1, pagesCount)
    },
  },
}
</script>
