<template>
  <div class="sign-in">
    <form class="sign-in__inner">
      <div class="sign-in__cross" @click="$emit('closeSignInModal')"></div>
      <h3 class="sign-in__title">Войти</h3>
      <label for="sign-in-login" class="sign-in__label sign-in__label_login">
        Email or login:
        <input
          id="sign-in-login"
          v-model="loginOrEmail"
          type="text"
          name="sign-in-login"
          class="input sign-in__input sign-in__input_login" />
      </label>
      <label
        for="sign-in-password"
        class="sign-in__label sing-in__label_password">
        Password:
        <input
          id="sign-in-password`"
          v-model="password"
          type="text"
          name="sign-in-password"
          class="input sign-in__input sign-in__input_password" />
      </label>
      <button type="submit" class="sign-in__send" @click.prevent="singIn">
        SignUp
      </button>
      <button
        class="sign-in__button"
        @click.prevent="$emit('showSignInModalFunction')">
        Нет аккаунта? Создайте его
      </button>
    </form>
  </div>
</template>

<script>
import api from './api'

export default {
  emits: ['showSignInModalFunction', 'closeSignInModal'],
  data() {
    return {
      loginOrEmail: '',
      password: '',
    }
  },
  methods: {
    singIn() {
      api.loginUser(this.loginOrEmail, this.password)
    },
  },
}
</script>
<style>
.sign-in {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
}
.sign-in__inner {
  position: relative;
  width: var(--width-auth);
  padding: var(--unit);
  background: var(--color-background);
  border: var(--border-width-extra-small) solid var(--color-border);
}
.sign-in__cross {
  position: absolute;
  top: calc(var(--unit) * 4);
  right: calc(var(--unit) * 6);
  cursor: pointer;
}
.sign-in__cross::before,
.sign-in__cross::after {
  position: absolute;
  width: var(--icon-size);
  content: '';
  background: gray;
}
.sign-in__cross::before {
  transform: rotate(45deg);
}
.sign-in__cross::after {
  transform: rotate(-45deg);
}
.sign-in__title {
  margin-bottom: calc(var(--unit) * 2);
}
.sign-in__label {
  display: block;
  margin-bottom: var(--unit);
  font-size: var(--text-small);
}
.sign-in__input {
  margin-top: var(--unit);
}
.sign-in__send,
.sign-in__button {
  display: block;
  padding: var(--unit) var(--unit);
  margin: 0 auto;
  font-size: var(--text-small);
  border: var(--border-width-small) solid var(--color-border);
  border-radius: var(--radius);
}
.sign-in__send {
  margin-top: var(--unit);
  margin-bottom: var(--unit);
}
</style>
