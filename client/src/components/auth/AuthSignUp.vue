<template>
  <div class="sign-up">
    <form class="sign-up__inner">
      <div class="sign-up__cross" @click="$emit('closeSignInModal')"></div>
      <h3 class="sign-up__title">Sign Up</h3>
      <label for="sign-up-email" class="sign-up__label sign-up__label_email">
        Email:
        <input
          type="email"
          name="sign-up-email"
          id="sign-up-email"
          class="sign-up__input sign-up__input_email"
          v-model="email"
        />
      </label>
      <label
        for="sign-up-password"
        class="sign-up__label sing-in__label_password"
      >
        Password:
        <input
          type="password"
          name="sign-up-password"
          id="sign-up-password"
          class="sign-up__input sign-up__input_password"
          v-model="password"
        />
      </label>
      <label
        for="sign-up-re-password"
        class="sign-up__label sing-in__label_re-password"
      >
        Repeat the password:
        <input
          type="password"
          name="sign-up-re-password"
          id="sign-up-re-password"
          class="sign-up__input sign-up__input_re-password"
          v-model="rePassword"
        />
      </label>
      <small class="sign-up__error" v-if="error">{{ error }}</small>
      <button @click.prevent="singUp" type="submit" class="sign-up__send">
        SignUp
      </button>
      <button
        @click.prevent="$emit('showSignInModalFunction')"
        class="sign-up__button"
      >
        есть аккаунт?
      </button>
    </form>
  </div>
</template>

<script>
import api from '../../api'

export default {
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

<style scoped>
.sign-up {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.sign-up__inner {
  position: relative;
  width: 400px;
  border: 1px solid var(--color-border);
  background: var(--color-background);
  padding: var(--padding-small);
}
.sign-up__cross {
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 30px;
}
.sign-up__cross:before,
.sign-up__cross:after {
  content: '';
  position: absolute;
  width: 24px;
  height: 4px;
  background: gray;
}
.sign-up__cross:before {
  transform: rotate(45deg);
}
.sign-up__cross:after {
  transform: rotate(-45deg);
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
  width: 100%;
  border: 2px solid var(--color-border);
  background-color: transparent;
  line-height: 2;
  padding: 0 var(--padding-small);
  border-radius: 5px;
  color: var(--color-text);
  font-size: var(--text-small);
  transition: all 0.25s;
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
