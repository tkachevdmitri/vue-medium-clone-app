<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link :to="{ name: 'home' }" class="navbar-brand"
        >MediumClone</router-link
      >

      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <router-link
            class="nav-link"
            :to="{ name: 'home' }"
            active-class="active"
            exact
            >Главная</router-link
          >
        </li>

        <template v-if="isLoggedIn">
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{ name: 'createArticle' }"
              active-class="active"
            >
              <i class="ion-compose"></i>&nbsp;Новая статья
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{ name: 'settings' }"
              active-class="active"
            >
              <i class="ion-gear-a"></i>&nbsp;Настройки
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{
                name: 'userProfile',
                params: { slug: currentUser.username },
              }"
              active-class="active"
            >
              <!-- <img class="user-pic" :src="currentUser.image" /> -->
              &nbsp; {{ currentUser.username }}
            </router-link>
          </li>
        </template>

        <template v-if="isAnonimus">
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{ name: 'login' }"
              active-class="active"
              >Вход</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{ name: 'register' }"
              active-class="active"
              >Регистрация</router-link
            >
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
import { getterTypes } from '../store/auth'

export default {
  name: 'AppTopbar',
  computed: {
    ...mapGetters({
      currentUser: getterTypes.currentUser,
      isLoggedIn: getterTypes.isLoggedIn,
      isAnonimus: getterTypes.isAnonimus,
    }),
  },
}
</script>
