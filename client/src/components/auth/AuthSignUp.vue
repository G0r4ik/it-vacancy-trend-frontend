<template>
  <form class="log-in">
    <h3>Войти</h3>
    <label for="log-in_login" class="log-in__login-label">
      Email or login
      <input
        type="text"
        name="log-in_login"
        id="log-in__login"
        class="log-in__login-input"
      />
    </label>
    <label for="log-in_login" class="log-in__login-label">
      Email or login
      <input
        type="text"
        name="log-in_login"
        id="log-in__login"
        class="log-in__login-input"
      />
    </label>
    <button type="submit">SignUp</button>
  </form>
  <button @click="$emit('showSignOnModalFunction')">
    Нет аккаунта? Создайте его
  </button>
</template>
