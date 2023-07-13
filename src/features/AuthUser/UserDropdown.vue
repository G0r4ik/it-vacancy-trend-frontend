<template>
  <div class="user-dropdown">
    <ul v-if="showUserAction" class="user-dropdown__list">
      <li v-if="!user" class="user-dropdown__item">
        <router-link to="/auth" class="user-dropdown__button">
          Войти или зарегестрироваться
        </router-link>
      </li>
      <li v-if="user" class="user-dropdown__item">
        <button class="user-dropdown__button">Создать новый список</button>
      </li>
      <li v-if="user" class="user-dropdown__item" @click="logout">
        <button class="user-dropdown__button">Выйти</button>
      </li>
    </ul>
  </div>

  <!-- <AuthSignIn
    v-if="showSignInModal"
    @showSignUpModalFunction="showSignUpModalFunction"
    @closeSignInModal="closeSignInModal"
  /> -->
</template>

<script>
import { useStore } from '@/features/AuthUser'

export default {
  props: { showUserAction: Boolean },

  data() {
    return {
      showMenu: false,
      showSignInModal: false,
      showSignUpModal: false,
    }
  },

  computed: {
    user() {
      return useStore().user
    },
  },

  methods: {
    logout() {
      useStore().logout()
    },
    showSignInModalFunction() {
      this.showSignInModal = true
      this.showSignUpModal = false
    },
    showSignUpModalFunction() {
      this.showSignInModal = false
      this.showSignUpModal = true
    },
    closeSignInModal() {
      this.showSignInModal = false
    },
  },
}
</script>

<style>
.user-dropdown {
  position: absolute;
  top: calc(var(--unit) * 10);
  right: calc(var(--unit) * 4);
  display: flex;
  flex-direction: column;
  padding: var(--unit);
  background: var(--color-background);
  border: var(--border-width-extra-small) solid var(--color-border);
  border-radius: var(--border-radius-extra-small);
}
.user-dropdown__list {
  list-style-type: none;
}
.user-dropdown__item {
  margin-bottom: var(--unit);
}
.user-dropdown__item:last-child {
  margin-bottom: 0;
}
</style>
