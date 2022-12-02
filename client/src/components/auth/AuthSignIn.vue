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
          class="input sign-in__input sign-in__input_login"
        />
      </label>
      <label
        for="sign-in-password"
        class="sign-in__label sing-in__label_password"
      >
        Password:
        <input
          id="sign-in-password"
          v-model="password"
          type="text"
          name="sign-in-password"
          class="input sign-in__input sign-in__input_password"
        />
      </label>
      <button type="submit" class="sign-in__send" @click.prevent="singIn">
        SignUp
      </button>
      <button
        class="sign-in__button"
        @click.prevent="$emit('showSignInModalFunction')"
      >
        Нет аккаунта? Создайте его
      </button>
    </form>
  </div>
</template>

<script>
import api from '@/api'

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
      // this.$emit('')
    },
  },
}
</script>
<style>
.sign-in {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.sign-in__inner {
  position: relative;
  width: 400px;
  border: 1px solid var(--color-border);
  background: var(--color-background);
  padding: var(--padding-small);
}
.sign-in__cross {
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 30px;
}
.sign-in__cross::before,
.sign-in__cross::after {
  content: '';
  position: absolute;
  width: 24px;
  height: 4px;
  background: gray;
}
.sign-in__cross::before {
  transform: rotate(45deg);
}
.sign-in__cross::after {
  transform: rotate(-45deg);
}
.sign-in__title {
  margin-bottom: var(--margin-middle);
}
.sign-in__label {
  display: block;
  margin-bottom: var(--margin-small);
}
.sign-in__input {
  margin-top: var(--margin-extra-small);
}
.sign-in__label {
  font-size: var(--text-small);
}
.sign-in__label_login {
}
.sign-in__input {
}
.sign-in__input_login {
}
.sing-in__label_password {
}
.sign-in__input_password {
}
.sign-in__send,
.sign-in__button {
  margin: 0 auto;
  display: block;
  border: 2px solid var(--color-border);
  border-radius: 5px;
  padding: var(--padding-extra-small) var(--padding-small);
  font-size: var(--text-small);
}
.sign-in__send {
  margin-bottom: var(--padding-small);
  margin-top: var(--margin-small);
}
</style>
