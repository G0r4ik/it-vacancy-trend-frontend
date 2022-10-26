<template>
  <div class="other">
    <div class="container">
      <h2 class="other__title title">Another</h2>
      <div class="other__inner">
        <p class="other__p">
          Сайт не несет цели показать актуальные и востребованные технологии.
          Хоть зачастую количество вакансий корелирует с частотой использования
          технологии.
        </p>
        <p class="other__p">
          Некоторые технологии с часто используемыми словами в жизни (например:
          ...) могут нерпвильно считаться, такие технологии помечены специальным
          символом
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
          <a class="other__link" href="mailto:eforfora@gmail.com" type=""
            >eforfora@gmail.com</a
          >
        </p>
      </div>
    </div>
  </div>
</template>

<style>
.other {
  /* height: 90vh; */
  display: flex;
  justify-content: center;
  align-items: center;
}
.other__title {
  margin-bottom: var(--padding-small);
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
.other__link {
  color: var(--color-primary);
}
@media (width < 760px) {
  .other__inner {
    margin: 0;
    margin-bottom: var(--margin-small);
    font-size: var(--text-small);
    line-height: 100%;
  }
}
</style>
