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
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - var(--height-header));
}

.sign-in__inner {
  height: 100%;
  width: 300px;
  padding: 20px;
  border: 2px solid var(--color-border);
  border-radius: 5px;
}

.sign-in__title {
  font-size: var(--text-large);
  margin-bottom: 20px;
}

.sign-in__label {
  display: block;
  margin-top: calc(var(--unit) * 3);
  margin-bottom: var(--unit);
  font-size: 14px;
}

.sign-in__input {
  width: 100%;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

.sign-in__send {
  width: 100%;
  margin: calc(var(--unit) * 3) 0;
  padding: 10px;
  font-size: 14px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.sign-in__send:hover {
  background-color: #0069d9;
}

.sign-in__FIXME {
  margin-top: 10px;
  font-size: 14px;
  color: #007bff;
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.sign-in__FIXME:hover {
  text-decoration: underline;
}
/* .sign-in__FIX {
  font-size: var(--text-small);
  cursor: pointer;
  border-bottom: 1px solid var(--color-primary);
} */
</style>
<!-- <style>
.sign-in {
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
.sign-in__title {
  margin-bottom: calc(var(--unit) * 2);
  font-size: var(--text-large);
}
.sign-in__label {
  display: block;
  font-size: var(--text-small);
  margin-bottom: var(--unit);
}
.sign-in__input {
  width: 100%;
  margin-bottom: calc(var(--unit) * 2);
}
.sign-in__send {
  display: block;
  padding: var(--unit) var(--unit);
  margin: var(--unit) auto;
  font-size: var(--text-small);
  /* font-weight: 700; */
  border: var(--border-width-small) solid var(--color-primary);
  /* background: var(--color-primary); */
  /* color: black; */
  border-radius: var(--radius);
}

</style> -->
