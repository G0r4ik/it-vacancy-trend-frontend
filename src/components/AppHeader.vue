<template>
  <header class="header">
    <div class="container">
      <div class="header__inner">
        <span class="header__logo-text">IT Vacancy Trand</span>
        <nav class="header__nav">
          <a href="#" class="header__link">Рейтинг</a>
          <a href="#" class="header__link">Сравнить</a>
          <a href="#" class="header__link">Прочее</a>
        </nav>
        <select name="select-lang" id="select-lang" class="header__select-lang">
          <option value="russian">EN</option>
          <option value="english">RU</option>
        </select>
        <div class="header__user">
          <img src="../src/assets/user-avatar.png" alt="" />
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
</style>
