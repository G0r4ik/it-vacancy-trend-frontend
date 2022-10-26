<template>
  <ul class="user-dropdown" v-if="showUserAction">
    <li class="user-dropdown__item">
      <button class="user-dropdown__button" @click="showSignInModalFunction">
        Войти
      </button>
    </li>
    <li class="user-dropdown__item">
      <button class="user-dropdown__button">Зарегестрироваться</button>
    </li>
    <li class="user-dropdown__item">
      <button class="user-dropdown__button">Создать новый список</button>
    </li>
    <li class="user-dropdown__item">
      <button class="user-dropdown__button">Выйти</button>
    </li>
  </ul>
  <!-- <AuthSignUp
    v-if="showSignInModal"
    @showSignUpModalFunction="showSignUpModalFunction"
  /> -->
  <AuthSignIn
    v-if="showSignInModal"
    @showSignUpModalFunction="showSignUpModalFunction"
    @closeSignInModal="closeSignInModal"
  />
</template>

<script>
import AuthSignUp from '@/components/auth/AuthSignUp.vue'
import AuthSignIn from '@/components/auth/AuthSignIn.vue'
export default {
  components: { AuthSignIn, AuthSignUp },
  props: { showUserAction: Boolean },

  data() {
    return {
      showMenu: false,
      showSignInModal: false,
      showSignUpModal: false,
    }
  },

  methods: {
    showSignInModalFunction() {
      this.showSignInModal = true
      this.showSignUpModal = false
    },
    showSignUpModalFunction() {
      this.showSignInModal = true
      this.showSignUpModal = false
    },
    closeSignInModal() {
      this.showSignInModal = false
    },
  },
}
</script>

<style scoped>
.user-dropdown {
  position: absolute;
  right: 20px;
  top: 50px;
  background: var(--color-background);
  display: flex;
  flex-direction: column;
  list-style-type: none;
  border: 1px solid var(--color-border);
  border-radius: 5px;
  padding: var(--padding-small);
}
.user-dropdown__item {
  margin-bottom: var(--margin-extra-small);
}
.user-dropdown__item:last-child {
  margin-bottom: 0;
}
</style>
