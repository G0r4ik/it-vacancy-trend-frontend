<template>
  <div class="change-theme">
    <input
      id="checkbox"
      type="checkbox"
      class="switch-checkbox"
      @change="toggleTheme"
    />
    <label for="checkbox" class="switch-label">
      <span class="switch-label__icon">🌙</span>
      <span class="switch-label__icon">☀️</span>
      <div
        class="switch-toggle"
        :class="{ 'switch-toggle-checked': userTheme === 'dark-theme' }"
      ></div>
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

      if (hasDarkPreference) return 'dark-theme'
      return 'light-theme'
    },
  },
}
</script>

<style>
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
  border-radius: var(--border-radius-middle);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  position: relative;
  transition: background 0.5s ease;
  width: 70px;
  padding: var(--padding-extra-small);
}
.switch-label__icon {
  pointer-events: none;
  user-select: none;
}
.switch-toggle {
  position: absolute;
  background-color: var(--color-primary3);
  border-radius: 50%;
  left: 5px;
  width: var(--icon-width-middle);
  height: var(--icon-height-middle);
  transform: translateX(0);
  transition: transform 0.3s ease, background-color 0.5s ease;
}
.switch-toggle-checked {
  transform: translateX(33px) !important;
}
</style>
