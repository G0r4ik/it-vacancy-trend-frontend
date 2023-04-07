<template>
  <TheHeader />
  <div class="other">
    <div class="container">
      <h2 class="other__title title">Another</h2>
      <div class="other__inner">
        <p class="other__p">
          Сайт не несет цели показать актуальные и востребованные технологии.
          Хоть зачастую количество вакансий коррелирует с частотой использования
          технологии.
        </p>
        <p class="other__p">
          Некоторые технологии с часто используемыми словами в жизни (например:
          ...) могут неправильно считаться, такие технологии помечены
          специальным символом
        </p>
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
        <p class="other__p">
          <a class="other__link" href="mailto:eforfora@gmail.com" type="">
            eforfora@gmail.com
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<style>
.other {
  display: flex;
  align-items: center;
  justify-content: center;
}
.other__title {
  margin-bottom: var(--unit);
}
.other__inner {
  padding: var(--unit);
  margin: var(--unit);
  font-family: monospace;
  line-height: 150%;
  border: 1px solid var(--color-border);
}
.other__p {
  margin-bottom: var(--unit);
}
.other__link {
  color: var(--color-link);
}
@media (width < 760px) {
  .other__inner {
    margin: 0;
    margin-bottom: var(--unit);
    font-size: var(--text-small);
    line-height: 100%;
  }
}
</style>
