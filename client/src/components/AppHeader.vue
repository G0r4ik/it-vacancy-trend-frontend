<template>
  <header class="header">
    <div class="container">
      <div class="header__inner">
        <div class="header__logo-text">
          <div>IT</div>
          <div>Vacancy</div>
          <div>Trend</div>
        </div>
        <nav class="header__nav">
          <ul class="header__nav-list">
            <li
              class="header__nav-item"
              :class="{ 'header__nav-item_active': page === 'rating' }"
              tabindex="0"
              @click="$emit('changePage', 'rating')"
              @keyup.enter="$emit('changePage', 'rating')"
            >
              Рейтинг
            </li>
            <li
              class="header__nav-item"
              :class="{ 'header__nav-item_active': page === 'compare' }"
              tabindex="0"
              @click="$emit('changePage', 'compare')"
              @keyup.enter="$emit('changePage', 'compare')"
            >
              Сравнить
            </li>
            <li
              class="header__nav-item"
              :class="{ 'header__nav-item_active': page === 'other' }"
              tabindex="0"
              @click="$emit('changePage', 'other')"
              @keyup.enter="$emit('changePage', 'other')"
            >
              Прочее
            </li>
          </ul>
        </nav>
        <div class="header__group">
          <select
            name="select-lang"
            id="select-lang"
            class="header__select-lang"
          >
            <option value="russian">EN</option>
            <option value="english">RU</option>
          </select>
          <div class="header__user">
            <img
              src="@/assets/test-img.png"
              alt="user avatar"
              class="header__test-img"
            />
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    page: String,
  },
}
</script>

<style scoped>
.header {
  width: 100%;
  margin-bottom: var(--margin-small);
}
.header__inner {
  padding: var(--padding-small) 0;
  display: flex;
  border-bottom: 5px solid var(--color-border);
  justify-content: space-between;
  align-items: center;
}
.header__logo-text {
  margin-right: var(--margin-large);
  border: 1px solid var(--color-primary3);
  padding: var(--padding-extra-small);
}
.header__nav {
}
.header__nav-list {
  display: flex;
  list-style-type: none;
}
.header__nav-item {
  text-decoration: none;
  color: inherit;
  margin: 0 var(--margin-small);
  padding-bottom: var(--padding-extra-small);
  cursor: pointer;
}
.header__nav-item_active {
  border-bottom: 2px solid var(--color-primary3);
}
.header__group {
  display: flex;
  justify-content: center;
  align-items: center;
}
.header__select-lang {
  margin-right: var(--margin-small);
}
.header__user {
}
/* !!! */
.header__test-img {
  width: 42px;
  height: 42px;
}
</style>
