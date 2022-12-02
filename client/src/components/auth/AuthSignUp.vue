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
        class="input sign-up__input sign-up__input_email"
      />
    </label>
    <label
      for="sign-up-password"
      class="sign-up__label sing-in__label_password"
    >
      Password:
      <input
        id="sign-up-password"
        v-model="password"
        type="password"
        name="sign-up-password"
        class="input sign-up__input sign-up__input_password"
      />
    </label>
    <label
      for="sign-up-re-password"
      class="sign-up__label sing-in__label_re-password"
    >
      Repeat the password:
      <input
        id="sign-up-re-password"
        v-model="rePassword"
        type="password"
        name="sign-up-re-password"
        class="input sign-up__input sign-up__input_re-password"
      />
    </label>
    <small v-if="error" class="sign-up__error">{{ error }}</small>
    <button type="submit" class="sign-up__send" @click.prevent="singUp">
      SignUp
    </button>
    <button
      class="sign-up__button"
      @click.prevent="$emit('showSignInModalFunction')"
    >
      есть аккаунт?
    </button>
  </form>
</template>

<script>
import api from '../../api'

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
  width: 400px;
  border: 1px solid var(--color-border);
  background: var(--color-background);
  padding: var(--padding-small);
}
.sign-up__title {
  margin-bottom: var(--margin-middle);
}
.sign-up__label {
  display: block;
  margin-bottom: var(--margin-small);
}
.sign-up__input {
  margin-top: var(--margin-extra-small);
}
.sign-up__label {
  font-size: var(--text-small);
}
.sign-up__label_email {
}
.sign-up__input {
}
.sign-up__input_email {
}
.sing-in__label_password {
}
.sign-up__input_password {
}
.sign-up__send,
.sign-up__button {
  margin: 0 auto;
  display: block;
  border: 2px solid var(--color-border);
  border-radius: 5px;
  padding: var(--padding-extra-small) var(--padding-small);
  font-size: var(--text-small);
}
.sign-up__error {
  color: red;
}
.sign-up__send {
  margin-bottom: var(--padding-small);
  margin-top: var(--margin-small);
}
</style>
