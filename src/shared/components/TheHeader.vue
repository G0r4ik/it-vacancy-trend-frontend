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
            class="menu__burger"
            type="button"
            aria-label="menu__list"
            aria-expanded="false"
            aria-controls="menu__list"
            @click="showMenuFunction">
            <IconSvg
              id="cross"
              icon-name="IconCross"
              custom-class="menu__icon menu__icon-cross" />
            <IconSvg
              id="menu"
              icon-name="IconMenu"
              custom-class="menu__icon menu__icon-menu" />
          </button>
          <ul class="menu__list">
            <li
              class="menu__item"
              @click="changePage('rating')"
              @keyup.enter="changePage('rating')">
              <router-link
                to="/"
                class="menu__item-link"
                active-class="menu__item_active">
                Rating
              </router-link>
            </li>
            <li
              class="menu__item"
              @click="changePage('compare')"
              @keyup.enter="changePage('compare')">
              <router-link
                to="/compare"
                class="menu__item-link"
                active-class="menu__item_active">
                Compare
              </router-link>
            </li>
            <li
              class="menu__item"
              @click="changePage('other')"
              @keyup.enter="changePage('other')">
              <router-link
                to="/other"
                class="menu__item-link"
                active-class="menu__item_active">
                Other
              </router-link>
            </li>
          </ul>
        </nav>
        <div class="header__other">
          <ChangeTheme />
          <!-- <button
            class="icon header__user-button"
            @click="showUserAction = !showUserAction">
          </button> -->
          <!-- <IconSvg icon-name="IconUser" v-if="user" />
          <IconSvg icon-name="IconUserOff" v-else /> -->
          <!-- <svg><use :href="require('../../../public/icons.svg')" /></svg>
          <svg>
            <use
              :href="`${require('../../../public/icons.svg')}#icons_icon1`" />
          </svg>
          <svg>
            <use href=":#icons_icon1" />
          </svg>
          <svg><use xlink:href="#icons_icon1" /></svg>
          <svg><use xlink:href="#icon1" /></svg>
          <svg>
            <use
              :xlink:href="
                require('../../../public/icons.svg') + `#icons_icon1`
              "></use>
          </svg> -->
          <!-- <IconSvg icon-name="IconCheck" /> -->
        </div>
      </div>
    </div>
  </header>
  <!-- <UserDropdown v-if="showUserAction" :show-user-action="showUserAction" /> -->
</template>

<script>
// import { UserDropdown, useStore } from '@/features/AuthUser'

export default {
  // components: { UserDropdown },

  emits: ['changePage'],

  data() {
    return {
      showUserAction: false,
    }
  },

  // computed: {
  //   user() {
  //     return useStore().user
  // },
  // },

  methods: {
    showMenuFunction() {
      this.showUserAction = false
      const menuButton = document.querySelector('.menu__burger')
      const menuList = document.querySelector('.menu__list')
      const expanded = menuButton.getAttribute('aria-expanded') === 'true'
      menuButton.setAttribute('aria-expanded', !expanded)
      menuButton.classList.toggle('menu__burger_open')
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
.header {
  height: var(--height-header);
}
.header__inner {
  display: grid;
  grid-template-columns: max-content max-content max-content;
  align-items: center;
  justify-content: space-between;
  padding: var(--unit) 0;
  border-bottom: var(--border-width) solid var(--color-border);
}
.header__logo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--width-header-logo-mobile);
  padding: var(--unit);
  border: calc(var(--border-width-small)) solid var(--color-primary);
  border-radius: var(--border-radius-middle);
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
  margin: 0 calc(var(--unit) * 4);
}
.menu__item_active {
  padding-bottom: var(--unit);
  border-bottom: var(--border-width-small) solid var(--color-primary);
}
.header__other {
  display: flex;
  align-items: center;
}
.menu__burger {
  display: none;
}
@media (width < 768px) {
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
  .menu__burger {
    z-index: var(--z-index-modal);
    display: block;
  }
  .menu__icon-cross,
  .menu__icon-menu {
    width: var(--icon-size-large);
    height: var(--icon-size-large);
  }
  .menu__icon:hover {
    stroke: var(--color-primary);
  }
  .menu__icon-cross {
    display: none;
  }
  .menu__icon-menu,
  .menu__burger_open .menu__icon-cross {
    display: block;
  }
  .menu__burger_open .menu__icon-menu {
    display: none;
  }
  .menu__list {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    z-index: var(--z-index-overlay);
    display: none;
    padding: var(--unit) 0;
    padding-top: calc(var(--unit) * 2);
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
    display: flex;
    flex-direction: column;
    gap: calc(var(--unit) * 2);
    align-items: center;
    justify-content: center;
    width: 100%;
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
