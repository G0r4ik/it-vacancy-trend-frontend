<template>
  <header class="header">
    <div class="container">
      <div class="header__inner">
        <div class="header__logo header__logo_dekstop">
          <span class="header__logo-text">IT Vacancy Trend</span>
        </div>
        <div class="header__logo header__logo_mobile">
          <div class="header__logo-text">ITV</div>
        </div>
        <nav class="header__menu menu">
          <button
            class="menu__button"
            type="button"
            aria-expanded="false"
            aria-controls="menu__list"
            @click="showMenuFunction">
            <IconCross id="cross" class="menu__icon menu__icon-cross" />
            <IconMenu id="menu" class="menu__icon menu__icon-menu" />
          </button>
          <ul class="menu__list">
            <li
              class="menu__item"
              :class="{ menu__item_active: $route.path === '/rating' }"
              tabindex="0"
              @click="changePage('rating')"
              @keyup.enter="changePage('rating')">
              <router-link to="/rating">Rating</router-link>
            </li>
            <li
              class="menu__item"
              :class="{ menu__item_active: $route.path === '/compare' }"
              tabindex="0"
              @click="changePage('compare')"
              @keyup.enter="changePage('compare')">
              <router-link to="/compare">Compare</router-link>
            </li>
            <li
              class="menu__item"
              :class="{ menu__item_active: $route.path === '/other' }"
              tabindex="0"
              @click="changePage('other')"
              @keyup.enter="changePage('other')">
              <router-link to="/other">Other</router-link>
            </li>
          </ul>
        </nav>
        <div class="header__other">
          <ChangeTheme />
          <div class="header__user">
            <button
              class="header__user-button"
              @click="showUserAction = !showUserAction">
              <IconUser />
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
  <UserDropdown v-if="showUserAction" :show-user-action="showUserAction" />
</template>

<script>
import UserDropdown from '../../features/auth/UserDropdown.vue'

export default {
  components: { UserDropdown },

  emits: ['changePage'],

  data() {
    return {
      showUserAction: false,
    }
  },

  methods: {
    showMenuFunction() {
      this.showUserAction = false
      const menuButton = document.querySelector('.menu__button')
      const menuList = document.querySelector('.menu__list')
      const expanded = menuButton.getAttribute('aria-expanded') === 'true'
      menuButton.setAttribute('aria-expanded', !expanded)
      menuButton.classList.toggle('menu__button_open')
      menuList.classList.toggle('menu__list_open')
    },
    changePage(page) {
      this.showUserAction = false
      this.$emit('changePage', page)
    },
  },
}
</script>

<style>
.header__inner {
  display: grid;
  grid-template-columns: max-content max-content max-content;
  align-items: center;
  justify-content: space-between;
  padding: var(--unit) 0;
  border-bottom: var(--radius) solid var(--color-border);
}
.header__logo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--width-header);
  padding: var(--unit);
  border: calc(var(--radius) / 2) solid var(--color-primary3);
  border-radius: var(--border-radius-small);
}
.header__logo_mobile {
  display: none;
  height: var(--height-logo-mobile);
  text-align: center;
}
.menu__list {
  display: flex;
  list-style-type: none;
}
.menu__item {
  padding-bottom: var(--unit);
  margin: 0 var(--unit);
  color: inherit;
  text-decoration: none;
  cursor: pointer;
}
.menu__item_active {
  border-bottom: var(--border-width-small) solid var(--color-primary3);
}
.header__other {
  display: flex;
  align-items: center;
}
.header__user {
  width: var(--icon-width-large);
  height: var(--icon-height-large);
}
.menu__button {
  display: none;
}
@media (width < 760px) {
  .header__inner {
    padding: var(--unit) 0;
    margin: 0;
    border-width: var(--border-width-small);
  }
  .header__logo_mobile {
    display: flex;
  }
  .header__logo_dekstop {
    display: none;
  }
  .header__menu {
    grid-row: 1;
  }
  .menu {
    display: grid;
  }
  .menu__button {
    z-index: 1;
    display: block;
  }
  .menu__icon {
    display: block;
    stroke: var(--color-text);
  }
  .menu__icon:hover {
    stroke: var(--color-primary3);
  }
  .menu__icon-menu,
  .menu__button_open .menu__icon-cross {
    display: block;
  }
  .menu__icon-cross,
  .menu__button_open .menu__icon-menu {
    display: none;
  }
  .menu__list {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    display: none;
    padding: var(--unit) 0;
    padding-left: var(--unit);
    background-color: var(--color-background);
  }
  .menu__list_open::after {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    height: var(--height-menu-list);
    content: '';
    background-image: linear-gradient(
      to bottom,
      var(--color-background),
      transparent
    );
  }
  .menu__list_open {
    display: block;
  }
  .menu__item {
    margin-bottom: var(--unit);
  }
  .menu__item_active {
    font-weight: 700;
    color: var(--color-primary);
    border-bottom: none;
  }
  .user-dropdown__button {
    font-size: var(--text-small);
  }
}
</style>
