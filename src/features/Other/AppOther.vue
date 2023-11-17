<template>
  <div class="other">
    <div class="container">
      <h1>Info of this website</h1>
      <div class="other__inner">
        <p class="other__p">
          The site is still in its early stage and is being regularly updated
          with new data, job boards, technologies, and features. (and bugs)
        </p>
        <p class="other__p">
          The concept of the website is not to showcase the latest and in-demand
          technological products, but the number of available job vacancies
          often correlates with the level of technology usage. Specific
          technologies like Go or Tree, or those with short names, such as the R
          language, might be incorrectly found on job boards. These technologies
          are marked with a special symbol. Vacancy announcement boards are
          analyzed daily at 12 PM Greenwich Mean Time.
        </p>
        <p class="other__p">
          Lists of favorites are saved only in the browser in which this page
          was opened. They won't appear on other devices or in different
          browsers.
        </p>
        <p class="other__p">
          Currently, we provide statistics for two job markets: Russia
          (HeadHunter) and the USA (LinkedIn).
        </p>

        <p class="other__p">
          If you notice categorization errors, absence of specific technologies,
          inaccuracies in numbers, or if you have suggestions for project
          improvement, please write to us at the specified email address or via
          Telegram. We plan to add a forum in the future, but for now, we would
          appreciate your comments and feedback sent via email or Telegram.
        </p>
        <p class="other__p">
          <a class="other__link" href="mailto:eforfora@gmail.com">
            eforfora@gmail.com
          </a>
          |
          <a class="other__link" :href="'https://t.me/lllEGOR'"> @lllEGOR </a>
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
.other__inner {
  margin: var(--unit);
  font-family: monospace;
  line-height: 150%;
}
.other__p {
  margin-bottom: var(--unit);
}
.other__link {
  color: var(--color-link);
}
@media (width < 768px) {
  .other__inner {
    margin: 0;
    margin-bottom: var(--unit);
    font-size: var(--text-small);
    line-height: 100%;
  }
}
</style>
