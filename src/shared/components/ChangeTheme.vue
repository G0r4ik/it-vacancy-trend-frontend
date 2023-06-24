<template>
  <div class="change-theme">
    <input
      id="checkbox"
      type="checkbox"
      class="change-theme__checkbox"
      @change="toggleTheme" />
    <label
      for="checkbox"
      class="change-theme__label"
      tabindex="0"
      @keyup.enter="toggleTheme">
      <span class="switch-theme__icon">🌙</span>
      <span class="switch-theme__icon">☀️</span>
      <div
        :class="{ 'change-theme__toggle_checked': userTheme === 'dark-theme' }"
        class="change-theme__toggle"></div>
    </label>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userTheme: 'light-theme',
    }
  },
  mounted() {
    const initUserTheme = this.getTheme() || this.getMediaPreference()
    this.setTheme(initUserTheme)
  },
  methods: {
    toggleTheme() {
      const activeTheme = localStorage.getItem('user-theme')
      this.setTheme(
        activeTheme === 'light-theme' ? 'dark-theme' : 'light-theme'
      )
    },
    getTheme() {
      return localStorage.getItem('user-theme')
    },
    setTheme(theme) {
      localStorage.setItem('user-theme', theme)
      this.userTheme = theme
      document.documentElement.className = theme
    },
    getMediaPreference() {
      const hasDarkPreference = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches
      return hasDarkPreference ? 'dark-theme' : 'light-theme'
    },
  },
}
</script>

<style>
.change-theme__checkbox {
  display: none;
}
.change-theme__label {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: var(--width-change-theme);
  padding: var(--unit);
  cursor: pointer;
  background: var(--color-border);
  border-radius: var(--border-radius-middle);
  transition: background var(--transition-main) ease;
}
.switch-theme__icon {
  pointer-events: none;
  user-select: none;
}
.change-theme__toggle {
  position: absolute;
  width: var(--icon-size);
  height: var(--icon-size);
  background-color: var(--color-primary2);
  border-radius: 50%;
  transition: transform var(--transition-small) ease,
    background-color var(--transition-main) ease;
  transform: translateX(0);
}
.change-theme__toggle_checked {
  transform: translateX(calc(var(--width-change-theme) / 2));
}
</style>
