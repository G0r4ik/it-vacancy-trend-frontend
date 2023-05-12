<template>
  <ul v-if="showUserAction" class="user-dropdown">
    <li class="user-dropdown__item">
      <button class="user-dropdown__button" @click="showSignInModalFunction">
        Войти
      </button>
    </li>
    <li class="user-dropdown__item">
      <button class="user-dropdown__button" @click="showSignUpModalFunction">
        Зарегестрироваться
      </button>
    </li>
    <li class="user-dropdown__item">
      <button class="user-dropdown__button">Создать новый список</button>
    </li>
    <li class="user-dropdown__item">
      <button class="user-dropdown__button">Выйти</button>
    </li>
  </ul>
  <modal-wrapper
    v-if="showSignUpModal"
    @show-sign-up-modal-function="showSignUpModalFunction">
    <AuthSignUp />
  </modal-wrapper>
  <!-- <AuthSignIn
    v-if="showSignInModal"
    @showSignUpModalFunction="showSignUpModalFunction"
    @closeSignInModal="closeSignInModal"
  /> -->
</template>

<script>
import AuthSignUp from './AuthSignUp.vue'
import ModalWrapper from '@/shared/components/ModalWrapper'

export default {
  components: { AuthSignUp, ModalWrapper },
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
  list-style-type: none;
  background: var(--color-background);
  border: var(--border-width-extra-small) solid var(--color-border);
  border-radius: var(--border-radius-extra-small);
}
.user-dropdown__item {
  margin-bottom: var(--unit);
}
.user-dropdown__item:last-child {
  margin-bottom: 0;
}
</style>
