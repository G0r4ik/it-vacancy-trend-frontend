<template>
  <header class="header">
    <div class="container">
      <div class="header__inner">
        <span class="header__logo-text">IT Vacancy Trend</span>
        <nav class="header__nav">
          <ul class="header__list-links">
            <li class="header__item">
              <a
                href="#"
                class="header__link"
                @click="$emit('changePage', 'rating')">
                Рейтинг
              </a>
            </li>
            <li class="header__item">
              <a
                href="#"
                class="header__link"
                @click="$emit('changePage', 'compare')">
                Сравнить
              </a>
            </li>
            <li class="header__item">
              <a
                href="#"
                class="header__link"
                @click="$emit('changePage', 'other')">
                Прочее
              </a>
            </li>
          </ul>
        </nav>
        <select name="select-lang" id="select-lang" class="header__select-lang">
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
  /* justify-content: space-between; */
}

.header__link {
  text-decoration: none;
  color: inherit;
  padding: 0 15px;
}

.header__user-avatar {
  width: 42px;
  height: 42px;
}
</style>
