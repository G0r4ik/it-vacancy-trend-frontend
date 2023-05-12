<template>
  <form class="sign-up">
    <h3 class="sign-up__title">Sign Up</h3>
    <label for="sign-up-email" class="sign-up__label sign-up__label_email">
      Email:
      <input
        id="sign-up-email"
        v-model="email"
        type="email"
        name="sign-up-email"
        class="input sign-up__input sign-up__input_email" />
    </label>
    <label
      for="sign-up-password"
      class="sign-up__label sing-in__label_password">
      Password:
      <input
        id="sign-up-password"
        v-model="password"
        type="password"
        name="sign-up-password"
        class="input sign-up__input sign-up__input_password" />
    </label>
    <label
      for="sign-up-re-password"
      class="sign-up__label sing-in__label_re-password">
      Repeat the password:
      <input
        id="sign-up-re-password"
        v-model="rePassword"
        type="password"
        name="sign-up-re-password"
        class="input sign-up__input sign-up__input_re-password" />
    </label>
    <small v-if="error" class="sign-up__error">{{ error }}</small>
    <button type="submit" class="sign-up__send" @click.prevent="singUp">
      SignUp
    </button>
    <button
      class="sign-up__button"
      @click.prevent="$emit('showSignInModalFunction')">
      есть аккаунт?
    </button>
  </form>
</template>

<script>
import api from './api'

export default {
  emits: ['showSignInModalFunction'],
  data() {
    return {
      email: '',
      password: '',
      rePassword: '',
      error: '',
      userData: null,
    }
  },
  methods: {
    async singUp() {
      this.error = ''
      if (this.password !== this.rePassword) {
        return (this.error = 'passwords are different')
      }

      const result = await api.registrationUser(this.email, this.password)
      if (result.error) {
        return (this.error = result.error)
      }
      this.userData = result
    },
  },
}
</script>

<style>
.sign-up {
  position: relative;
  width: var(--width-auth);
  padding: var(--unit);
  background: var(--color-background);
  border: var(--border-width-extra-small) solid var(--color-border);
}
.sign-up__title {
  margin-bottom: calc(var(--unit) * 2);
}
.sign-up__label {
  display: block;
  margin-bottom: var(--unit);
  font-size: var(--text-small);
}
.sign-up__input {
  margin-top: var(--unit);
}
.sign-up__label_email {
}
.sign-up__input_email {
}
.sing-in__label_password {
}
.sign-up__input_password {
}
.sign-up__send,
.sign-up__button {
  display: block;
  padding: var(--unit) var(--unit);
  margin: 0 auto;
  font-size: var(--text-small);
  border: var(--border-width-small) solid var(--color-border);
  border-radius: var(--radius);
}
.sign-up__error {
  color: red;
}
.sign-up__send {
  margin-top: var(--unit);
  margin-bottom: var(--unit);
}
</style>
