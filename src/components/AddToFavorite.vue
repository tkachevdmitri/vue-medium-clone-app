<template>
  <button
    class="btn btn-sm"
    :class="{
      'btn-primary': isFavoritedCustom,
      'btn-outline-primary': !isFavoritedCustom,
    }"
    :disabled="isDisabled"
    @click="handleFavorite"
  >
    <template v-if="templateType === 'short'">
      <i class="ion-heart"></i> &nbsp; {{ favoritesCountCustom }}
    </template>
    <template v-if="templateType === 'article'">
      <i class="ion-heart"></i> &nbsp;
      <span v-if="!isFavoritedCustom">Добавить в избранное</span
      ><span v-else>Убрать из избранного</span> ({{ favoritesCountCustom }})
    </template>
  </button>
</template>

<script>
import { actionTypes } from '../store/addToFavorite'
import { getterTypes as authGetterTypes } from '../store/auth'
import { mapGetters } from 'vuex'

export default {
  name: 'AppAddToFavorite',
  props: {
    articleSlug: {
      type: String,
      required: true,
    },
    isFavorited: {
      type: Boolean,
      required: true,
    },
    favoritesCount: {
      type: Number,
      required: true,
    },
    templateType: {
      type: String,
      required: false,
      default: 'short',
    },
  },
  data() {
    return {
      isDisabled: false,
      isFavoritedCustom: this.isFavorited,
      favoritesCountCustom: this.favoritesCount,
    }
  },
  computed: {
    ...mapGetters({
      isAnonimus: authGetterTypes.isAnonimus,
    }),
  },
  methods: {
    handleFavorite() {
      // если не авторизован то редирект на логин
      if (this.isAnonimus) {
        this.$router.push({ name: 'login' })
        return false
      }

      this.isDisabled = true
      this.$store
        .dispatch(actionTypes.addToFavorite, {
          slug: this.articleSlug,
          isFavorited: this.isFavoritedCustom,
        })
        .then((article) => {
          this.isDisabled = false
          this.isFavoritedCustom = !this.isFavoritedCustom
          this.favoritesCountCustom = article.favoritesCount
        })
        .catch(() => {
          this.isDisabled = false
        })
    },
  },
}
</script>
