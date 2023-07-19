<template>
  <div class="sign-in">
    <form class="sign-in__inner">
      <h3 class="sign-in__title">Войти</h3>
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
      <button type="submit" class="sign-in__send" @click.prevent="singIn">
        Log in
      </button>
      <a
        class="sign-in__FIXME"
        tabindex="0"
        @click.prevent="$emit('changeComponent', 'logup')">
        Нет аккаунта? Создайте его
      </a>
    </form>
  </div>
</template>

<script>
import api from './api.js'
import { useStore } from './store.js'

export default {
  emits: ['changeComponent', 'closeSignInModal'],
  data() {
    return {
      email: '',
      password: '',
      error: '',
    }
  },
  methods: {
    async singIn() {
      this.error = ''
      try {
        const data = await api.loginUser(this.email, this.password)
        useStore().setUser(data)
        this.$router.push('/')
      } catch (error) {
        this.error = error.message
      }
    },
  },
}
</script>
<style>
.sign-in__error {
  display: inline-block;
  margin-top: calc(var(--unit) * 3);
  color: var(--color-danger);
}
.sign-in {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - var(--height-header));
}
.sign-in__inner {
  width: var(--width-auth);
  height: 100%;
  padding: calc(var(--unit) * 4);
  border: 2px solid var(--color-border);
  border-radius: var(--radius);
}
.sign-in__title {
  margin-bottom: calc(var(--unit) * 4);
  font-size: var(--text-large);
}
.sign-in__label {
  display: block;
  margin-top: calc(var(--unit) * 3);
  margin-bottom: var(--unit);
  font-size: var(--text-extra-small);
}
.sign-in__input {
  width: 100%;
  padding: var(--unit);
  font-size: var(--text-extra-small);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
}
.sign-in__send {
  width: 100%;
  padding: calc(var(--unit) * 2);
  margin: calc(var(--unit) * 3) 0;
  font-size: var(--text-extra-small);
  color: #fff;
  cursor: pointer;
  background-color: #007bff;
  border: none;
  border-radius: 3px;
}
.sign-in__send:hover {
  background-color: #0069d9;
}
.sign-in__FIXME {
  margin-top: 10px;
  font-size: 14px;
  color: #007bff;
  cursor: pointer;
  background-color: transparent;
  border: none;
}
.sign-in__FIXME:hover {
  text-decoration: underline;
}
</style>
