<template>
  <header class="header">
    <div class="container">
      <div class="header__inner">
        <span class="header__logo-text">IT Vacancy Trend</span>
        <nav class="header__nav">
          <ul class="header__nav-list">
            <li class="header__nav-item" @click="$emit('changePage', 'rating')">
              Рейтинг
            </li>
            <li
              class="header__nav-item"
              @click="$emit('changePage', 'compare')">
              Сравнить
            </li>
            <li class="header__nav-item" @click="$emit('changePage', 'other')">
              Прочее
            </li>
          </ul>
        </nav>
        <div class="header__group">
          <select
            name="select-lang"
            id="select-lang"
            class="header__select-lang">
            <option value="russian">EN</option>
            <option value="english">RU</option>
          </select>
          <div class="header__user">
            <img
              src="../assets/user-avatar.png"
              alt="user avatar"
              class="header__user-avatar" />
            <!-- <img :src="require(`../../assets/user-avatar.png`)" alt="user logo" /> -->
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  width: 100%;
  margin-bottom: var(--margin-small);
}
.header__inner {
  padding: 15px 0;
  display: flex;
  border-bottom: 5px solid var(--color-border);
  justify-content: space-between;
  align-items: center;
}
.header__logo-text {
  margin-right: var(--margin-large);
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
  padding: 0 15px;
  cursor: pointer;
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
.header__user-avatar {
  width: 42px;
  height: 42px;
}
</style>
