<template>
  <div>
    <App-Header />
    <App-Categories />
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import AppCategories from './components/AppCategories.vue';

export default {
  components: { AppHeader, AppCategories },
};
</script>

<style></style>
