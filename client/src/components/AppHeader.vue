<template>
  <header class="header">
    <div class="container">
      <div class="header__inner">
        <div class="header__logo header__logo_dekstop">
          <div class="header__logo-text">IT Vacancy Trend</div>
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
            @click="showMenuFunction"
          >
            <svg
              class="menu__icon menu__icon-cross"
              aria-hidden="true"
              width="32"
              height="32"
              id="cross"
              viewBox="0 0 32 32"
            >
              <path
                d="M7 24L25 8M25 24L7 8"
                stroke-width="3"
                stroke-linecap="round"
              />
            </svg>
            <svg
              class="menu__icon menu__icon-menu"
              aria-hidden="true"
              width="32"
              height="32"
              id="menu"
              viewBox="0 0 32 32"
            >
              <path
                d="M5 8h22M5 16h22M27 24H5"
                stroke-width="3"
                stroke-linecap="round"
              />
            </svg>
          </button>
          <ul class="menu__list">
            <li
              class="menu__item"
              :class="{ menu__item_active: page === 'rating' }"
              tabindex="0"
              @click="changePage('rating')"
              @keyup.enter="changePage('rating')"
            >
              Рейтинг
            </li>
            <li
              class="menu__item"
              :class="{ menu__item_active: page === 'compare' }"
              tabindex="0"
              @click="changePage('compare')"
              @keyup.enter="changePage('compare')"
            >
              Сравнить
            </li>
            <li
              class="menu__item"
              :class="{ menu__item_active: page === 'other' }"
              tabindex="0"
              @click="changePage('other')"
              @keyup.enter="changePage('other')"
            >
              Прочее
            </li>
          </ul>
        </nav>
        <div class="header__other">
          <ChangeTheme></ChangeTheme>
          <div class="header__user">
            <button
              class="header__user-button"
              @click="showUserAction = !showUserAction"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#00abfb"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path
                  d="M14.274 10.291a4 4 0 1 0 -5.554 -5.58m-.548 3.453a4.01 4.01 0 0 0 2.62 2.65"
                />
                <path
                  d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 1.147 .167m2.685 2.681a4 4 0 0 1 .168 1.152v2"
                />
                <line x1="3" y1="3" x2="21" y2="21" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
  <user-dropdown v-if="showUserAction" :showUserAction="showUserAction">
  </user-dropdown>
</template>

<script>
import UserDropdown from '@/components/UserDropdown.vue'
import ChangeTheme from './ChangeTheme.vue'
export default {
  components: { UserDropdown, ChangeTheme },
  emits: ['changePage'],
  props: {
    page: String,
  },

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
      let expanded = menuButton.getAttribute('aria-expanded') === 'true'
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

<style scoped>
.header__inner {
  padding: var(--padding-small) 0;
  border-bottom: 5px solid var(--color-border);
  display: grid;
  grid-template-columns: max-content max-content max-content;
  justify-content: space-between;
  align-items: center;
}
.header__logo {
  border: 2.5px solid var(--color-primary3);
  border-left: 2.5px solid #4be4d7;
  border-right: 2.5px solid #4be4d7;
  padding: var(--padding-extra-small);
  border-radius: 10px;
  width: 115px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.header__logo_mobile {
  display: none;
  height: 40px;
  text-align: center;
}
.menu__list {
  list-style-type: none;
  display: flex;
}
.menu__item {
  text-decoration: none;
  color: inherit;
  margin: 0 var(--margin-small);
  padding-bottom: var(--padding-extra-small);
  cursor: pointer;
}
.menu__item_active {
  border-bottom: 2px solid var(--color-primary3);
}
.header__other {
  display: flex;
  align-items: center;
}
.header__user {
  width: 30px;
  height: 30px;
}
.menu__button {
  display: none;
}

@media (width < 760px) {
  .header__inner {
    padding: var(--padding-small) 0;
    border-width: 2px;
    margin: 0;
  }
  .header__logo_mobile {
    display: block;
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
    display: none;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    padding: var(--padding-middle) 0;
    padding-left: var(--padding-extra-large);
    background-color: var(--color-background);
  }
  .menu__list_open::after {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    height: 100px;
    background-image: linear-gradient(
      to bottom,
      var(--color-background),
      transparent
    );
    content: '';
  }
  .menu__list_open {
    display: block;
  }
  .menu__item {
    margin-bottom: var(--margin-small);
  }
  .menu__item_active {
    border-bottom: none;
    color: var(--color-primary);
    font-weight: 700;
  }
  .user-dropdown__button {
    font-size: var(--text-small);
  }
}
</style>
