<template>
  <div>
    <App-Header @changePage="changePage" />
    <App-Other v-if="page === 'other'" />
    <App-Rating v-if="page === 'rating'" />
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import AppRating from './components/AppRating.vue';
import AppOther from './components/AppOther.vue';

export default {
  data() {
    return {
      page: 'rating',
    };
  },
  components: { AppHeader, AppRating, AppOther },
  methods: {
    changePage(page) {
      this.page = page;
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: sans-serif;
  background: var(--color-background);
  font-size: 24px;
  color: var(--color-text);
}

.container {
  max-width: 1120px;
  margin: 0 auto;
}

.main {
  margin-top: var(--margin-middle);
}

.title {
  max-width: 1120px;
  margin: 0 auto;
  margin-top: var(--margin-middle);
  margin-bottom: var(--margin-small);
}

select {
  font-size: 24px;
  background-color: transparent;
  border: solid var(--color-text);
  border-width: 0 0 1px;
  margin-left: 10px;
  border-radius: 0;
  padding: 2px 26px 2px 6px;
  line-height: 1.2;
  cursor: pointer;
  color: #fff;
}

select option {
  background-color: var(--color-text);
  color: #000;
}

h1,
h2,
h3,
h4,
h5,
p {
  padding: 0;
  margin: 0;
}

button {
  border: none;
  background: none;
  cursor: pointer;
}

a {
  text-decoration: none;
}
</style>
