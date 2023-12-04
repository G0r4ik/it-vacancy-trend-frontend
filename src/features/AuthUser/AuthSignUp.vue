<template>
  <div class="sign-in">
    <form v-if="!isCheckEmail" class="sign-in__inner">
      <h3 class="sign-in__title">Зарегестрироваться</h3>
      <label for="sign-in-login" class="sign-in__label sign-in__label_login">
        Email:
      </label>
      <input
        id="sign-in-login"
        v-model="email"
        type="text"
        name="sign-in-login"
        class="input sign-in__input" />
      <label for="sign-in-password" class="sign-in__label"> Password: </label>
      <input
        id="sign-in-password`"
        v-model="password"
        type="text"
        name="sign-in-password"
        class="input sign-in__input" />
      <small class="sign-in__error">{{ error }}</small>
      <button type="submit" class="sign-in__send" @click.prevent="singUp">
        Sign up
      </button>
      <a
        class="sign-in__FIXME"
        tabindex="0"
        @click.prevent="$emit('changeComponent', 'login')">
        Есть аккаунт? Войдите в него.
      </a>
    </form>
    <div v-else>Войдите на почту и перейдите по ссылке</div>
  </div>
</template>

<script>
import api from './api.js'

export default {
  emits: ['changeComponent'],
  data() {
    return {
      email: '',
      password: '',
      error: '',
      isCheckEmail: false,
    }
  },
  methods: {
    async singUp() {
      this.error = ''
      try {
        await api.registrationUser(this.email, this.password)
        // this.$emit('changeComponent', 'login')
        // this.error = 'Войдите на почту и перейдите по ссылке'
        this.isCheckEmail = true
      } catch (error) {
        this.error = error.message
      }
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
