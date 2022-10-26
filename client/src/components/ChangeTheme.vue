<template>
  <div class="change-theme">
    <input
      @change="toggleTheme"
      id="checkbox"
      type="checkbox"
      class="switch-checkbox"
    />
    <label for="checkbox" class="switch-label">
      <span>🌙</span>
      <span>☀️</span>
      <div
        class="switch-toggle"
        :class="{ 'switch-toggle-checked': userTheme === 'dark-theme' }"
      ></div>
    </label>
  </div>
</template>
<script>
export default {
  mounted() {
    const initUserTheme = this.getTheme() || this.getMediaPreference()
    this.setTheme(initUserTheme)
  },

  data() {
    return {
      userTheme: 'light-theme',
    }
  },

  methods: {
    toggleTheme() {
      const activeTheme = localStorage.getItem('user-theme')
      if (activeTheme === 'light-theme') {
        this.setTheme('dark-theme')
      } else {
        this.setTheme('light-theme')
      }
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
      if (hasDarkPreference) {
        return 'dark-theme'
      } else {
        return 'light-theme'
      }
    },
  },
}
</script>

<style scoped>
.change-theme {
  margin-right: var(--margin-small);
}
.switch-checkbox {
  display: none;
}
.switch-label {
  align-items: center;
  background: var(--color-border);
  border: 1px solid var(--color-primary3);
  border-radius: 15px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  height: 30px;
  position: relative;
  transition: background 0.5s ease;
  width: 70px;
  padding: 5px;
}
.switch-toggle {
  position: absolute;
  background-color: var(--color-primary3);
  border-radius: 50%;
  top: 1px;
  left: 5px;
  height: 25px;
  width: 25px;
  transform: translateX(0);
  transition: transform 0.3s ease, background-color 0.5s ease;
}
.switch-toggle-checked {
  transform: translateX(33px) !important;
}
</style>
