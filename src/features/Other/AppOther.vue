<template>
  <div class="other">
    <div class="container">
      <h1 class="other__title">Info of this website</h1>
      <div class="other__inner">
        <p class="other__p">
          The website does not aim to showcase current and in-demand
          technologies. The number of job vacancies often correlates with the
          frequency of technology usage.
        </p>
        <p class="other__p">
          Certain technologies with commonly used words in everyday life (e.g.,
          Go, Tree) or those that are too short (R language) might be
          incorrectly counted. Such technologies are marked with a special
          symbol.
        </p>
        <p class="other__p">The job boards are parsed daily at 12 PM GMT.</p>
        <!-- <p class="other__p">
          Ваши списки сохраняются только в браузере на котором была открыта эта
          страница, на других устройствах или в других браузерах ничего не
          сохранится. Хотите чтобы ваши списки сохранялись? Создайте аккаунт
        </p> -->
        <!-- <p class="other__p">
          На данный момент на сайте есть два варианта. Российский рынок
          (HeadHunter) и мировой (Indeed).
        </p> -->
        <p class="other__p">
          Currently, only the Russian job market (HeadHunter) is available on
          the website.
        </p>
        <!-- <p class="other__p">
          В вашей стране есть локальный агрегатор вакансий и вы хотите чтобы
          этот сайт отслеживал количество вакансий в нем и/или вы хотите чтобы
          на условном Indeed отображались не все вакансии, а только вашей страны
          (а может и города?), то пишите на почту.
        </p> -->
        <p class="other__p">
          Incorrect category? Missing any technology? Inaccurate numbers?
          Suggestions for project development? Found any bugs? In the near
          future, some other solution is planned, but for now, please write an
          email.
        </p>
        <p class="other__p">
          <a class="other__link" href="mailto:eforfora@gmail.com">
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
  border: var(--border-width-extra-small) solid var(--color-border);
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
