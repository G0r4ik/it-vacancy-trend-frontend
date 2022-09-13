<template>
  <div class="other">
    <div class="container">
      <div class="other__inner">
        <p class="other__p">
          На сайте каждый день в 3 часа ночи GMT выкладывается количество
          вакансий определенных технологий.
        </p>
        <p class="other__p">
          Ваши списки сохраняются только в браузере на котором была открыта эта
          страница, на других устройствах или в других браузерах ничего не
          сохранится. Хотите чтобы ваши списки сохранялись? Создайте аккаунт
        </p>
        <p class="other__p">
          На данный момент на сайте есть два варианта. Российский рынок
          (HeadHunter) и мировой (Indeed).
        </p>

        <p class="other__p">
          В вашей стране есть локальный агрегатор вакансий и вы хотите чтобы
          этот сайт отслеживал количество вакансий в нем и/или вы хотите чтобы
          на условном Indeed отображались не все вакансии, а только вашей страны
          (а может и города?), то пишите на почту.
        </p>
        <p class="other__p">
          Некорректное название категории? Нет какой-либо технологии?
          Неадекватные цифры? Советы по развитию проекта? Нашли баги? На сайте
          нет вашего родного языка? Пишите на почту.
        </p>
        <p class="other__p">eforfora@gmail.com</p>
      </div>
    </div>
  </div>
</template>

<style>
.other {
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.other__inner {
  border: 1px solid var(--color-border);
  margin: var(--margin-small);
  padding: var(--padding-small);
  font-family: monospace;
  line-height: 150%;
}
.other__p {
  margin-bottom: var(--margin-small);
}
</style>
